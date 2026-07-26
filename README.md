# CODEMAP — Visual Programming Concepts Roadmap

A static, no-backend website that teaches 60 programming concepts —
from history and foundations through DSA to AI/ML and IoT — each with
a live canvas animation, real code in C/Python/JS, a real-world
analogy, and a quick-check quiz.

## How to open it

**Easiest:** double-click `index.html` — it works directly from your
file system, no server required.

**Recommended (for the smoothest experience):** serve it locally so
paths and fonts always resolve cleanly:

```
cd progsite
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## How to host it for free

Since it's 100% static (HTML/CSS/JS, no backend, no build step), you
can drag-and-drop the `progsite` folder into:
- **Netlify** (drag-and-drop deploy)
- **Vercel**
- **GitHub Pages**
- **Cloudflare Pages**

## File structure

```
progsite/
├── index.html          → homepage: hero, search, filters, tier roadmap
├── concept.html         → single concept page (reads ?id=... from URL)
├── css/style.css        → all styling (dark blueprint/schematic theme)
├── js/data.js            → all 60 concepts: history, definition, code, etc.
├── js/visualizations.js → canvas animation engine (one renderer per concept type)
└── js/app.js             → rendering, search/filter, localStorage progress, quiz
```

## Adding more concepts

Add a new object to the `CONCEPTS` array in `js/data.js` with a unique
`id`, a `tier` (0–9, matching `TIERS`), and a `viz` key. If `viz`
doesn't match an existing renderer in `visualizations.js`, it
automatically falls back to a generic animated placeholder — so new
concepts never break the page.

## Notes

- Progress ("Mark as Learned") is saved in the browser's `localStorage`
  — it's per-device/per-browser, since there's no backend or accounts.
- Fonts load from Google Fonts via CDN; everything else is fully
  self-contained and works offline once fonts are cached.
