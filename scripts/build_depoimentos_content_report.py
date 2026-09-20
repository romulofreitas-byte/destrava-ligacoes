"""
Build a content report of processed testimonials for strategy mapping (e.g. Claude).
Extracts OCR text from depoimentos-2026-ready and joins catalog metadata.
"""
from __future__ import annotations

import json
import re
import unicodedata
from collections import defaultdict
from pathlib import Path

import easyocr
import numpy as np
from PIL import Image

ROOT = Path(r"c:\Users\romul\destrava-ligacoes")
READY = ROOT / "public" / "depoimentos-2026-ready"
CATALOG = ROOT / "scripts" / "_depoimentos_catalog_raw.json"
MANIFEST = READY / "manifest.json"
OUT_MD = ROOT / "RELATORIO_DEPOIMENTOS_CONTEUDO.md"
OUT_JSON = ROOT / "relatorio_depoimentos_conteudo.json"
OUT_CSV = ROOT / "relatorio_depoimentos_conteudo.csv"

PHONE_CLEAN = re.compile(
    r"\+?\s*55[\s\-]?\d{2}[\s\-]?\d{4,5}[\s\-]?\d{4}"
    r"|\+?\s*351[\s\-]?\d{9}"
    r"|\d{2}\s*\d{4,5}[\s\-]\d{4}",
    re.I,
)
METRIC_PATTERNS = [
    (r"(\d+)\s*liga[cç][oõ]es?", "ligacoes"),
    (r"(\d+)\s*reuni[oõ]es?", "reunioes"),
    (r"(\d+)\s*agendamentos?", "agendamentos"),
    (r"(\d+)\s*vendas?", "vendas"),
    (r"(\d+)\s*compras?", "compras"),
    (r"(\d+)\s*leads?", "leads"),
    (r"(\d+)\s*contratos?", "contratos"),
    (r"triplic", "triplicou"),
    (r"R\$\s*[\d\.\,]+", "valor_rs"),
    (r"ROI", "roi"),
    (r"upsell", "upsell"),
    (r"cold\s*call|liga[cç][aã]o\s*fria", "cold_call"),
    (r"workshop", "workshop"),
    (r"mentor", "mentoria"),
    (r"destrave?i|destravou|travad", "destravamento"),
]


def clean_ocr_text(lines: list[str]) -> str:
    text = "\n".join(lines)
    text = PHONE_CLEAN.sub("[telefone]", text)
    # Drop very short UI crumbs
    kept = []
    for line in text.splitlines():
        s = line.strip()
        if not s:
            continue
        low = s.lower()
        if low in {"online", "digite", "mensagem", "+", "editada"}:
            continue
        if re.fullmatch(r"\d{1,2}:\d{2}", s):
            continue
        kept.append(s)
    return "\n".join(kept).strip()


def extract_metrics(text: str) -> list[str]:
    found = []
    for pat, label in METRIC_PATTERNS:
        if re.search(pat, text, re.I):
            found.append(label)
    return sorted(set(found))


def ocr_image(reader, path: Path) -> str:
    img = Image.open(path).convert("RGB")
    arr = np.array(img)
    results = reader.readtext(arr, detail=1, paragraph=False)
    # Sort top-to-bottom, left-to-right
    items = []
    for box, text, conf in results:
        if conf < 0.25:
            continue
        ys = [p[1] for p in box]
        xs = [p[0] for p in box]
        items.append((min(ys), min(xs), text.strip()))
    items.sort()
    return clean_ocr_text([t for _, _, t in items if t])


