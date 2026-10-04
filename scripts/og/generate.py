"""Genera public/og/mehi-{es,en}.png (1200x630), la imagen que se ve al compartir el sitio.

Toma los textos de app/ui-text.ts para que la imagen diga lo mismo que la portada.
Uso (necesita Google Chrome y red para las tipografías):
    python3 scripts/og/generate.py
"""
import pathlib, re, subprocess, tempfile, html

ROOT = pathlib.Path(__file__).resolve().parents[2]
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ui = (ROOT / "app/ui-text.ts").read_text(encoding="utf-8")
logo = (ROOT / "public/logo-mehi.svg").read_text(encoding="utf-8")
logo_inner = re.search(r"<svg[^>]*>(.*)</svg>", logo, re.S).group(1)
template = (ROOT / "scripts/og/template.html").read_text(encoding="utf-8")


def block(lang: str) -> str:
    start = ui.index(f"  {lang}: {{")
    end = ui.index("\n  en: {") if lang == "es" else len(ui)
    return ui[start:end]


def value(text: str, section: str, key: str) -> str:
    part = text[text.index(f"    {section}: {{"):]
    return re.search(rf'\b{key}: "([^"]*)"', part).group(1)


for lang, path in (("es", ""), ("en", "/en")):
    text = block(lang)
    fields = {
        "lang": lang,
        "logo": logo_inner,
        "eyebrow": "Agentes de voz con IA" if lang == "es" else "AI voice agents",
        "title": value(text, "hero", "titleTop"),
        "subtitle": value(text, "hero", "titleBottom"),
        "path": path,
        "callTitle": value(text, "call", "title"),
        "badge": value(text, "call", "badge"),
        "callerLabel": value(text, "call", "callerLabel"),
        "callerLine": value(text, "call", "callerLine"),
        "lookup": value(text, "call", "lookup"),
        "agentLine": value(text, "call", "agentLine"),
    }
    page = template
    for key, val in fields.items():
        page = page.replace("{{" + key + "}}", val if key == "logo" else html.escape(val))
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as tmp:
        tmp.write(page)
    out = ROOT / f"public/og/mehi-{lang}.png"
    subprocess.run(
        [CHROME, "--headless=new", "--hide-scrollbars", "--force-device-scale-factor=1",
         "--window-size=1200,630", "--virtual-time-budget=8000",
         f"--screenshot={out}", f"file://{tmp.name}"],
        check=True, capture_output=True,
    )
    print(out, out.stat().st_size)
