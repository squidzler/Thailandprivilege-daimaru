# STRATEGY.md — thailandprivilege-daimaru.com

Strategic direction for this site. Read alongside CLAUDE.md. Source: cross-session
brief from the thailandelite.net team (sister site, same operator — Daimaru Trading).
Last updated 2026-06-15.

## What this site is

A **mobile-first, paid-traffic conversion landing site** for the Thailand Privilege
Visa, run by Daimaru Trading (authorized GSSA since 2015). It is the **sister site**
of www.thailandelite.net and must stay deliberately different from it.

> **Mobile is the priority (owner directive, 2026-06-15): ~80% of visitors are on
> phones.** Design, build, and verify on a 375px phone screen first; desktop is the
> scale-up, not the starting point. Mobile experience wins any trade-off.

- **This site** = conversion-focused, decisive, low information load. Goal: get a
  ready-to-decide visitor to chat (WhatsApp / LINE / email) within ~60 seconds.
- **thailandelite.net** = research-focused, encyclopedic, organic-SEO.
- **Channel split:** let thailandelite.net win organic SEO; drive **paid + direct +
  referral** traffic here. Don't fight for the same organic clicks.

## Anti-cannibalization rules (both sites, same operator)

1. Different content *angle*, not reworded copy — different facts for different audiences.
2. No duplicate URLs/intents. Keep this site's pages shorter and conversion-oriented
   (e.g. this `/faq` is tight, not a copy of thailandelite.net's long FAQ).
3. `rel="canonical"` points to **itself only** — never cross-canonical to the other site.
4. Schema emphasis here = **Service + Offer + LocalBusiness** (sales entities).
   thailandelite.net leans Organization + WebSite + Article.

## Positioning — two phases (build in order)

- **Phase 1 (now): "For when you're ready"** — paid-traffic landing page for visitors
  ready to decide, not research. Confident, decisive, low load. Polish Phase 1 and
  measure conversion for 2–3 weeks before starting Phase 2.
- **Phase 2 (later): applicant portal** — for in-progress applicants: document upload,
  status tracking, timeline, EPL contact, payment instructions. Light auth (password
  or link tokens, no full login for v1).

## Voice (different from thailandelite.net)

Conversational, decisive, outcome-led. Short, punchy sentences. "You", not "applicants".
Outcome-first ("Live in Thailand for 20 years"), not process-first. Italic emphasis on
what matters (*for Thailand*, *that fits your life*). Lifestyle benefit > bureaucracy.

- Avoid hype ("ultimate", "unlock", "elite lifestyle", "game-changing"), superlatives
  ("best", "#1", "most trusted"), AI-tells ("in today's fast-paced world", "delve into",
  "in conclusion"), and sales padding.

## Legal / compliance (CRITICAL — regulated GSSA)

- **NEVER write "tax haven"** anywhere (meta, body, schema, alt). Tax facts OK as
  reference (180-day rule, territorial taxation, 1 Jan 2024 remittance rule) — no
  "tax haven" framing. Keep tax to a brief footnote + "consult a qualified tax advisor".
- Brand naming: **"Thailand Privilege Visa (formerly Thailand Elite Visa)"** (rebrand
  Oct 2023). Never just "Thailand Elite" without context.
- Tier names (Bronze/Gold/Platinum/Diamond/Reserve) are **current-brand only** — never
  "Thailand Elite Bronze" etc. Legacy reference is program-level only.
- Don't write "no yearly/annual renewal" (ambiguous). Use "one-time membership fee" /
  "no annual membership fees".
- Never invent stats, member counts, partners, or testimonials — ask Pat if unsure.
- No superlatives about Daimaru. "An authorized GSSA" ✓; "the most authorized GSSA" ✗.
- "100% approval rate" only with caveat: "for qualified applicants with no criminal
  record who have never used a Volunteer or improper Student/ED visa."

## Verified facts (current as of 2026-06)

Tiers (THB / years / family):
- Bronze ฿650,000 / 5 / no family — application extension to 30 Sep 2026
- Gold ฿900,000 / 5 / no family
- Platinum ฿1,500,000 / 10 / family eligible (+฿1,000,000 per member)
- Diamond ฿2,500,000 / 15 / family eligible (+฿1,500,000 per member)
- Reserve ฿5,000,000 / 20 / family eligible (+฿2,000,000 per member, invitation only)

Active promo: **Next Member** — supplementary family card ฿750,000 until 14 Aug 2026
(Platinum/Diamond/Reserve only).

Background check: 5 agencies (Immigration Bureau, Dept. of Consular Affairs, Foreign
Affairs Division of Royal Thai Police, Central Investigation Bureau, AMLO), ~4–8 weeks.
Timeline: 6–10 weeks end-to-end. Payment AFTER approval; rejected applicants pay nothing.

Services: **EPA** (Elite Personal Assistant — airport meet-and-greet, Suvarnabhumi +
Phuket); **EPL** (Elite Personal Liaison — in-Thailand services, Bangkok only; first
session per service complimentary, then ฿3,000/service); Fast Track lanes at
Suvarnabhumi, Don Mueang, Phuket, Chiang Mai.

Contact: WhatsApp wa.me/66651561561 · LINE line.me/ti/p/~thailandeliteinfo ·
info@thailandelite.net · +66 65-156-1561. Lead: Patcharaphol "Pat" Nabhaboriraks,
Thailand Branch Lead, Daimaru Trading (ex-TPC Sales Division).

## Page roadmap (priority order)

1. `programs.html` — flesh out: 5-tier comparison, per-tier card (asset, price THB+USD,
   duration, family, 3–4 benefits, "best for" persona, one CTA), sticky mobile compare bar.
2. `how-it-works.html` (new) — 4 steps (simpler than sister's 6), timeline 6–10 weeks,
   reinforce "pay only after approval".
3. `who-its-for.html` (new) — 4–5 persona cards (entrepreneur, retiree, family, frequent
   visitor, second-passport), ~100 words each + tier fit + CTA.
4. `faq.html` — keep tight (12–15 Qs, objection-handling), 50–80 words each.
5. `contact.html` (new) — 3 channels + single-field email form. Chat-driven, no long forms.
6. `about.html` / `why-daimaru.html` (optional) — trust only (license, since 2015, awards,
   partnerships), 400–600 words, photos of awards + Pat.

**Don't build** (thailandelite.net's territory): long-form blog, "Privilege vs X" pages,
encyclopedic guides, country landing pages, comparative analyses, heavy tax content.

## Animation & performance budget

Feel: more fluid than the sister site. CSS + vanilla JS only (no React/Framer).
Techniques: IntersectionObserver scroll reveals (staggered), smooth scroll, count-up
stats, subtle hero parallax (bg only, transform/opacity), tier-card micro-interactions
(scale 1.02–1.05, shadow lift, 200–300ms easing), scroll-progress bar (exists).
- JS budget: < 50 KB total. Above-the-fold **LCP < 2.0s on 4G**. Transform/opacity only.
- **No hero videos** (LCP/data). Still hero image + parallax instead. Test on real
  mid-range Android.

## Phase 1 "done" checklist

- [x] Title ≤60 / meta ≤155 on all pages
- [x] og:image (1200×630) set + twitter:image
- [x] Skip-to-content link
- [x] FAQPage schema on faq.html
- [x] Sticky bottom CTA bar (verify on device)
- [x] Footer visa-sticker background
- [ ] programs.html fleshed out
- [ ] how-it-works.html
- [ ] who-its-for.html
- [ ] Hero real photo + LCP < 2.0s on 4G
- [ ] Real-device mobile test (mid-range Android)
- [ ] Cloudflare Pages + custom domain at launch; confirm AI crawlers allowed

## When in doubt

Ask Pat before writing. Don't invent facts/percentages/testimonials. Don't target the
same queries as thailandelite.net unless approved. Goal is differentiation, not duplication.
