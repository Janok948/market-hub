# Monetization & Accounts — the plan (Stripe + Supabase)

This is a **design doc**, not yet built. It exists so that when you add paid features you do
them in the right order and don't bolt on Stripe before there's something to sell.

> **Golden rule:** product idea → accounts (Supabase auth) → Stripe. Each step needs the one
> before it. Don't start with Stripe.

---

## 0. Today's monetization (no code needed)

The site already monetizes without any of this:

- **Affiliate links** — the strongest lever in this niche. Replace `YOUR_ID` in `data.js`
  (Binance, Coinbase, Kraken, Bybit, OKX, TradingView). Activated links get a "Partner" badge,
  `rel="sponsored"`, and flow through your referral both in the directory and inside courses.
- **Newsletter** — build the audience now (see DEPLOY.md); it's the asset that makes
  sponsorships and product launches possible later.
- **Display ads** — finance has high RPMs; add once you have steady traffic (e.g. Ezoic/AdSense).

Get these working and live **before** building a paid tier.

---

## 1. Pick a product (the prerequisite)

Stripe is just plumbing — decide *what* money changes hands for. Realistic options for a tools
directory, roughly easiest → hardest:

| Product | What the user pays for | Build effort |
|---------|------------------------|--------------|
| **"Buy me a coffee" / supporter** | Goodwill; maybe a name on a supporters page | Tiny (Payment Link) |
| **Sponsored listings** | A tool pays to be featured/pinned | Low — you edit `data.js`, invoice via Stripe Invoicing |
| **Paid course(s)** | Advanced/premium content beyond the free `/learn/` funnel | Medium |
| **Market Hub Pro (subscription)** | Cross-device sync, ad-free, premium curated lists, alerts | High (needs accounts) |

**Recommendation:** start with **sponsored listings** (no auth needed) and/or a **one-off
supporter link**. Only build "Pro" once traffic justifies it.

---

## 2. Tier A — Stripe with NO accounts (start here)

For one-off payments or sponsored slots you don't need a login or a database.

- **Stripe Payment Links** — create a product in the Stripe dashboard, get a hosted URL, drop it
  in a button. Zero code. Good for supporter payments and selling a sponsored slot.
- **Stripe Invoicing** — for sponsored listings, send the tool an invoice; when paid, you
  manually pin them in `data.js` and rebuild.

This covers a lot and carries almost no engineering risk.

---

## 3. Tier B — Pro tier (accounts + subscription)

Only when you want recurring revenue tied to unlocked features. This is the part that needs
Supabase auth and a webhook. Architecture:

```
Browser (logged in via Supabase Auth)
   │  "Upgrade" → Stripe Checkout (subscription)
   ▼
Stripe  ──(webhook: checkout.session.completed / customer.subscription.*)──►  /api/stripe-webhook
   │                                                                              │
   └────────────────────────────────────────────────────────────────────────────┘
                                                       writes is_pro = true into Supabase `profiles`
Browser reads profile.is_pro → unlocks Pro features (sync, ad-free, etc.)
```

### Pieces to build
1. **Auth** — Supabase Auth (magic link or Google). Add a lightweight login to the header.
2. **Tables** — `profiles` (is_pro, stripe_customer_id) and, for sync, `user_links`.
   Stubs are already in `supabase/schema.sql` (commented out).
3. **Checkout** — an `/api/checkout.js` function that creates a Stripe Checkout Session for the
   logged-in user and returns the URL.
4. **Webhook** — an `/api/stripe-webhook.js` function (verify the signature with
   `STRIPE_WEBHOOK_SECRET`) that flips `is_pro` on/off as subscriptions start, renew, or cancel.
   **The webhook is the source of truth — never trust the client to say it paid.**
5. **Gating** — on load, fetch the user's profile; show/hide Pro features accordingly. The
   existing `localStorage` model becomes the *free* tier; Pro adds DB-backed cross-device sync.

### New env vars (Vercel)
```
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...           # the Pro subscription price
SUPABASE_URL=...                    # already set for newsletter
SUPABASE_SERVICE_KEY=...            # already set for newsletter
```

### What "Pro" could unlock
- Cross-device sync of saved/hidden/custom links (today they're per-browser in `localStorage`).
- Ad-free experience.
- Premium curated collections, price/alert features, or early access to new courses.

---

## 4. Suggested sequence

1. ✅ Affiliate links live + newsletter collecting emails (DEPLOY.md).
2. Add a **Stripe Payment Link** for supporters / sell a **sponsored slot**. (Tier A)
3. Grow traffic + list. Validate that people want more.
4. Only then build **accounts + Pro** (Tier B): auth → checkout → webhook → gating.

Each step is independently shippable and earns before the next is built.
