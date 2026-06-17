# Market Hub

A clean, minimalist dashboard of the most essential tools for **crypto** and **stock-market** research — each link with a short description of what it's best for. Add your own links, and (optionally) earn from affiliate referrals. Ships with a static SEO build so it can actually rank and be shared.

---

## 1. Use it locally

Double-click **`index.html`** (or drag it into your browser). No install, no server, no account. Everything you add/hide and your theme are saved in your browser via `localStorage`.

- Filter by **All / Stocks / Crypto / Macro**, or **★ My Links**
- **Search** instantly — press `/` to focus, `Esc` to clear. Searches are shareable via `?q=` / `?filter=` in the URL.
- **+ Add** your own sites; **hide** defaults you don't use (restore from the footer)

---

## 2. Make money (optional) — affiliate links

The highest-value programs in this niche are **crypto-exchange referrals** and **trading-tool affiliates**. Slots are pre-wired for the biggest ones.

1. Sign up for the relevant affiliate/referral programs (e.g. Binance, Coinbase, Kraken, Bybit, OKX, TradingView).
2. Open **`data.js`** and replace `YOUR_ID` in the `affiliate:` field of those entries with the exact link from each program's dashboard. Example:
   ```js
   affiliate: 'https://accounts.binance.com/register?ref=AB12CD34'
   ```
3. You can add `affiliate:` to **any** entry, including your own custom ones.

When a link is activated it automatically:
- points to your affiliate URL instead of the plain one,
- shows a **“Partner”** badge, and
- gets `rel="sponsored"` (good practice + required by many programs).

Until you replace `YOUR_ID`, the link **safely falls back** to the normal URL — no badge, no broken redirect. The footer carries an FTC-style affiliate disclosure (required in the US and good practice everywhere).

> See the honest monetization breakdown: affiliate is the strongest lever; display ads (finance has high RPMs) and a newsletter/sponsorships come once you have traffic.

### Newsletter signup

The page has a compact **hero** and a **newsletter strip** (the CTA that turns one-time visitors into a returning, monetizable audience). Out of the box it runs in *demo mode* — it validates the email and thanks the user but stores nothing.

To start collecting sign-ups, set one constant in **`app.js`**:

```js
var NEWSLETTER_ENDPOINT = 'https://formspree.io/f/XXXXXXX';   // or Buttondown / Beehiiv / Netlify form URL
```

The form POSTs an `email` field to that URL. Most providers work as-is (Formspree, Buttondown, Netlify Forms). For Mailchimp/Beehiiv you can instead paste their embed code in place of the `<form id="newsletterForm">` in `index.html`. The hero auto-hides once a visitor starts searching or filtering, so it never gets in the way.

---

## 3. Build for the web (SEO)

Before deploying, generate the static SEO assets with **Node** (no dependencies):

```bash
SITE_URL=https://yourdomain.com node build.js
```

This creates / refreshes:

| Output | What it's for |
|--------|----------------|
| `tools/<slug>.html` | One **landing page per tool** — title, description, overview, "best for", key facts, related-tool links, canonical, Open Graph, and `WebApplication` + `BreadcrumbList` JSON-LD |
| `index.html` (injected) | Canonical, Open Graph, Twitter Card, and `WebSite` + `ItemList` JSON-LD, plus a crawlable **Full directory** of every tool (also works with JS disabled) |
| `sitemap.xml` | Every page, for search engines |
| `robots.txt` | Points crawlers at the sitemap |

Re-run the command any time you edit `data.js`. It's safe to run repeatedly (idempotent). If you skip `SITE_URL`, it defaults to `https://example.com` as an obvious placeholder.

> **Note:** the tool landing pages are solid *scaffolds*. For competitive long-tail ranking ("X review", "X vs Y", "best Z 2026"), expand each page's Overview with original content — thin/duplicate pages don't rank well on their own.

---

## 4. Deploy

It's a fully static site — host it anywhere:

- **Netlify / Cloudflare Pages / Vercel** — drag the folder in, or connect the repo (no build command needed; `node build.js` is run by you beforehand).
- **GitHub Pages** — push the folder to a repo and enable Pages.

After it's live, submit `https://yourdomain.com/sitemap.xml` in **Google Search Console** to get indexed faster.

---

## 5. Customize the default list

Edit the `SEED_LINKS` array in **`data.js`**:

```js
{
  name: 'TradingView',
  url: 'https://www.tradingview.com',
  description: 'Short, useful description…',
  sections: ['stocks', 'crypto'],          // any of: 'stocks' | 'crypto' | 'macro'
  group: 'Charting & Technical Analysis',
  affiliate: 'https://...?ref=YOUR_ID'      // optional
}
```

Then re-run `node build.js` to regenerate the pages and sitemap.

---

## 6. Free courses (content + affiliate funnel)

The site includes free short courses under **`/learn/`** — the strongest affiliate pattern in this niche: teach a skill, then recommend the tool to do it (with your affiliate link) in context. Courses also pull in search traffic that a bare link list can't.

- Content lives in **`courses.js`** (plain data — paragraphs, lists, callouts, and inline tool CTAs). The build turns it into a `/learn/` hub, one page per course, a homepage teaser, `Course` JSON-LD, and sitemap entries.
- Inside a lesson, a `{ tool: 'binance', text: '…' }` block renders a **tool CTA that uses your affiliate link automatically** (same engine as the directory — placeholder-safe, `rel="sponsored"`, "Partner" badge). So activating an exchange referral in `data.js` lights up its links *both* in the directory and inside the relevant course.

**Add or edit a course:** edit `courses.js`, then `node build.js`. Example block types:

```js
{ p: 'Paragraph with **bold**, *italic*, `code`.' }
{ h: 'Sub-heading' }
{ ul: ['point one', 'point two'] }      // or { ol: [...] } for numbered steps
{ note: 'Tip callout' }                 // or { warn: 'Warning callout' }
{ tool: 'tradingview', text: 'Why it fits here.' }   // affiliate-aware CTA
{ fig: 'candlestick-anatomy', caption: 'Explainer diagram.' }   // SVG from assets/figures/
```

**Diagrams** are hand-drawn SVGs in `assets/figures/` (e.g. `candlestick-anatomy`, `trend-support-resistance`, `blockchain-blocks`). Drop one into a lesson with a `fig` block; add new ones by saving an SVG there and referencing its filename. They're vector (crisp at any size) and the `caption` doubles as `alt` text for image SEO.

The four starter courses (buying crypto, chart reading, on-chain analysis, stock foundations) are fully written and map to the affiliate tools they teach.

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | App shell + injected SEO + crawlable directory |
| `styles.css` | Theme, layout, and tool-page styles |
| `app.js` | Rendering, search, filters, add/hide, affiliate logic, URL state |
| `data.js` | The curated link list (**edit this**) |
| `courses.js` | Free course content (**edit this**) |
| `build.js` | Static SEO + course generator (`node build.js`) |
| `assets/og-cover.svg` | Social-share image |
| `tools/`, `learn/`, `sitemap.xml`, `robots.txt` | Generated by the build |

## Notes
- **OG image:** shipped as SVG. Facebook/X prefer PNG/JPG — for best previews, open `assets/og-cover.svg`, export it to a 1200×630 PNG, save as `assets/og-cover.png`, and point the `og:image` lines at it.
- **Favicons** come from Google's public favicon service; a colored initial is shown if one fails.
- Nothing here is financial advice.
