# Thailand Privilege Visa by Daimaru

Marketing website for **www.thailandprivilege-daimaru.com** — an authorized
General Sales & Services Agent (GSSA) for the Thailand Privilege Visa program.

Built from the Fable 5 prototype as a fast, dependency-free static site.

## Structure

```
.
├── index.html          # Landing page (hero, programs, benefits, process, contact)
├── programs.html       # Full tier comparison & pricing
├── faq.html            # Frequently asked questions (+ FAQ schema for SEO)
├── 404.html            # Branded not-found page
├── CNAME               # Custom domain for GitHub Pages
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/site.css    # All styles (design tokens, layout, animations)
    ├── js/site.js      # Scroll/reveal behavior, sticky nav, mobile bar
    └── images/
        ├── logo-light.png   # Cream logo (over dark sections)
        ├── logo-dark.png    # Cocoa logo (over light nav)
        ├── gssa-badge.png   # Official "Authorized GSSA" seal
        ├── hero.jpg         # ⚠ PLACEHOLDER — see below
        └── footer.jpg       # ⚠ PLACEHOLDER — see below
```

No build step. Open `index.html` in a browser, or serve the folder with any
static file server (`python3 -m http.server`).

## ⚠ Placeholder images to replace

`assets/images/hero.jpg` and `assets/images/footer.jpg` are generated
placeholders from the prototype, **not** real photography. Drop in official
Thailand Privilege photos at the same paths (recommended: ~1600px wide JPG):

- **hero.jpg** — golden-hour / arrival / VIP escort image
- **footer.jpg** — Bangkok skyline at dusk

The logo and GSSA badge are the real brand assets.

## Content to verify before launch

The program pricing, points, timelines and contact details were carried over
from the prototype. Please confirm against the current official Thailand
Privilege schedule before going live:

- Tier prices & annual privilege points (`programs.html`)
- Contact: `info@thailandelite.net`, WhatsApp `+66 65 156 1561`, LINE `thailandeliteinfo`
- Bronze availability date (30 Sep 2026)

## Deploying

Configured for **GitHub Pages** with a custom domain (`CNAME`). In repo
**Settings → Pages**, set the source branch to the one being deployed; Pages
will pick up `CNAME` automatically. Point the `www` DNS record at GitHub Pages.

Any static host (Netlify, Vercel, Cloudflare Pages, S3) works too — just serve
the repository root.
