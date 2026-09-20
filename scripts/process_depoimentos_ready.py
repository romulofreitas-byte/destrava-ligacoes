"""
Process Depoimentos 2026:
- Blur only phone numbers (+55 / +351 / BR mobile patterns)
- Split multi-author screenshots into separate crops
- Keep complementary / same-thread captures as related files
- Rename with tier_category_slug naming
"""
from __future__ import annotations

import json
import re
import unicodedata
from collections import defaultdict
from dataclasses import dataclass, field
from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageFilter

SRC = Path(r"c:\Users\romul\destrava-ligacoes\public\Depoimentos - 2026")
OUT = Path(r"c:\Users\romul\destrava-ligacoes\public\depoimentos-2026-ready")
CATALOG = Path(r"c:\Users\romul\destrava-ligacoes\scripts\_depoimentos_catalog_raw.json")
MANIFEST = OUT / "manifest.json"

PHONE_RE = re.compile(
    r"(?:"
    r"\+\s*55[\s\-]?\d{2}[\s\-]?\d{4,5}[\s\-]?\d{4}"
    r"|\+\s*351[\s\-]?\d{9}"
    r"|\+\s*\d{1,3}[\s\-]?\d{2}[\s\-]?\d{4,5}[\s\-]?\d{4}"
    r"|(?<!\d)\d{2}\s*\d{4,5}[\s\-]\d{4}(?!\d)"
    r")",
    re.I,
)

# Heuristic: text that looks like a WA phone fragment near a name line
PHONEISH_RE = re.compile(r"\+\s*\d{1,3}|\d{4,5}[\s\-]\d{4}")

HERO_STEMS = {
    "IMG_0580",
    "IMG_1743",
    "IMG_7351",
    "IMG_6862",
    "IMG_6129",
    "IMG_4176",
    "IMG_9672",
    "FC7F3CB4",
    "IMG_0108",
    "IMG_2865",
    "IMG_7925",
    "9E04BF3C",
    "IMG_6377",
    "IMG_6372",
    "IMG_7202",
    "IMG_6750",
    "IMG_3935",
    "IMG_4186",
    "IMG_2323",
}

# Complementary / same-thread groups (kept together with shared base slug)
COMPLEMENTARY_GROUPS: list[list[str]] = [
    ["IMG_2435.PNG", "IMG_2436.PNG", "IMG_2436 (1).PNG"],
    ["IMG_7925.PNG", "IMG_7926.PNG"],
    ["IMG_0100.PNG", "IMG_0101.PNG"],
    ["IMG_4185.PNG", "IMG_4186.PNG", "IMG_4187.PNG", "IMG_4188.PNG"],
    ["IMG_2865.PNG", "IMG_2865 (1).PNG", "IMG_2880.PNG"],
    ["IMG_7215.PNG", "IMG_7216 (1).PNG", "IMG_7217.PNG"],
    ["IMG_1720.PNG", "IMG_1718.PNG", "IMG_1719.PNG"],
    ["IMG_3437.PNG", "IMG_3438.PNG", "IMG_3439.PNG", "IMG_3440.PNG"],
    [
        "0A5EC8A8-A263-490F-A364-4270DE853606.PNG",
        "F5AA7ACC-AA9D-4341-9F58-00692A797466.PNG",
    ],
    ["IMG_9672.PNG", "IMG_9671.PNG", "IMG_9669.PNG"],
    ["IMG_7681.PNG", "IMG_7681 (1).PNG", "IMG_7683 (1).PNG"],
]


def slugify(text: str, max_len: int = 48) -> str:
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text[:max_len].strip("-") or "depoimento"


def categorize(entry: dict) -> str:
    blob = f"{entry.get('tags','')} {entry.get('summary','')}".lower()
    if any(
        k in blob
        for k in (
            "métric",
            "metric",
            "faturamento",
            "reuni",
            "ligaç",
            "ligac",
            "venda",
            "fechamento",
            "roi",
            "contrato",
            "agendamento",
            "resultado",
        )
    ):
        return "metricas"
    if any(
        k in blob
        for k in ("destrav", "travad", "medo", "ansiedad", "mindset", "transform")
    ):
        return "destravamento"
    if any(
        k in blob
        for k in ("método", "metodo", "cold", "prospec", "anatomia", "script", "follow")
    ):
        return "metodo"
    if any(k in blob for k in ("workshop", "mentoria", "conteúdo", "conteudo", "aula")):
        return "workshop"
    return "comunidade"


