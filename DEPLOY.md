# Deploying Market Hub

Market Hub is a **static site** with one optional serverless function (the newsletter).
Hosting is simple; the only real step is running the build with your real domain.

---

## 1. Put it in Git

The project isn't a Git repo yet. Create one and push to GitHub:

```bash
cd market-hub
git init
git add -A
git commit -m "Market Hub"
gh repo create market-hub --public --source=. --push   # or create the repo in the GitHub UI
```

---

## 2. Deploy on Vercel

1. Go to **vercel.com → Add New → Project** and import the GitHub repo.
2. Settings are already in `vercel.json`, so just confirm:
   - **Framework preset:** Other
   - **Build command:** `node build.js`  *(from vercel.json)*
   - **Output directory:** `.`  *(from vercel.json)*
3. Add an **Environment Variable**:
   - `SITE_URL = https://yourdomain.com` (your real domain — used for canonical URLs, sitemap, OG tags)
4. **Deploy.** Vercel runs `node build.js`, which regenerates `tools/`, `learn/`, `sitemap.xml`,
   `robots.txt`, and injects the SEO blocks into `index.html`.

`vercel.json` also enables **clean URLs** (`/tools/tradingview` instead of `.html`) and adds
basic security + caching headers.

> Netlify / Cloudflare Pages work the same way: build command `node build.js`, publish
> directory `.`, env var `SITE_URL`. (The newsletter function in `/api` is Vercel-specific;
> on Netlify you'd move it to `netlify/functions/` with minor changes.)

---

## 3. Custom domain

In Vercel → Project → **Domains**, add your domain and follow the DNS instructions.
After it resolves, redeploy so `SITE_URL` matches (or trigger a rebuild).

---

## 4. Newsletter — make it actually collect emails

The form is already coded; it just needs an endpoint. Pick one:

### Option A — No backend (fastest)
Sign up for **Formspree**, **Buttondown**, **Beehiiv**, or **ConvertKit**, copy your form URL,
and set it in `app.js`:

```js
var NEWSLETTER_ENDPOINT = 'https://formspree.io/f/XXXXXXX';
```

Commit & redeploy. Done — signups land in that provider.

### Option B — Own your list (Supabase)
Uses the bundled `api/subscribe.js` function.

1. Create a Supabase project (free tier is fine).
2. **SQL Editor** → paste `supabase/schema.sql` → Run (creates the `subscribers` table).
3. In Vercel → **Environment Variables**, add:
   - `SUPABASE_URL` — Supabase → Project Settings → API → Project URL
   - `SUPABASE_SERVICE_KEY` — same page → `service_role` secret key  *(server-only, never in client code)*
4. In `app.js` set:
   ```js
   var NEWSLETTER_ENDPOINT = '/api/subscribe';
   ```
5. Commit & redeploy. Emails now insert into your Supabase `subscribers` table.

Either way, until you set the endpoint the form stays in safe **demo mode** (validates and
thanks the user, stores nothing) — so it never looks broken.

---

## 5. Professional polish (recommended)

- **Analytics** — add Vercel Analytics (one toggle) or a Plausible script tag.
- **OG image as PNG** — export `assets/og-cover.svg` to a 1200×630 `assets/og-cover.png`
  and point the `og:image` lines at it (SVG previews poorly on Facebook/X).
- **Google Search Console** — verify the domain and submit `https://yourdomain.com/sitemap.xml`.
- **Affiliate links** — replace the `YOUR_ID` placeholders in `data.js` with your real
  referral links to activate monetization (see README §2). Re-run the build.

---

## Re-deploying after edits

Any push to the connected branch triggers a fresh Vercel build automatically.
Locally, you can preview the production build with:

```bash
SITE_URL=https://yourdomain.com node build.js
python3 -m http.server 8000   # then open http://localhost:8000
```
