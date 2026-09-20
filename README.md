# mzaiger.github.io

Personal portfolio site, deployed via GitHub Pages with a custom domain
(`marcitech.is-a.dev`, set via `CNAME`).

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home / profile — intro, typewriter header effect |
| `resume.html` | Resume |
| `projects.html` | Side projects showcase, with autoplaying video previews (Unity games, DnD Baseball, etc.) |
| `github.html` | GitHub repositories listing |
| `marcitech.html` | Archived older version of the site |

## Shared structure

- `components.js` — shared header/nav markup (injected into every page),
  dark/light theme toggle, scroll-triggered header state
- `style.css` — shared styling (Archivo/DM Sans fonts, light/dark color
  scheme support via `color-scheme` meta)
- Project preview videos (`.mp4`) and `MarcResume.pdf` are bundled
  directly in the repo

## Running locally

No build step — plain static HTML/CSS/JS.

```bash
python -m http.server
```

Then visit `http://localhost:8000/index.html`.

## Deployment

Served via GitHub Pages at the custom domain in `CNAME`
(`marcitech.is-a.dev`). Push to the Pages-enabled branch to publish.
