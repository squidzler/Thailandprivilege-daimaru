# Thailand Privilege Visa by Daimaru

Marketing website for **www.thailandprivilege-daimaru.com** — an authorized
General Sales & Services Agent (GSSA) for the Thailand Privilege Visa program.

Static HTML/CSS/vanilla JS. No build step, no framework, no tooling to run.

## Status

The site is the **Fable 5 prototype, kept exactly as designed** — layout, copy,
cocoa/bronze palette, Fraunces + Inter fonts, and all animations. Three pages:
the home landing page plus a Programs comparison and an FAQ page.

> Note: `CLAUDE.md` describes a stricter content/SEO/voice standard (verified
> figures, badge-in-footer-only, schema depth, etc.). By owner decision the live
> site follows the prototype as-is; that content pass has not been applied.

## Structure

```
.
├── index.html          # Home — the prototype landing page
├── programs.html       # Tier-by-tier comparison & pricing
├── faq.html            # FAQ page (+ FAQ schema)
├── 404.html            # Branded not-found page
├── CLAUDE.md           # Standing rules / future content standard
├── robots.txt          # Allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot…)
├── sitemap.xml
└── assets/
    ├── css/site.css    # All styles (design tokens, layout, animations)
    ├── js/site.js      # Scroll/reveal, sticky nav, parallax-lite, mobile bar
    └── img/
        ├── logo-light.png   # Cream logo (over dark sections)
        ├── logo-dark.png    # Cocoa logo (over light nav)
        ├── gssa-badge.png   # "Authorized GSSA" seal
        ├── hero.jpg         # ⚠ PLACEHOLDER graphic — replace with a real photo
        └── footer.jpg       # ⚠ PLACEHOLDER graphic — replace with a real photo
```

Preview locally: `python3 -m http.server` in this folder, then open
`http://localhost:8000`.

## ⚠ Placeholders to replace before launch

- `assets/img/hero.jpg` — golden-hour Bangkok cityscape / arrival shot (≈1600px wide JPG)
- `assets/img/footer.jpg` — Bangkok skyline at dusk

The logo and GSSA badge are real brand assets. Contact details
(`info@thailandelite.net`, WhatsApp `+66 65 156 1561`, LINE `thailandeliteinfo`)
live directly in the HTML — search and replace if they change. There is no
favicon or social-share (OG) image yet.

## Deploying (Cloudflare Pages)

1. Connect this GitHub repo to **Cloudflare Pages**, deploying from `main`.
2. Build command: *none*. Output directory: *root* (`/`). Static site.
3. Confirm it works on the temporary `*.pages.dev` URL first.
4. **Allow AI crawlers** in the project's bot settings (Cloudflare default-blocks
   them since Jul 2025), or `robots.txt` won't take effect.
5. Connect the custom domain `www.thailandprivilege-daimaru.com` last.

> SEO-critical values (canonical, OG tags, sitemap, schema) are hardcoded with
> the current domain. If the domain changes, those need updating.

## Pre-launch checklist

- [ ] Replace the two placeholder images (hero, footer)
- [ ] Add a favicon and a 1200×630 social-share image
- [ ] Confirm Cloudflare bot settings allow AI crawlers
- [ ] Enable 2FA on GitHub and Cloudflare
- [ ] NAP check: phone/name match the TPC agent listing and thailandelite.net
- [ ] Test at 320 / 375 / 414 / 768 / 1280+, on a real iPhone + Android, on 4G
- [ ] Lighthouse mobile: LCP < 2.5s before launch
