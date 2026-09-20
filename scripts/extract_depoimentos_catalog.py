"""Extract depoimento curation from prior agent batch analyses."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(
    r"C:\Users\romul\.cursor\projects\c-Users-romul-destrava-ligacoes"
    r"\agent-transcripts\dda4beed-7a68-4464-bd0c-f2b3cbdf433f\subagents"
)
OUT = Path(__file__).resolve().parent / "_depoimentos_catalog_raw.json"

USE_RE = re.compile(
    r"(?:Usability|Usabilidade).*?"
    r"(keep_hero|keep_gallery|keep_with_crop|discard_duplicate|"
    r"discard_low_quality|discard_privacy_risk|discard_unclear)",
    re.I | re.S,
)
FN_RE = re.compile(
    r"([A-Za-z0-9_\-\(\) ]+\.(?:PNG|JPG|JPEG))",
    re.I,
)
PHONE_HINT = re.compile(
    r"\+55|\+351|telefone|phone|celular|borrar|blur|DDI",
    re.I,
)


def assistant_texts(path: Path) -> list[str]:
    texts: list[str] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        try:
            obj = json.loads(line)
        except json.JSONDecodeError:
            continue
        if obj.get("role") != "assistant":
            continue
        content = obj.get("message", {}).get("content", [])
        if isinstance(content, str):
            texts.append(content)
        elif isinstance(content, list):
            for c in content:
                if isinstance(c, dict) and c.get("type") == "text":
                    texts.append(c.get("text") or "")
    return texts


def parse_part(part: str, src: str) -> dict | None:
    title = part.split("\n", 1)[0].strip().strip("`*")
    fn = None
    fm = re.search(
        r"(?:\*\*)?Filename(?:\*\*)?[:\*]*\s*`?([^`\n|]+\.(?:PNG|JPG|JPEG))",
        part,
        re.I,
    )
    if fm:
        fn = fm.group(1).strip().strip("*` ")
    else:
        m2 = FN_RE.search(title)
        if m2:
            fn = m2.group(1).strip()

    um = USE_RE.search(part)
    if not um:
        return None
    use = um.group(1).lower()

    if not fn:
        # header like IMG_8049.PNG without extension sometimes
        m3 = re.match(r"(IMG_[0-9A-Za-z_\-\(\) ]+|[0-9A-F]{8}-[0-9A-F\-]+)", title, re.I)
        if m3:
            stem = m3.group(1).strip()
            fn = stem if "." in stem else f"{stem}.PNG"

    if not fn:
        return None

    def field(*names: str) -> str:
        for name in names:
            m = re.search(
                rf"(?:\*\*)?{name}(?:\*\*)?[`\*:\s|]*\*?\s*([^\n|]+)",
                part,
                re.I,
            )
            if m:
                return m.group(1).strip().strip("*` ")[:240]
        return ""

    return {
        "file": fn,
        "use": use,
        "privacy": field("Privacy", "Privacidade"),
        "summary": field("Summary", "Content summary", "Resumo"),
        "tags": field("Tags", "Tone/theme tags"),
        "src": src,
    }


def main() -> None:
    by: dict[str, dict] = {}
    for path in ROOT.rglob("*.jsonl"):
        for text in assistant_texts(path):
            if "keep_" not in text and "discard_" not in text:
                continue
            parts = re.split(r"\n###\s+", text)
            for part in parts[1:]:
                entry = parse_part(part, path.name)
                if not entry:
                    continue
                key = entry["file"].upper().replace(" ", "")
                by[key] = entry

    keeps = [e for e in by.values() if e["use"].startswith("keep_")]
    discards = [e for e in by.values() if e["use"].startswith("discard_")]
    phone_keeps = [
        e for e in keeps if PHONE_HINT.search(e.get("privacy") or "")
    ]

    payload = {
        "unique": len(by),
        "keeps_count": len(keeps),
        "discards_count": len(discards),
        "phone_keeps_count": len(phone_keeps),
        "all": list(by.values()),
        "keeps": sorted(keeps, key=lambda e: e["file"]),
        "phone_keeps": sorted(phone_keeps, key=lambda e: e["file"]),
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(
        f"unique={len(by)} keeps={len(keeps)} discards={len(discards)} "
        f"phone_keeps={len(phone_keeps)} -> {OUT}"
    )


if __name__ == "__main__":
    main()
