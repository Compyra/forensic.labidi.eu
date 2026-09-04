# forensic.labidi.eu

Download page for **LabidiForensic**, the portable Windows forensic reader built
in the private `Forensic-info` repo. Static site (HTML/CSS/JS, no frameworks, no
external requests), served by GitHub Pages behind Cloudflare.

Design follows the family style shared with scanner.labidi.eu and
diskanalyzer.labidi.eu: labidi.eu space palette (deep blues, cyan accent),
system fonts, dark by default with a light theme, starfield body background.
When updating one site, mirror the others.

The binaries are hosted in this repo under `download/`, together with their
`.sha256` sidecars, because the source repo is private and its releases are not
publicly reachable. LabidiForensic ships Windows x64 and arm64 only (Windows is
the subject, so Windows is the platform); there is no Linux build to publish.

## Publishing a new release

1. In `Forensic-info`: `.\build.ps1 -All -Release` (or the stamped bash
   equivalent), producing `dist\LabidiForensic.exe` and
   `dist\LabidiForensic-arm64.exe` with `.sha256` sidecars.
2. Copy both binaries and both sidecars from `dist\` into `download\` here.
3. Regenerate `SHA256SUMS.txt` from the two `.sha256` sidecars.
4. Update in `index.html`: the version, commit and date in the download section,
   the two file sizes, the two SHA-256 values (visible prefix, `title` and
   `data-copy`), the verify-terminal hash, the hero button size, and
   `softwareVersion` in the JSON-LD block.
5. Bump `?v=N` on `style.css`/`script.js` only when those files changed
   (Cloudflare edge-caches assets for hours; HTML only briefly).
6. Update `lastmod` in `sitemap.xml`.

## Assets

- `favicon.svg` is the lens brand mark (inline copies live in `index.html`).
- `og-image.png` is rendered from `og-image.html` (1200x630, headless Edge
  screenshot).
- No webfonts: the family style uses the system font stack.

The page has one ambient touch: `.trace-sweep`, a thin scanline that reads down
the page once on load and then once every 2 minutes (a single 120s CSS cycle,
visible in its first ~6%), hidden under `prefers-reduced-motion`. Siblings do
the same with `.radar-ping` (scanner) and `.disk-fill` (diskanalyzer).

## Local check

```
python -m http.server 8741 --bind 127.0.0.1
```

The page is theme-aware (dark default, light via the header toggle,
`prefers-color-scheme` respected on first visit) and fully functional without
JavaScript apart from the theme toggle and copy buttons.
