# Tool screenshots

Drop optional screenshots for tool **detail pages** here, then reference them in `data.js`.

## How to add one
1. Save a screenshot in this folder, named after the tool's slug, e.g. `tradingview.png`
   (slug = the tool name lowercased with spaces → hyphens; same as the `/tools/<slug>.html` filename).
2. In `data.js`, add an `image` field to that tool, using a **root-absolute** path:
   ```js
   {
     name: 'TradingView',
     url: 'https://www.tradingview.com',
     // …
     image: '/assets/screenshots/tradingview.png'   // <-- add this
   }
   ```
   (A full external URL like `https://…/shot.png` also works.)
3. Run `node build.js`. The screenshot appears near the top of that tool's page.
   Tools **without** an `image` keep the current clean text layout — nothing breaks.

## Recommended specs
- **Aspect:** landscape, roughly 16:10 or 16:9 (it spans the page width, ~720px).
- **Width:** 1200–1600px (crisp on retina). Height follows naturally.
- **Format:** PNG, JPG or WebP. Keep each file **under ~300 KB** (compress; WebP/JPG help).
- **Content:** a clean view of the tool — close cookie banners/ads first. Use official
  press/brand assets where available.
- **Alt text** is generated automatically as "<Tool> screenshot".

## A note on rights
These are third-party product screenshots. Editorial/review use is common, but it's your
call — prefer official press images where a tool provides them, and only add screenshots
for tools you're comfortable featuring (e.g. your top / affiliate tools).
