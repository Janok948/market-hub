/*
 * Newsletter signup endpoint (Vercel serverless function).
 * Stores emails in Supabase. Works alongside the static site — no framework needed.
 *
 * To activate:
 *   1. Create the `subscribers` table (see supabase/schema.sql).
 *   2. Set SUPABASE_URL and SUPABASE_SERVICE_KEY in the Vercel project env vars.
 *   3. In app.js set: var NEWSLETTER_ENDPOINT = '/api/subscribe';
 *
 * Until the env vars are set this returns 500 and the form shows a friendly error,
 * so it is safe to deploy before Supabase is wired up.
 */
'use strict';
const { createClient } = require('@supabase/supabase-js');

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  // app.js posts JSON ({ email }) to our own /api endpoint.
  const body = req.body || {};
  const email = String(body.email || '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'invalid_email' });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return res.status(500).json({ error: 'not_configured' });

  try {
    const db = createClient(url, key, { auth: { persistSession: false } });
    const { error } = await db.from('subscribers').insert({ email });
    // 23505 = unique_violation: already subscribed — treat as success.
    if (error && error.code !== '23505') {
      console.error('subscribe insert failed:', error);
      return res.status(500).json({ error: 'store_failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('subscribe error:', e);
    return res.status(500).json({ error: 'server_error' });
  }
};
