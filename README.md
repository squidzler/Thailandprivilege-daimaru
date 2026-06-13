# Thailand Privilege Visa by Daimaru

Marketing website for **www.thailandprivilege-daimaru.com** — an authorized
General Sales & Services Agent (GSSA) for the Thailand Privilege Visa program.

Static HTML/CSS/vanilla JS. No build step, no framework, no tooling to run.
Governed by **CLAUDE.md** — read it (and this file) before making changes.

## Status

**Phase 1, Batch 2 — Home page.** The home page is complete and follows the
prototype's design exactly (cocoa/bronze, Fraunces + Inter). Packages, About,
Contact, the multi-step Apply form, and the blog template are still to come.

## Structure

```
.
├── index.html          # Home — the full sales page (the only built page so far)
├── 404.html            # Branded not-found page
├── CLAUDE.md           # Standing rules (brand, verified data, voice, SEO)
├── robots.txt          # Allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot…)
├── sitemap.xml
├── manifest.json
└── assets/
    ├── css/site.css    # All styles (design tokens, layout, animations)
    ├── js/
    │   ├── config.js   # ← edit contact details here (see below)
    │   └── site.js     # Scroll/reveal, sticky nav, count-up stats, config injection
    └── img/
        ├── logo-light.png   # Cream logo (over dark sections)
        ├── logo-dark.png    # Cocoa logo (over light nav)
        ├── gssa-badge.png   # Official "Authorized GSSA" seal (footer only)
        ├── favicon.svg      # ⚠ temporary — replace before launch
        ├── og-image.svg     # ⚠ temporary — replace with a 1200×630 JPG
        ├── hero.jpg         # ⚠ PLACEHOLDER graphic — replace with a real photo
        └── footer.jpg       # ⚠ PLACEHOLDER graphic — replace with a real photo
```

To preview locally: `python3 -m http.server` in this folder, then open
`http://localhost:8000`.

## Common changes — and which line to edit

| You want to change… | Edit this |
|---|---|
| Phone, WhatsApp, LINE, email shown to visitors | `assets/js/config.js` (one value per line) |
| The hero photo / footer photo | replace `assets/img/hero.jpg` / `footer.jpg` (keep the same names) |
| Tier prices or wording | the `programs` section in `index.html` **and** `CLAUDE.md` verified data |
| A FAQ answer | the matching `<details>` in `index.html` **and** the FAQ schema block in its `<head>` (keep them identical) |
| Colors or fonts | the `:root` tokens at the top of `assets/css/site.css` |

> Contact details appear in the HTML as well, so the page still works without
> JavaScript; `config.js` overwrites them at load. Keep the two in sync, or just
> edit `config.js` and trust the injection.

## ⚠ Placeholders to replace before launch

- `assets/img/hero.jpg` — golden-hour Bangkok cityscape / arrival shot (≈1600px wide JPG)
- `assets/img/footer.jpg` — Bangkok skyline at dusk
- `assets/img/favicon.svg` — real favicon
- `assets/img/og-image.svg` — a real 1200×630 **JPG** for social sharing (then update the `og:image` URL in `index.html`)

The logo and GSSA badge are real brand assets. `[CLIENT IMAGE: …]` comments in
the HTML mark where photography goes.

## Deploying (Cloudflare Pages)

1. Connect this GitHub repo to **Cloudflare Pages**, deploying from `main`.
2. Build command: *none*. Output directory: *root* (`/`). It's a static site.
3. Confirm everything works on the temporary `*.pages.dev` URL first.
4. **Check Cloudflare is NOT blocking AI crawlers** — Cloudflare default-blocks
   AI bots (since Jul 2025). Allow GPTBot/ClaudeBot/PerplexityBot/etc. in the
   project's bot settings, or `robots.txt` won't matter.
5. Connect the custom domain `www.thailandprivilege-daimaru.com` last.

> SEO-critical values (canonical, OG tags, sitemap, schema) are hardcoded with
> the current domain. If the domain ever changes, ask Claude Code to refresh them.

## Pre-launch checklist

- [ ] Replace the 4 placeholder images above
- [ ] Create a Formspree form for the Apply/Contact pages (Batch 3/4), paste the endpoint into `config.js`, send a test
- [ ] Confirm Cloudflare bot settings allow AI crawlers
- [ ] Set up IndexNow + Bing Webmaster Tools
- [ ] Add GA4 ID to `config.js` when available
- [ ] Enable 2FA on GitHub and Cloudflare
- [ ] NAP check: phone/name match the TPC agent listing and thailandelite.net exactly
- [ ] Test at 320 / 375 / 414 / 768 / 1280+, on a real iPhone + Android, on 4G
- [ ] Lighthouse mobile: LCP < 2.5s before announcing launch

## Phase 1 — remaining batches

- **Batch 3:** Packages (tier detail), About (Pat-led narrative), Contact
- **Batch 4:** multi-step Apply form (autosave), blog template + 3 placeholder articles, complete README; then the specialist review gate

## Phase 2 backlog (not built)

Eligibility & Process page · Why-a-Consultant page · full FAQ library ·
3+ real blog posts (start with "Thailand Privilege vs DTV vs Retirement Visa") ·
Privacy / Terms / Cookies pages · cookie banner once GA4 is live ·
Google Reviews integration (no AggregateRating schema) · translations (TBD) ·
Calendly (optional) · lead-magnet PDF (optional)