def stem_of(filename: str) -> str:
    name = Path(filename).stem
    # UUID short
    if re.match(r"^[0-9A-F]{8}-", name, re.I):
        return name[:8].upper()
    m = re.match(r"(IMG_\d+)", name, re.I)
    if m:
        return m.group(1).upper()
    return name.upper()[:12]


def resolve_src(filename: str) -> Path | None:
    direct = SRC / filename
    if direct.exists():
        return direct
    # case / spacing tolerant
    wanted = filename.upper().replace(" ", "")
    for p in SRC.iterdir():
        if p.name.upper().replace(" ", "") == wanted:
            return p
    return None


def bbox_from_easyocr(box) -> tuple[int, int, int, int]:
    xs = [int(p[0]) for p in box]
    ys = [int(p[1]) for p in box]
    return min(xs), min(ys), max(xs), max(ys)


def expand_box(
    x1: int, y1: int, x2: int, y2: int, w: int, h: int, pad: float = 0.35
) -> tuple[int, int, int, int]:
    bw, bh = x2 - x1, y2 - y1
    px, py = int(bw * pad) + 4, int(bh * pad) + 4
    return (
        max(0, x1 - px),
        max(0, y1 - py),
        min(w, x2 + px),
        min(h, y2 + py),
    )


def blur_region(img: Image.Image, box: tuple[int, int, int, int]) -> None:
    x1, y1, x2, y2 = box
    if x2 <= x1 or y2 <= y1:
        return
    region = img.crop((x1, y1, x2, y2))
    # Strong pixelation + Gaussian for phone privacy
    small = region.resize(
        (max(1, (x2 - x1) // 18), max(1, (y2 - y1) // 18)), Image.Resampling.BILINEAR
    )
    pixelated = small.resize((x2 - x1, y2 - y1), Image.Resampling.NEAREST)
    pixelated = pixelated.filter(ImageFilter.GaussianBlur(radius=2))
    img.paste(pixelated, (x1, y1))


def find_phone_boxes(ocr_results: list, w: int, h: int) -> list[tuple[int, int, int, int]]:
    boxes: list[tuple[int, int, int, int]] = []
    for box, text, conf in ocr_results:
        cleaned = text.replace("O", "0").replace("o", "0")
        if not PHONE_RE.search(cleaned) and not (
            PHONEISH_RE.search(cleaned) and ("+" in text or conf > 0.35)
        ):
            # Merge adjacent fragments: skip alone for now
            if not re.search(r"\+\s*55|\+\s*351", cleaned):
                continue
        x1, y1, x2, y2 = bbox_from_easyocr(box)
        # Prefer widening horizontally — phones sit after names on same line
        line_pad_x = max(20, int((x2 - x1) * 0.15))
        x1 = max(0, x1 - 4)
        x2 = min(w, x2 + line_pad_x)
        boxes.append(expand_box(x1, y1, x2, y2, w, h, pad=0.45))

    # Also try joining neighboring OCR tokens on same line that form a phone
    line_groups: dict[int, list] = defaultdict(list)
    for box, text, conf in ocr_results:
        x1, y1, x2, y2 = bbox_from_easyocr(box)
        key = y1 // max(1, int(h * 0.012))
        line_groups[key].append((x1, y1, x2, y2, text))

    for items in line_groups.values():
        items.sort(key=lambda t: t[0])
        joined = " ".join(t[4] for t in items)
        if PHONE_RE.search(joined.replace("O", "0")):
            x1 = min(t[0] for t in items)
            y1 = min(t[1] for t in items)
            x2 = max(t[2] for t in items)
            y2 = max(t[3] for t in items)
            # Focus on the phone portion: from first '+' or from mid-line
            plus_idx = next((i for i, t in enumerate(items) if "+" in t[4]), None)
            if plus_idx is not None:
                x1 = items[plus_idx][0]
            boxes.append(expand_box(x1, y1, x2, y2, w, h, pad=0.4))

    return merge_boxes(boxes, iou_thresh=0.2)


def primary_author_phone_boxes(
    phone_boxes: list[tuple[int, int, int, int]], w: int
) -> list[tuple[int, int, int, int]]:
    """
    Keep phones that look like main bubble headers (leftish), not quoted replies
    (more indented). Used only for split decisions — blur still uses all phones.
    """
    if not phone_boxes:
        return []
    primary = []
    for box in phone_boxes:
        x1, _, x2, _ = box
        cx = (x1 + x2) / 2
        # Quoted reply phones sit further right inside the bubble
        if cx <= w * 0.52 and x1 <= w * 0.42:
            primary.append(box)
    return primary or phone_boxes[:1]


def merge_boxes(
    boxes: list[tuple[int, int, int, int]], iou_thresh: float = 0.2
) -> list[tuple[int, int, int, int]]:
    if not boxes:
        return []
    boxes = sorted(boxes, key=lambda b: (b[1], b[0]))
    merged: list[tuple[int, int, int, int]] = []
    for box in boxes:
        if not merged:
            merged.append(box)
            continue
        ax1, ay1, ax2, ay2 = merged[-1]
        bx1, by1, bx2, by2 = box
        inter_x1, inter_y1 = max(ax1, bx1), max(ay1, by1)
        inter_x2, inter_y2 = min(ax2, bx2), min(ay2, by2)
        iw, ih = max(0, inter_x2 - inter_x1), max(0, inter_y2 - inter_y1)
        inter = iw * ih
        area_a = (ax2 - ax1) * (ay2 - ay1)
        area_b = (bx2 - bx1) * (by2 - by1)
        union = area_a + area_b - inter or 1
        same_line = abs(((ay1 + ay2) / 2) - ((by1 + by2) / 2)) < 18
        if inter / union > iou_thresh or (same_line and bx1 <= ax2 + 40):
            merged[-1] = (
                min(ax1, bx1),
                min(ay1, by1),
                max(ax2, bx2),
                max(ay2, by2),
            )
        else:
            merged.append(box)
    return merged


def find_name_header_ys(ocr_results: list, w: int, h: int) -> list[int]:
    """Detect leftish author name lines (with or without phone on same line)."""
    ys: list[int] = []
    name_re = re.compile(
        r"^(?:~?\s*)?(?:"
        r"[A-ZÀ-Ú][\wÀ-ú'\.]{1,20}"
        r"(?:\s+[A-ZÀ-Ú\~][\wÀ-ú'\.]{1,20}){0,3}"
        r")$",
        re.U,
    )
    for box, text, conf in ocr_results:
        raw = text.strip()
        if not raw or len(raw) > 42:
            continue
        x1, y1, x2, y2 = bbox_from_easyocr(box)
        if x1 > w * 0.38:
            continue
        if PHONE_RE.search(raw) or re.search(r"\+\s*\d", raw):
            continue
        # Skip obvious UI / body fragments
        low = raw.lower()
        if any(
            k in low
            for k in (
                "online",
                "comunidade",
                "digite",
                "mensagem",
                "hoje",
                "ontem",
                "você",
                "voce",
                "editada",
            )
        ):
            continue
        if raw.startswith("~") or (conf > 0.4 and name_re.match(raw)):
            ys.append((y1 + y2) // 2)
    return ys


def find_author_ys(
    primary_phones: list[tuple[int, int, int, int]],
    name_ys: list[int],
    h: int,
) -> list[int]:
    """Merge primary phone headers + name headers into distinct author Ys."""
    ys = [(b[1] + b[3]) // 2 for b in primary_phones] + list(name_ys)
    ys = sorted(ys)
    compact: list[int] = []
    min_gap = max(int(h * 0.10), 80)
    for y in ys:
        if not compact or abs(y - compact[-1]) > min_gap:
            compact.append(y)
        else:
            # keep the earlier (higher) header
            pass
    return compact


def split_regions(
    h: int, author_ys: list[int], w: int, phone_boxes: list
) -> list[tuple[int, int, int, int]]:
    """
    If 2+ distinct primary authors, return crop boxes (full width) per author.
    Same-author multi-bubble stays as one region (single author_y).
    Cut slightly above the next author's header so prior message stays whole.
    """
    if len(author_ys) < 2:
        return [(0, 0, w, h)]

    cuts = [0]
    for y in author_ys[1:]:
        # Cut just above next author header (not midpoint — avoids mid-message cuts)
        header_h = int(h * 0.025)
        cuts.append(max(0, y - header_h))
    cuts.append(h)

    regions = []
    for i in range(len(cuts) - 1):
        y1, y2 = cuts[i], cuts[i + 1]
        if y2 - y1 < int(h * 0.14):
            continue
        pad = int(h * 0.008)
        regions.append((0, max(0, y1 - pad), w, min(h, y2 + pad)))

    # Require each region to contain (or be near) a phone header; else merge
    if len(regions) < 2:
        return [(0, 0, w, h)]
    return regions


def trim_chrome(img: Image.Image) -> Image.Image:
    """Light crop of status/nav chrome when present (full phone screenshots)."""
    w, h = img.size
    # Only for tall phone-like aspect
    if h / max(w, 1) < 1.5:
        return img
    top = int(h * 0.065)  # status + WA header approx
    bottom = int(h * 0.92)
    if bottom - top < h * 0.5:
        return img
    return img.crop((0, top, w, bottom))


# Hand-tuned slugs for hero / high-value prints (content > meta analysis text)
SLUG_OVERRIDES: dict[str, str] = {
    "IMG_0580.PNG": "regularize-triplicou-faturamento",
    "IMG_1743.PNG": "lucas-30-ligacoes-3-reunioes-1-venda",
    "IMG_7351.PNG": "ciclo-vendas-15-21-para-1-7-dias",
    "IMG_6862.PNG": "5-reunioes-1-fechamento-uma-tarde",
    "IMG_6129.PNG": "5-agendamentos-em-6-ligacoes",
    "IMG_4176.PNG": "medo-2-anos-para-10-ligacoes",
    "IMG_9672.PNG": "10-reunioes-marcadas",
    "FC7F3CB4-4ABE-4AE1-87F3-9E72DFC144EB.PNG": "izabela-4-reunioes-na-semana",
    "IMG_0108.PNG": "fechamento-site-ligacao-fria",
    "IMG_2865.PNG": "primeiro-contrato-menos-1-semana",
    "IMG_2865 (1).PNG": "primeiro-contrato-menos-1-semana",
    "IMG_2880.PNG": "primeiro-contrato-contexto",
    "IMG_7925.PNG": "destravei-o-que-havia-travado",
    "IMG_7926.PNG": "destravei-o-que-havia-travado",
    "9E04BF3C-D337-428E-A510-2A7806A1C70F.PNG": "douglas-estrutura-r1-r2-destravou",
    "IMG_6377.PNG": "alanis-marcou-reuniao",
    "IMG_6372.PNG": "resultado-agendamento",
    "IMG_7202.PNG": "resultado-ligacoes",
    "IMG_6750.PNG": "joao-8-ligacoes-2-compras-1-upsell",
    "IMG_3935.PNG": "elogio-workshop",
    "IMG_4186.PNG": "validacao-cold-call",
    "IMG_2323.PNG": "prova-social-resultado",
    "IMG_2435.PNG": "andre-mindset-ligacoes",
    "IMG_2436.PNG": "andre-mindset-ligacoes",
    "IMG_2436 (1).PNG": "andre-mindset-ligacoes",
    "IMG_0849.PNG": "bruna-travada-para-7-leads",
    "IMG_6858.PNG": "revolucionando-prospeccao-ativa",
    "0A5EC8A8-A263-490F-A364-4270DE853606.PNG": "brenda-r2-ao-vivo",
    "F5AA7ACC-AA9D-4341-9F58-00692A797466.PNG": "brenda-r2-ao-vivo",
}


META_SUMMARY_RE = re.compile(
    r"vers[aã]o|crop|vizinh|duplic|preferir|mesmo|print|captura|arquivo",
    re.I,
)


def make_slug(entry: dict, filename: str) -> str:
    if filename in SLUG_OVERRIDES:
        return SLUG_OVERRIDES[filename]
    summary = entry.get("summary") or ""
    summary = re.split(r"[.!\n]", summary)[0]
    summary = re.sub(r"^[A-Za-zÀ-ú~\s]+[:\-–]\s*", "", summary)
    if META_SUMMARY_RE.search(summary):
        summary = entry.get("tags") or stem_of(filename)
    s = slugify(summary, 40)
    if len(s) < 8:
        s = slugify(entry.get("tags") or stem_of(filename), 40)
    return s


@dataclass
class WorkItem:
    src_name: str
    entry: dict
    tier: str
    category: str
    base_slug: str
    comp_label: str | None = None
    group_id: str | None = None


def build_work_items(keeps: list[dict]) -> list[WorkItem]:
    by_file = {e["file"]: e for e in keeps}
    # Map complementary membership
    file_to_group: dict[str, tuple[str, str]] = {}
    for gi, group in enumerate(COMPLEMENTARY_GROUPS, start=1):
        gid = f"comp{gi:02d}"
        # shared slug from first keep in group
        primary = next((f for f in group if f in by_file), group[0])
        entry = by_file.get(primary) or {
            "summary": primary,
            "tags": "",
            "use": "keep_gallery",
            "file": primary,
        }
        base = make_slug(entry, primary)
        letters = "abcdefghijklmnopqrstuvwxyz"
        for i, fname in enumerate(group):
            if fname in by_file:
                file_to_group[fname] = (gid, f"comp-{letters[i]}")

    used_slugs: dict[str, int] = defaultdict(int)
    items: list[WorkItem] = []
    for entry in keeps:
        fname = entry["file"]
        stem = stem_of(fname)
        tier = "hero" if (entry["use"] == "keep_hero" or stem in HERO_STEMS) else "gallery"
        if entry["use"] == "keep_hero":
            tier = "hero"
        category = categorize(entry)
        base = make_slug(entry, fname)
        key = f"{tier}_{category}_{base}"
        used_slugs[key] += 1
        if used_slugs[key] > 1:
            base = f"{base}-{used_slugs[key]}"
        comp_label = None
        group_id = None
        if fname in file_to_group:
            group_id, comp_label = file_to_group[fname]
            # unify base slug within complementary group
            primary = next(
                f
                for g in COMPLEMENTARY_GROUPS
                if fname in g
                for f in g
                if f in by_file
            )
            base = make_slug(by_file[primary], primary)
        items.append(
            WorkItem(
                src_name=fname,
                entry=entry,
                tier=tier,
                category=category,
                base_slug=base,
                comp_label=comp_label,
                group_id=group_id,
            )
        )
    return items


def process_image(reader, item: WorkItem) -> list[dict]:
    src = resolve_src(item.src_name)
    if not src:
        return [{"error": f"missing {item.src_name}"}]

    pil = Image.open(src).convert("RGB")
    arr = np.array(pil)
    # EasyOCR wants BGR or RGB; RGB ok
    ocr = reader.readtext(arr)
    w, h = pil.size
    phone_boxes = find_phone_boxes(ocr, w, h)
    primary_phones = primary_author_phone_boxes(phone_boxes, w)
    name_ys = find_name_header_ys(ocr, w, h)
    author_ys = find_author_ys(primary_phones, name_ys, h)
    regions = split_regions(h, author_ys, w, primary_phones)

    outputs = []
    multi = len(regions) > 1

    for idx, (x1, y1, x2, y2) in enumerate(regions, start=1):
        crop = pil.crop((x1, y1, x2, y2)).copy()
        # Map phone boxes into crop coords and blur
        local_phones = 0
        for bx1, by1, bx2, by2 in phone_boxes:
            # intersection with region
            ix1, iy1 = max(bx1, x1), max(by1, y1)
            ix2, iy2 = min(bx2, x2), min(by2, y2)
            if ix2 - ix1 > 8 and iy2 - iy1 > 6:
                crop_box = (ix1 - x1, iy1 - y1, ix2 - x1, iy2 - y1)
                blur_region(crop, crop_box)
                local_phones += 1

        # Chrome trim: full-frame or edge pieces of tall screenshots
        cw, ch = crop.size
        if h / max(w, 1) >= 1.5:
            top_cut = int(h * 0.065) if y1 <= 2 else 0
            bottom_cut = 0
            if y2 >= h - 2:
                bottom_cut = max(0, ch - int(ch * 0.92))
            if top_cut or bottom_cut:
                crop = crop.crop((0, top_cut, cw, ch - bottom_cut if bottom_cut else ch))
        elif not multi and h / max(w, 1) >= 1.6:
            crop = trim_chrome(crop)

        parts = [item.tier, item.category, item.base_slug]
        if item.comp_label:
            parts.append(item.comp_label)
        if multi:
            parts.append(f"parte-{idx}")
        out_name = "_".join(parts) + ".png"
        out_path = OUT / item.tier / out_name
        out_path.parent.mkdir(parents=True, exist_ok=True)
        # avoid overwrite collisions
        if out_path.exists():
            out_path = out_path.with_name(
                out_path.stem + f"_{stem_of(item.src_name).lower()}" + out_path.suffix
            )
        crop.save(out_path, "PNG", optimize=True)
        outputs.append(
            {
                "source": item.src_name,
                "output": str(out_path.relative_to(OUT.parent)).replace("\\", "/"),
                "tier": item.tier,
                "category": item.category,
                "slug": item.base_slug,
                "phones_blurred": local_phones,
                "split_part": idx if multi else None,
                "complementary": item.comp_label,
                "group_id": item.group_id,
                "summary": item.entry.get("summary"),
            }
        )
    return outputs


def main(limit: int | None = None, only: list[str] | None = None) -> None:
    import easyocr

    data = json.loads(CATALOG.read_text(encoding="utf-8"))
    keeps = data["keeps"]
    if only:
        only_u = {o.upper() for o in only}
        keeps = [e for e in keeps if e["file"].upper() in only_u]
    items = build_work_items(keeps)
    if limit:
        items = items[:limit]

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "hero").mkdir(exist_ok=True)
    (OUT / "gallery").mkdir(exist_ok=True)

    print(f"Loading EasyOCR (pt+en)... processing {len(items)} sources")
    reader = easyocr.Reader(["pt", "en"], gpu=False, verbose=False)

    manifest = []
    for i, item in enumerate(items, 1):
        print(f"[{i}/{len(items)}] {item.src_name} -> {item.tier}/{item.category}/{item.base_slug}")
        try:
            outs = process_image(reader, item)
            manifest.extend(outs)
            for o in outs:
                if o.get("error"):
                    print("  ERROR", o["error"])
                else:
                    print(
                        f"  -> {o['output']} (phones={o['phones_blurred']}, part={o['split_part']})"
                    )
        except Exception as exc:  # noqa: BLE001
            print("  FAIL", exc)
            manifest.append({"source": item.src_name, "error": str(exc)})

    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    ok = [m for m in manifest if "output" in m]
    splits = [m for m in ok if m.get("split_part")]
    print(
        f"\nDone. outputs={len(ok)} splits={len(splits)} "
        f"errors={sum(1 for m in manifest if 'error' in m)} manifest={MANIFEST}"
    )


if __name__ == "__main__":
    import sys

    # Usage:
    #   python process_depoimentos_ready.py --test
    #   python process_depoimentos_ready.py
    #   python process_depoimentos_ready.py --only IMG_6750.PNG 0A5EC8A8...
    args = sys.argv[1:]
    if "--test" in args:
        main(
            only=[
                "IMG_6750.PNG",
                "IMG_1743.PNG",
                "IMG_2436 (1).PNG",
                "0A5EC8A8-A263-490F-A364-4270DE853606.PNG",
                "IMG_0580.PNG",
            ]
        )
    elif "--only" in args:
        idx = args.index("--only")
        main(only=args[idx + 1 :])
    else:
        main()
