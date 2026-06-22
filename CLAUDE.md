# CLAUDE.md — thailandprivilege-daimaru.com

Standing rules for all Claude Code work in this repository. Read this file at the start of every session. If any instruction conflicts with this file, this file wins — flag the conflict before acting.

## What this project is

A new, independent website for Daimaru Trading Co., Ltd. — authorized GSSA of Thailand Privilege Card Co., Ltd. (TPC) since 2015, License SA15/029, “Best Cooperation GSSA” award 2024, 2025, 2026. The site sells the Thailand Privilege Visa to a global English-speaking audience.

This is the sister site of [www.thailandelite.net](http://www.thailandelite.net) (same company, same team, Japan-focused). The two sites share contact infrastructure but must NEVER share copy. See Originality Rule below.

## Positioning — international, never Japanese

This site exists for international English-speaking clients. The “Daimaru” name appears because TPC requires the licensed GSSA entity to be named — it is a credential, NOT a market identity. Hard rules:

- The site must never read as a Japanese agency serving Japanese clients. No Japanese language anywhere. No Japan-first framing. Never assume the visitor is Japanese or in Japan.
- Pat (Bangkok, English/Thai) is the human face and narrative lead of the site. Daimaru Trading is the institutional license and track record standing behind him.
- Japan-related heritage (Sendai HQ, family leadership, Road Shows) may appear ONLY as brief institutional credibility on the About page — proof of standing, never positioning. One short section maximum, written in an international register.
- Copy speaks to retirees, remote entrepreneurs, investors, and families worldwide — see the target markets list under SEO rules.

## Site architecture — sales-forward landing model

- The home page IS the sales pitch. A visitor who never clicks deeper must still get everything needed to decide: what the program is, all five tiers with prices, key benefits, eligibility, the process, trust proof, FAQ, and a clear way to apply — in one continuous scroll, phone-first.
- Every other page is a depth annex: it expands something the home page already covers. No page may hold buying-decision information the home page lacks.
- Conversion-forward, luxury register: a CTA moment after each major section (tiers, process, FAQ) plus the sticky mobile bar. No urgency tricks, no countdown timers, no fake scarcity, no popups. The Bronze 30 Sep 2026 deadline is the only time element — it is a real fact, stated calmly.
- **Layout must be visibly distinct from thailandelite.net.** Different hero composition, different tier-card design, different process visualization, different section rhythm and spacing character. Same brand family, different building. Functional UX patterns (multi-step apply flow, autosave, deep links, accordion) may be shared; their visual execution may not. If a section would look like the old site’s version of that section, redesign it.
- Brand name: Thailand Privilege Visa by Daimaru
- Domain: [www.thailandprivilege-daimaru.com](http://www.thailandprivilege-daimaru.com)
- Stack: static HTML/CSS/vanilla JS, no build step, Tailwind CDN OK, minimal Alpine.js OK
- Deploy: GitHub → Cloudflare Pages (auto-deploy from main). Site must work fully on the temporary .pages.dev URL before custom domain connects.
- Owner is non-technical. Keep everything simple and explained in plain English.

## Terminology (use exactly)

- Program / brand: **Thailand Privilege**
- Product: **Thailand Privilege Visa**
- Official passport sticker: **Privilege Entry Visa**
- General reference: **Thailand Privilege program**
- Always available phrasing: “Thailand Privilege Visa (formerly Thailand Elite Visa)”
- Current tier names ONLY: Bronze, Gold, Platinum, Diamond, Reserve. Legacy names (Elite Easy Access etc.) only in clearly historical context.

## Verified program data (never alter, never extend)

- Bronze — ฿650,000 (~$19,000 USD) · 5 years · 0 annual points · application deadline 30 Sep 2026 · frame as “most applied” entry tier
- Gold — ฿900,000 (~$26,000 USD) · 5 years · 20 annual points
- Platinum — ฿1,500,000 (~$44,000 USD) · 10 years · 35 annual points · family add-ons available
- Diamond — ฿2,500,000 (~$73,000 USD) · 15 years · 55 annual points · family add-ons available
- Reserve — ฿5,000,000 (~$146,000 USD) · 20 years · 120 annual points · invitation only · family add-ons available

Pricing format house style: baht first, USD approximation second — “฿650,000 (~$19,000 USD)”. (The earlier “No EUR” rule no longer applies — see currency-toggle decision below.)

**Owner decision, 2026-06-22 (supersedes the “No EUR” rule):** structured price displays carry a **currency toggle**. Thai baht (฿) is always the price of record and is shown unchanged; the toggle adds an **approximate equivalent** in one of: USD, EUR, GBP, AUD, CAD, SGD, AED, HKD, TWD. Every non-THB figure must be labelled approximate, with a note that payment is made in baht to TPC. Rates are fixed, owner-editable approximations kept in `/assets/js/currency.js` (rounded to the nearest 1,000; not live FX). Toggle currently lives on the home tiers section and the Programs page; inline prose price mentions stay baht + USD.

Family add-ons: Platinum/Diamond/Reserve only, standard rates ฿1,000,000 / ฿1,500,000 / ฿2,000,000 per member. Eligible: spouse (incl. same-gender), children, stepchildren, parents. Parents-in-law NOT eligible. Never mention the ended ฿500,000 promo.

Process facts: no upfront fee; payment only after approval, paid directly to TPC, never to Daimaru; background check 4–8 weeks across 5 Thai government agencies (Immigration, Dept. of Consular Affairs, Foreign Affairs Division of Royal Thai Police, Central Investigation Bureau, AMLO); end-to-end typically 6–10 weeks; visa permits residency not employment; no path to PR or citizenship; sticker affixed at Chaengwattana Immigration or on arrival at Suvarnabhumi/Phuket.

## Voice and honesty

- Authoritative, factual, calmly confident, luxury positioning with private-banking restraint.
- No exclamation marks. No hype. No overselling. No “world-class,” “premier,” “ultimate,” “best-in-class.”
- Never invent statistics, perks, success rates, or affiliations.
- “100% approval rate” must ALWAYS carry its qualifier: applies to qualified applicants (no criminal record, no prior Volunteer visa or improper ED visa use); final approval rests with TPC.
- Frame limitations positively but truthfully. Example: not “Bronze has no points” but “Bronze includes all core Thailand Privilege services — airport fast track, concierge, member call center. Annual points begin from Gold.”
- NEVER write “tax haven” anywhere (compliance rule).
- Tax topic: brief FAQ note only, with “consult a qualified tax advisor” disclaimer.

## Originality Rule

Never reuse copy from [www.thailandelite.net](http://www.thailandelite.net) or any other site. Replicating structure, UX patterns, and page flows from thailandelite.net is allowed and intended; the wording must be 100% original — different headlines, different sentence rhythm, different framing. Verified facts may overlap; the words around them may not.

## Trust signals: schema-deep, visually-shallow

- Rich structured data: Organization, Service with offer pricing, FAQPage, BreadcrumbList, Person (Pat — NO sameAs links, he has no external profiles).
- Visually: the GSSA badge appears in the footer only (as on thailandelite.net). On most pages, awards and credentials live in copy and schema — no badge walls, no loud trust banners, no urgency tricks.
- **Owner decision, 2026-06-18 (supersedes the earlier "awards live only in copy and schema" rule):** the **Best Cooperation GSSA** award — won three consecutive years (2024, 2025, 2026) — **may be shown visually** as a restrained credential, and a **photo of the GSSA authorization certificate** may appear on the About page. Keep the private-banking register: a quiet credential block and a real certificate photo, not trophy graphics or a loud banner. This visible-award treatment is for the About page; other pages keep the footer-badge-only convention.
- Hero stat counters (text, not badges) are allowed: “1,000+ Members Served · Since 2015 — Authorized GSSA · 100% Approval Rate*” with the qualifier footnote nearby.

## SEO rules (learned from thailandelite.net GSC data)

- Target qualified queries (cost, agent, apply, vs, reviews, how to), NOT bare navigational terms (“thailand privilege”, “thailand elite”) — those belong to the official TPC site and are unwinnable.
- Lean toward US-intent phrasing and topics; USA is the largest opportunity market.
- Target markets: Thailand, USA, UK, Australia, Canada, Singapore, Taiwan, UAE/Gulf, Hong Kong, France, Germany, Belgium, Spain. NOT Japan or China (handled separately by the company).
- Title tags ≤60 chars. Meta descriptions ≤155 chars. Unique per page.
- Keep FAQPage markup for machine parsing, but know Google deprecated FAQ rich results (May 2026) — the visible Q&A text is the real AI-citation lever. Write FAQ answers as standalone, complete, extractable sentences.
- Do NOT add: HowTo schema (dead), AggregateRating on own reviews (self-serving, ineligible), llms.txt (no AI system uses it), hreflang (English-only site), personal sameAs for Pat.
- Mention “formerly Thailand Elite Visa” naturally 2–3 times sitewide (home, About, one FAQ) for honest legacy-keyword capture. No keyword stuffing.

## Mobile-first mandate

> **Top priority (owner directive, 2026-06-15):** ~80% of visitors are on mobile phones. This is a **mobile-phone-first site** — every design, layout, copy, and performance decision is made for the phone screen first and verified there before anything else. When a trade-off pits desktop polish against mobile experience, mobile wins.

Design phone-first (375px), scale up. Hero readable without scrolling at 375px. Sticky bottom bar on mobile: Apply Now + WhatsApp + Line deep links. Tap targets ≥48px, ≥8px apart. Body text ≥16px, line-height ≥1.5. Multi-step forms: one step per screen, autosave to localStorage, correct input types (tel/email/number). FAQ accordion items ≥56px tall, keyboard + ARIA accessible. Images: WebP with fallback, lazy-loaded, explicit width/height, srcset. Targets on 4G mobile: LCP <2.5s, CLS <0.1, INP <200ms. (The old site shipped with LCP 4.4–7.5s and is still paying for it — do not repeat that.) Test every layout at 320 / 375 / 414 / 768 / 1280+.

## Visual system — Cocoa & Bronze (prototype-derived)

> **Owner decision, 2026-06-13:** this site keeps the Fable 5 prototype's look exactly. This section supersedes the earlier "Golden Silk" direction. The mood is warm and editorial — alternating bright ivory and deep cocoa fields — still a distinct building from the dark Royal-Blue sister site (thailandelite.net).

- Dominant light field: **#FAF6EE** (ivory), with **#F2EBDC** as a second tone. Generous use across body sections.
- Dark fields: **#1F1611** (cocoa), with **#3A2A20** as a softer dark — used for hero, footer, and feature bands (Benefits, Contact).
- **Bronze #A8743F** and **Bronze-deep #82532A**: the primary accent — eyebrows, links, hairlines, CTAs and hover states on light fields.
- **Gold #C9A876**: highlight accent on dark fields only (headline emphasis, icons, the marquee ribbon). NEVER gold or tan text on ivory — fails contrast.
- Body text: cocoa on ivory, or ivory on cocoa. Tier-card chips use decorative metallic gradients per tier (bronze/gold/platinum/diamond/reserve), aria-hidden.
- WCAG AA contrast is non-negotiable on every text/background pairing.

Typography: **Fraunces** for display (including italic), **Manrope-weight** sans **Inter** for body — both from Google Fonts. (The general ban on Inter is lifted for this site by the owner's prototype decision; the sister site uses DM Sans, so the two body faces still differ.)

## Languages

English only. No language switcher, no /locales/ folder, no hreflang. Translations are a future decision, not scaffolding to build now.

## Configuration

All changeable identity values live in ONE file: /assets/js/config.js — one value per line, commented in plain English. Runtime JS injection for human-facing values (email, phone, Line). SEO-critical values (canonical URLs, OG tags, sitemap, schema) are hardcoded with the current domain; README documents that a domain change means asking Claude Code to refresh them. NO build scripts, NO GitHub Actions, NO tooling that requires running commands.

Contact values (intentionally shared with thailandelite.net for a unified inbox — NAP must match the TPC agent listing and both sites exactly):

- Phone/WhatsApp: (+66) 065-156-1561 · wa.me/66651561561
- Line: thailandeliteinfo · line.me/ti/p/~thailandeliteinfo
- Email: [info@thailandelite.net](mailto:info@thailandelite.net)
- Contact person: Patcharaphol “Pat” Nabhaboriraks — Bangkok lead, former TPC Sales Division. Speaks English and Thai only (disclose this honestly near contact points).
- Social: facebook.com/ThailandEliteMember · instagram.com/thailand_privilege_visa

Every form submission carries a hidden source field tagging this site, and a subject prefix so Pat can tell which site a lead came from.

## Governance (lightweight)

- Read CLAUDE.md and README.md at the start of every session before changing anything.
- Work in batches; pause for owner approval between batches.
- After each batch: state which files were created/changed and why, in one short line each.
- Edit only what was asked. No silent rewrites of unrelated sections.
- If a request conflicts with this file or earlier decisions, flag it before acting.
- Never fabricate facts to fill gaps — mark unknowns as [PLACEHOLDER] or ask.
- Once the site has traffic: never delete or rename a URL without a 301 redirect plan.

## Legal

Footer disclaimer on every page: Daimaru Trading Co., Ltd. is an authorized General Sales & Services Agent (License SA15/029) — an independent consultancy, not Thailand Privilege Card Co., Ltd. itself. No testimonials at launch. All names/photos/stats not verified above are [PLACEHOLDER] until the owner supplies them.
