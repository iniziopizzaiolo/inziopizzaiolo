# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for **Inizio** — a Neapolitan pizza experience business in Madrid run by Rodny López (world-competition pizzaiolo). The site markets three services: workshops (*talleres*), private dinners (*cenas*), and catering. All content is in Spanish.

No build system, no package manager, no dependencies. Push to origin → Netlify auto-deploys.

## Development

There are no build or lint commands. Edit files directly and open them in a browser to verify changes. To preview locally, any static file server works:

```bash
python3 -m http.server 8080
# or
npx serve .
```

The live site is at `https://iniziopizzaiolo.com`. Netlify deploys from the `main` branch.

## Architecture

### Configuration-first design

**All business data lives in one place: `js/config.js`** — the `INIZIO` object. Never hardcode prices, dates, phone numbers, social handles, or form IDs directly in HTML. The config drives:

- WhatsApp number (used to rewrite every `wa.me` link on page load)
- Upcoming session dates with availability (`plazas: 0` marks a session as full)
- Google Form ID and date-field entry ID (pre-fills reservation forms)
- Social media handles (empty string = hidden)
- Stats counters rendered into `[data-stat="..."]` elements

The code below `// NO TOQUES NADA A PARTIR DE AQUI` in `config.js` is the runtime engine — `renderFechas()`, `buildFormUrl()`, `buildWaUrl()`, and event listeners. Do not modify this section unless changing functionality.

### JavaScript split

- `js/config.js` — data + dynamic rendering (dates grid, WhatsApp rewrites, social cards, stats, GA4/Meta Pixel/GTM conversion events)
- `js/main.js` — pure UI interactions: nav scroll shadow, mobile menu toggle, FAQ accordion, IntersectionObserver scroll-reveal

Both scripts are loaded at the bottom of each HTML page with `<script src="/js/config.js">` first, then `<script src="/js/main.js">`.

### Page structure pattern

Every HTML page follows this head order:
1. Facebook domain verification meta tag
2. Viewport / description / title
3. Open Graph tags (`og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:locale`, `og:site_name`)
4. Twitter Card tags
5. Favicon
6. Schema JSON-LD `<script type="application/ld+json">` (type varies: `FoodEstablishment`/`LocalBusiness` on homepage, `FAQPage` where applicable, `BlogPosting` on articles)
7. Google Fonts preconnect + stylesheet
8. CSS: `/css/style.css`, then `/css/extra.css` (landing pages also include `/css/landings.css`)
9. Google Tag Manager `<noscript>` iframe after `<body>`

When creating a new page, copy an existing one and update all meta tags, canonical URL, Schema JSON-LD, and `<title>`.

### CSS design system

Custom properties in `css/style.css`:

```
--color-crema:  #FEEEC1   (backgrounds)
--color-rojo:   #7F1100   (primary/accent)
--color-verde:  #294C29   (secondary accent)
--color-dorado: #E7AF67   (highlights)
```

Fonts: **Cormorant Garamond** (headings), **Fredoka** (display/fun), **Inter** (body). All loaded from Google Fonts.

Button classes: `.btn--primary`, `.btn--outline`, `.btn--sm`.

### Routing and URL conventions

Netlify rewrites (defined in `netlify.toml`) enforce:
- `www` → canonical (no-www)
- `.html` extensions stripped from URLs — all pages live in subdirectories with `index.html` (e.g. `taller/index.html` → `/taller/`)
- Exception: `articulos.html` stays as a file because `/articulos/` is also a folder with article pages. Netlify rewrites `/articulos` → `/articulos.html` with status 200.

### Analytics and tracking

Three tracking layers fire on every meaningful user action (WhatsApp clicks handled in `config.js`):
- **GA4** via GTM (container `GTM-TR3HF8LR`, property `G-YHBN7B6LWV`) — `gtag('event', 'click_whatsapp', ...)`
- **Meta Pixel** (`1017889490582215`) — `fbq('track', 'Contact', ...)`
- **GTM dataLayer** — `dataLayer.push({ event: 'whatsapp_click', ... })`

### CSP

The `Content-Security-Policy` header in `netlify.toml` explicitly allowlists analytics scripts. When adding new third-party scripts, update the CSP in `netlify.toml` or they will be blocked.

### Images

Static images are in `img/`. The site uses Netlify image CDN URLs (e.g. `/.netlify/images?url=/img/...&w=800&q=80`) for responsive delivery in pages where performance is important. Hero and above-the-fold images use `<link rel="preload" as="image" fetchpriority="high">` in `<head>`.

### Sitemap

`sitemap.xml` must be manually updated when adding or removing pages.