def main() -> None:
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    by_src = {e["file"]: e for e in catalog["keeps"]}
    manifest = [m for m in json.loads(MANIFEST.read_text(encoding="utf-8")) if "output" in m]

    print(f"Loading EasyOCR… {len(manifest)} files")
    reader = easyocr.Reader(["pt", "en"], gpu=False, verbose=False)

    entries = []
    for i, m in enumerate(manifest, 1):
        out_rel = m["output"]
        # output is like depoimentos-2026-ready/hero/...
        path = ROOT / "public" / out_rel.replace("\\", "/")
        if not path.exists():
            # try relative to READY parent
            path = ROOT / "public" / Path(out_rel).as_posix()
        if not path.exists():
            path = READY / Path(out_rel).name
            # search
            hits = list(READY.rglob(Path(out_rel).name))
            path = hits[0] if hits else path

        src_meta = by_src.get(m["source"], {})
        print(f"[{i}/{len(manifest)}] {path.name}")
        try:
            texto = ocr_image(reader, path) if path.exists() else ""
        except Exception as exc:  # noqa: BLE001
            texto = ""
            print("  OCR fail:", exc)

        entry = {
            "id": f"DEP-{i:03d}",
            "arquivo_pronto": out_rel.replace("\\", "/"),
            "arquivo_original": m["source"],
            "tier": m.get("tier"),
            "categoria": m.get("category"),
            "slug": m.get("slug"),
            "parte": m.get("split_part"),
            "complementar": m.get("complementary"),
            "grupo": m.get("group_id"),
            "telefones_borrados": m.get("phones_blurred"),
            "resumo_curadoria": src_meta.get("summary") or m.get("summary") or "",
            "tags": src_meta.get("tags") or "",
            "usabilidade_original": src_meta.get("use") or "",
            "privacidade": src_meta.get("privacy") or "",
            "texto_ocr": texto,
            "metricas_detectadas": extract_metrics(
                f"{texto}\n{src_meta.get('summary') or ''}"
            ),
            "frente_produto_sugerida": "",  # preencher no Claude
            "uso_sugerido": "",  # hero / ads / email / comunidade / etc.
            "notas": "",
        }
        entries.append(entry)

    # Sort: hero first, then category, slug, part
    tier_order = {"hero": 0, "gallery": 1}
    entries.sort(
        key=lambda e: (
            tier_order.get(e["tier"] or "", 9),
            e["categoria"] or "",
            e["slug"] or "",
            e["parte"] or 0,
            e["id"],
        )
    )
    # re-number ids after sort
    for i, e in enumerate(entries, 1):
        e["id"] = f"DEP-{i:03d}"

    payload = {
        "titulo": "Relatório de Conteúdo — Depoimentos 2026",
        "objetivo": (
            "Inventário textual dos depoimentos tratados (crop/blur/rename) "
            "para estratégia de uso por produto/frente do Mundo Pódium."
        ),
        "total": len(entries),
        "por_tier": {
            "hero": sum(1 for e in entries if e["tier"] == "hero"),
            "gallery": sum(1 for e in entries if e["tier"] == "gallery"),
        },
        "por_categoria": {},
        "depoimentos": entries,
    }
    cat_counts: dict[str, int] = defaultdict(int)
    for e in entries:
        cat_counts[e["categoria"] or "outro"] += 1
    payload["por_categoria"] = dict(sorted(cat_counts.items()))

    OUT_JSON.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    # CSV
    import csv

    fields = [
        "id",
        "tier",
        "categoria",
        "slug",
        "parte",
        "complementar",
        "grupo",
        "arquivo_pronto",
        "arquivo_original",
        "resumo_curadoria",
        "texto_ocr",
        "tags",
        "metricas_detectadas",
        "telefones_borrados",
        "frente_produto_sugerida",
        "uso_sugerido",
        "notas",
    ]
    with OUT_CSV.open("w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        w.writeheader()
        for e in entries:
            row = dict(e)
            row["metricas_detectadas"] = "; ".join(e["metricas_detectadas"])
            w.writerow(row)

    # Markdown for Claude
    lines: list[str] = []
    lines.append("# Relatório de Conteúdo — Depoimentos 2026 (Mundo Pódium)")
    lines.append("")
    lines.append("## Como usar este arquivo (prompt sugerido)")
    lines.append("")
    lines.append(
        "Você tem o mapa completo de produtos e frentes do Mundo Pódium. "
        "Use este inventário para:"
    )
    lines.append("")
    lines.append(
        "1. Classificar cada `DEP-XXX` na frente/produto mais adequado "
        "(ex.: Destrava Ligações, Workshop, Comunidade Pódium, mentoria, YouTube, ads, etc.)."
    )
    lines.append(
        "2. Separar o que serve para **hero**, **prova social**, **ads**, **email**, "
        "**objeções**, **método**, **destravamento emocional**."
    )
    lines.append(
        "3. Agrupar complementares (`grupo` / `comp-*`) e partes (`parte`) do mesmo print."
    )
    lines.append(
        "4. Sinalizar depoimentos fracos, genéricos ou redundantes."
    )
    lines.append(
        "5. Entregar uma estratégia de distribuição por canal + shortlist priorizada."
    )
    lines.append("")
    lines.append("Campos vazios `frente_produto_sugerida` e `uso_sugerido` são para você preencher.")
    lines.append("")
    lines.append("**Notas:** telefones já foram borrados nas imagens; no OCR aparecem como `[telefone]`. "
                 "O texto OCR pode ter erros — use também o `resumo_curadoria`.")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Sumário")
    lines.append("")
    lines.append(f"- **Total de arquivos tratados:** {payload['total']}")
    lines.append(f"- **Hero:** {payload['por_tier']['hero']}")
    lines.append(f"- **Gallery:** {payload['por_tier']['gallery']}")
    lines.append("- **Por categoria:**")
    for k, v in payload["por_categoria"].items():
        lines.append(f"  - `{k}`: {v}")
    lines.append("")
    lines.append("---")
    lines.append("")

    current_tier = None
    current_cat = None
    for e in entries:
        if e["tier"] != current_tier:
            current_tier = e["tier"]
            lines.append(f"## Tier: {current_tier}")
            lines.append("")
            current_cat = None
        if e["categoria"] != current_cat:
            current_cat = e["categoria"]
            lines.append(f"### Categoria: {current_cat}")
            lines.append("")

        title_bits = [e["id"], e["slug"] or "sem-slug"]
        if e["complementar"]:
            title_bits.append(e["complementar"])
        if e["parte"]:
            title_bits.append(f"parte-{e['parte']}")
        lines.append(f"#### {' · '.join(title_bits)}")
        lines.append("")
        lines.append(f"- **Arquivo pronto:** `{e['arquivo_pronto']}`")
        lines.append(f"- **Original:** `{e['arquivo_original']}`")
        if e["grupo"]:
            lines.append(f"- **Grupo complementar:** `{e['grupo']}`")
        lines.append(f"- **Tags:** {e['tags'] or '—'}")
        lines.append(
            f"- **Métricas detectadas:** "
            f"{', '.join(e['metricas_detectadas']) if e['metricas_detectadas'] else '—'}"
        )
        lines.append(f"- **Telefones borrados (OCR):** {e['telefones_borrados']}")
        lines.append(f"- **Resumo (curadoria):** {e['resumo_curadoria'] or '—'}")
        lines.append("")
        lines.append("**Texto do depoimento (OCR):**")
        lines.append("")
        if e["texto_ocr"]:
            lines.append("```")
            lines.append(e["texto_ocr"])
            lines.append("```")
        else:
            lines.append("_Sem texto OCR legível._")
        lines.append("")
        lines.append("- **Frente/produto sugerida:** _(preencher)_")
        lines.append("- **Uso sugerido:** _(preencher)_")
        lines.append("")
        lines.append("---")
        lines.append("")

    OUT_MD.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUT_MD}")
    print(f"Wrote {OUT_JSON}")
    print(f"Wrote {OUT_CSV}")


if __name__ == "__main__":
    main()
