#!/usr/bin/env node
/* ============================================================ Market Hub
 * Static SEO generator. No dependencies — just `node build.js`.
 *
 * Set your domain so canonical/sitemap/OG URLs are correct:
 *     SITE_URL=https://yourdomain.com node build.js
 *
 * Generates:
 *   - tools/<slug>.html   one landing page per tool (meta, OG, JSON-LD, related links)
 *   - sitemap.xml         every page
 *   - robots.txt          points crawlers at the sitemap
 *   - injects canonical + Open Graph + Twitter + JSON-LD into index.html  (SEO markers)
 *   - injects the crawlable "Full directory" links into index.html        (TOOLS markers)
 * ------------------------------------------------------------------------- */
'use strict';
var fs = require('fs');
var path = require('path');

var ROOT = __dirname;
var SITE_URL = (process.env.SITE_URL || 'https://example.com').replace(/\/+$/, '');
var SITE_NAME = 'Market Hub';
var INDEX_TITLE = 'Market Hub — Best Crypto & Stock Market Tools';
var INDEX_DESC = 'A curated directory of the best tools for crypto and stock-market research — charting, market data, on-chain analytics, screeners, news and more, each with a description.';
var OG_IMAGE = SITE_URL + '/assets/og-cover.png';  // PNG previews reliably on X/Facebook/LinkedIn
var CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'privacy@example.com';  // set CONTACT_EMAIL to your real address

global.window = {};
require(path.join(ROOT, 'data.js'));
var LINKS = window.SEED_LINKS || [];

/* ------------------------------------------------------------- metadata */
var SECTION_ORDER = ['stocks', 'crypto', 'macro'];
var SECTION_LABEL = { stocks: 'Stocks', crypto: 'Crypto', macro: 'Macro & Economy' };
var SECTION_AUDIENCE = { stocks: 'investors and traders', crypto: 'crypto traders and on-chain researchers', macro: 'macro analysts and economists' };
var SECTION_PHRASE = { stocks: 'the stock market', crypto: 'crypto markets', macro: 'the global economy' };

var GROUP_ORDER = [
  'Charting & Technical Analysis', 'Market Data & Quotes', 'Screeners', 'Fundamentals & Research',
  'Filings & Ownership', 'Options & Derivatives', 'Earnings & Calendars', 'News & Analysis',
  'Market Data & Aggregators', 'Derivatives & Futures', 'On-Chain Analytics', 'DeFi & TVL',
  'Block Explorers', 'DEX & Discovery', 'Exchanges', 'Portfolio & Wallets', 'NFT', 'News & Research',
  'Economic Data', 'Cross-Asset & Calendars'
];

var GROUP_BLURB = {
  'Charting & Technical Analysis': 'charting and technical analysis',
  'Market Data & Quotes': 'real-time market data and quotes',
  'Screeners': 'screening and filtering markets',
  'Fundamentals & Research': 'fundamental research and valuation',
  'Filings & Ownership': 'regulatory filings and ownership data',
  'Options & Derivatives': 'options and derivatives analysis',
  'Earnings & Calendars': 'earnings and event tracking',
  'News & Analysis': 'market news and analysis',
  'Market Data & Aggregators': 'crypto market data',
  'Derivatives & Futures': 'crypto derivatives analytics',
  'On-Chain Analytics': 'on-chain analytics',
  'DeFi & TVL': 'DeFi and TVL analytics',
  'Block Explorers': 'blockchain exploration',
  'DEX & Discovery': 'DEX data and token discovery',
  'Exchanges': 'trading crypto',
  'Portfolio & Wallets': 'portfolio and wallet tracking',
  'NFT': 'NFT trading and discovery',
  'News & Research': 'crypto news and research',
  'Economic Data': 'economic data',
  'Cross-Asset & Calendars': 'cross-asset data and calendars'
};

var BEST_FOR = {
  'Charting & Technical Analysis': ['Drawing and studying price charts', 'Applying technical indicators and alerts', 'Comparing multiple assets and timeframes'],
  'Market Data & Quotes': ['Checking real-time quotes and key stats', 'Reviewing financial statements and news', 'Building and tracking watchlists'],
  'Screeners': ['Filtering thousands of assets by criteria', 'Spotting setups and outliers fast', 'Saving and reusing custom screens'],
  'Fundamentals & Research': ['Valuing companies and assets', 'Comparing historical fundamentals', 'Building a long-term thesis'],
  'Filings & Ownership': ['Reading primary-source filings', 'Tracking institutional and insider activity', 'Monitoring ownership changes'],
  'Options & Derivatives': ['Analyzing options chains and Greeks', 'Modeling strategies and payoffs', 'Following unusual flow and volatility'],
  'Earnings & Calendars': ['Tracking upcoming earnings dates', 'Gauging expected moves', 'Avoiding surprise event risk'],
  'News & Analysis': ['Following market-moving headlines', 'Reading expert commentary', 'Staying ahead of sentiment shifts'],
  'Market Data & Aggregators': ['Comparing prices and market caps', 'Researching thousands of tokens', 'Tracking market-wide trends'],
  'Derivatives & Futures': ['Monitoring funding and open interest', 'Watching liquidations in real time', 'Gauging leverage and positioning'],
  'On-Chain Analytics': ['Reading on-chain supply and flows', 'Following smart-money wallets', 'Confirming trends with blockchain data'],
  'DeFi & TVL': ['Comparing protocols by TVL', 'Tracking yields and protocol revenue', 'Assessing chain and protocol risk'],
  'Block Explorers': ['Looking up transactions and addresses', 'Inspecting smart contracts and tokens', 'Verifying on-chain activity'],
  'DEX & Discovery': ['Finding new and trending tokens', 'Checking DEX liquidity and charts', 'Tracking catalysts and events'],
  'Exchanges': ['Buying, selling and trading crypto', 'Accessing deep liquidity', 'Using spot and derivatives markets'],
  'Portfolio & Wallets': ['Tracking holdings in one place', 'Monitoring DeFi and wallet activity', 'Setting price and balance alerts'],
  'NFT': ['Browsing and trading NFTs', 'Tracking collections and floor prices', 'Discovering new drops'],
  'News & Research': ['Following crypto headlines', 'Reading data-driven research', 'Understanding narratives early'],
  'Economic Data': ['Pulling official economic series', 'Tracking indicators and forecasts', 'Putting markets in macro context'],
  'Cross-Asset & Calendars': ['Watching multiple asset classes', 'Following the economic calendar', 'Timing around major data releases']
};

/* -------------------------------------------------------------- helpers */
var PLACEHOLDER_RE = /YOUR_ID|YOUR_REF|__REF__/i;
function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function jsonld(obj) { return JSON.stringify(obj).replace(/</g, '\\u003c'); }
function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
function hostname(u) { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return ''; } }
function primarySection(t) { for (var i = 0; i < SECTION_ORDER.length; i++) { if (t.sections.indexOf(SECTION_ORDER[i]) >= 0) return SECTION_ORDER[i]; } return 'stocks'; }
function groupRank(g) { var i = GROUP_ORDER.indexOf(g); return i < 0 ? 999 : i; }

var FAVICON = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%230b0c0f'/><path d='M16 5l9 11-9 11-9-11z' fill='%2310b981'/></svg>";
var BRAND_MARK = '<svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#10b981" opacity="0.14"/><path d="M16 5l9 11-9 11-9-11z" fill="#10b981"/></svg>';

/* ----------------------------------------------------- normalize tools */
var used = {};
var tools = LINKS.map(function (it) {
  var slug = slugify(it.name) || 'tool';
  while (used[slug]) { slug += '-x'; }
  used[slug] = true;
  var affActive = !!it.affiliate && !PLACEHOLDER_RE.test(it.affiliate);
  return {
    name: it.name, url: it.url, description: it.description || '',
    sections: it.sections || ['stocks'], group: it.group || 'Other',
    slug: slug, host: hostname(it.url),
    out: affActive ? it.affiliate : it.url, isAff: affActive,
    // Optional rich content (unique, hand-written) — see data.js. Falls back to template.
    overview: it.overview || null,   // array of paragraph strings
    bestFor: it.bestFor || null,     // array of bullet strings
    faqs: it.faqs || null            // array of { q, a }
  };
});

function relatedTo(t) {
  var list = tools.filter(function (x) { return x.slug !== t.slug && x.group === t.group; });
  if (list.length < 6) {
    var sec = primarySection(t);
    tools.forEach(function (x) {
      if (list.length >= 6) return;
      if (x.slug !== t.slug && x.sections.indexOf(sec) >= 0 && list.indexOf(x) < 0) list.push(x);
    });
  }
  return list.slice(0, 6);
}

var toolBySlug = {};
tools.forEach(function (t) { toolBySlug[t.slug] = t; });

require(path.join(ROOT, 'courses.js'));
var COURSES = window.COURSES || [];
var COURSE_SEC_LABEL = { stocks: 'Stocks', crypto: 'Crypto', macro: 'Macro', general: 'Markets' };

// Tiny inline <head> script so sub-pages honor the theme chosen on the homepage (no flash).
var THEME_SCRIPT = '<script>try{var t=localStorage.getItem("marketHub.theme.v1");if(t)document.documentElement.setAttribute("data-theme",JSON.parse(t));}catch(e){}</script>';

/* --------------------------------------------------- shared sub-page UI */
var SUN_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
var MOON_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
var CLOCK_ICON = '<svg class="mi" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7.5v5l3 1.8"/></svg>';
var LAYERS_ICON = '<svg class="mi" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>';
var CHECK_ICON = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 6.5"/></svg>';

// Cookie-consent banner injected on every generated page (same look/key as the homepage).
var CONSENT_HTML = '<p class="consent-text"><span class="consent-emoji" aria-hidden="true">🍪</span> We use cookies and local storage to remember your preferences and keep Market Hub working. Nothing is shared or sold. <a href="/privacy.html">Privacy policy</a>.</p><div class="consent-actions"><button class="btn" type="button" data-c="declined">Decline</button><button class="btn primary" type="button" data-c="accepted">Accept</button></div>';

// Consistent top bar for every generated sub-page. active: 'tools' | 'learn'.
function siteHead(active, prefix) {
  function link(key, href, label) {
    return '<a class="site-link' + (active === key ? ' active' : '') + '" href="' + href + '">' + label + '</a>';
  }
  return '  <header class="topbar site-head"><div class="bar">\n' +
    '    <a class="brand" href="' + prefix + 'index.html">\n' +
    '      <span class="brand-mark">' + BRAND_MARK + '</span>\n' +
    '      <span class="brand-text"><strong>Market Hub</strong><small>Essential tools for crypto &amp; stocks</small></span>\n' +
    '    </a>\n' +
    '    <nav class="site-nav">' + link('tools', prefix + 'index.html', 'Tools') + link('learn', prefix + 'learn/index.html', 'Learn') + '</nav>\n' +
    '    <div class="actions"><button id="themeBtn" class="icon-btn" type="button" aria-label="Toggle theme"></button></div>\n' +
    '  </div></header>\n';
}

// End-of-body script: wires the theme toggle on every sub-page, plus (on courses)
// the reading-progress bar and the scroll-spy that highlights the current lesson.
function footScript(course) {
  var s = '  <script>(function(){\n' +
    'var d=document.documentElement,K="marketHub.theme.v1",SUN=' + JSON.stringify(SUN_SVG) + ',MOON=' + JSON.stringify(MOON_SVG) + ';\n' +
    'function get(){return d.getAttribute("data-theme")||"dark";}\n' +
    'var b=document.getElementById("themeBtn");\n' +
    'function paint(){if(b){b.innerHTML=get()==="dark"?SUN:MOON;b.setAttribute("aria-label",get()==="dark"?"Switch to light mode":"Switch to dark mode");}}\n' +
    'paint();\n' +
    'if(b)b.addEventListener("click",function(){var n=get()==="dark"?"light":"dark";d.setAttribute("data-theme",n);try{localStorage.setItem(K,JSON.stringify(n));}catch(e){}paint();});\n' +
    // Course progress store + course-card fill (used on the Learn index and course pages).
    'var CK="marketHub.courses.v1",CHK=' + JSON.stringify(CHECK_ICON) + ';\n' +
    'function readC(){try{return JSON.parse(localStorage.getItem(CK))||{};}catch(e){return {};}}\n' +
    'function writeC(o){try{localStorage.setItem(CK,JSON.stringify(o));}catch(e){}}\n' +
    'function fillCards(){var p=readC();[].forEach.call(document.querySelectorAll(".course-card[data-course]"),function(c){var s=c.getAttribute("data-course"),t=+c.getAttribute("data-lessons")||0,n=Math.min(p[s]||0,t),pct=t?Math.round(n/t*100):0;var bar=c.querySelector(".cc-bar > i"),st=c.querySelector(".cc-status");if(bar)bar.style.width=pct+"%";c.classList.remove("is-done","is-progress");if(st){if(n<=0){st.textContent="Not started";}else if(n>=t){st.innerHTML=CHK+" Completed";c.classList.add("is-done");}else{st.textContent=n+" / "+t+" lessons";c.classList.add("is-progress");}}});}\n' +
    'fillCards();\n';
  // Cookie-consent banner (shown once; choice remembered in localStorage).
  s += 'var CC="marketHub.consent.v1";\n' +
    'try{if(localStorage.getItem(CC)==null){var cb=document.createElement("div");cb.className="consent";cb.setAttribute("role","dialog");cb.setAttribute("aria-label","Cookie notice");cb.innerHTML=' + JSON.stringify(CONSENT_HTML) + ';document.body.appendChild(cb);cb.addEventListener("click",function(e){var t=e.target.closest("[data-c]");if(!t)return;try{localStorage.setItem(CC,JSON.stringify(t.getAttribute("data-c")));}catch(er){}cb.parentNode.removeChild(cb);});}}catch(e){}\n';
  if (course) {
    s += 'var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;\n' +
      'function setHH(){var t=document.querySelector(".topbar");if(t)d.style.setProperty("--header-h",t.offsetHeight+"px");}setHH();window.addEventListener("resize",setHH);\n' +
      'var bar=document.querySelector(".reading-progress i");\n' +
      'function prog(){if(!bar)return;var max=d.scrollHeight-d.clientHeight;var p=max>0?(d.scrollTop||document.body.scrollTop)/max:0;bar.style.width=(Math.max(0,Math.min(1,p))*100).toFixed(2)+"%";}\n' +
      'var links=[].slice.call(document.querySelectorAll(".course-toc a[data-lesson]"));\n' +
      'var secs=links.map(function(a){return document.getElementById(a.getAttribute("href").slice(1));}).filter(Boolean);\n' +
      // Keep the active chip visible inside the horizontally-scrolling TOC bar (mobile).
      'function centerChip(a){var ol=a.closest("ol");if(!ol||ol.scrollWidth<=ol.clientWidth+2)return;var ar=a.getBoundingClientRect(),or=ol.getBoundingClientRect();ol.scrollBy({left:(ar.left-or.left)-(or.width-ar.width)/2,behavior:"smooth"});}\n' +
      'var lastSpy=null;\n' +
      'function spy(){var cur=null;for(var i=0;i<secs.length;i++){if(secs[i].getBoundingClientRect().top<=150)cur=secs[i];}links.forEach(function(a){a.classList.toggle("active",!!cur&&a.getAttribute("href")==="#"+cur.id);});var id=cur?cur.id:null;if(id!==lastSpy){lastSpy=id;if(id){var act=null;links.forEach(function(a){if(a.getAttribute("href")==="#"+id)act=a;});if(act)centerChip(act);}}}\n' +
      'var main=document.querySelector(".course-wrap[data-course]");\n' +
      'var slug=main?main.getAttribute("data-course"):null,total=main?(+main.getAttribute("data-lessons")||0):0;\n' +
      'var lessonEls=[].slice.call(document.querySelectorAll(".course-main .lesson[data-lesson]"));\n' +
      'function curDone(){var p=readC();return Math.min(p[slug]||0,total);}\n' +
      'function setDone(n){if(!slug)return;var p=readC(),c=p[slug]||0;if(n>c){p[slug]=Math.min(n,total);writeC(p);}}\n' +
      'function paintChecks(){var done=curDone();[].forEach.call(document.querySelectorAll(".course-toc a[data-lesson]"),function(a){a.classList.toggle("done",(+a.getAttribute("data-lesson"))<=done);});var mc=document.querySelector(".mark-complete"),st=document.querySelector(".ce-status"),full=total>0&&done>=total;if(mc){mc.classList.toggle("is-complete",full);var mt=mc.querySelector(".mc-text");if(mt)mt.textContent=full?"Completed":"Mark as complete";}if(st)st.textContent=full?"You\\u2019ve completed this course \\uD83C\\uDF89":(done>0?(done+" of "+total+" lessons done"):"");fillCards();}\n' +
      'var hdr=document.querySelector(".topbar");function hh(){return hdr?hdr.offsetHeight:64;}\n' +
      'function updateRead(){if(!slug)return;var thr=hh()+90,read=0;for(var i=0;i<lessonEls.length;i++){if(lessonEls[i].getBoundingClientRect().bottom<thr)read=i+1;}if((window.innerHeight+window.scrollY)>=(d.scrollHeight-80))read=total;if(read>curDone()){setDone(read);paintChecks();}}\n' +
      'var mcb=document.querySelector(".mark-complete");if(mcb)mcb.addEventListener("click",function(){setDone(total);paintChecks();});\n' +
      'var figs=[].slice.call(document.querySelectorAll(".course-fig"));\n' +
      'if(!reduce&&"IntersectionObserver" in window){figs.forEach(function(f){f.classList.add("reveal");});var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});},{threshold:0.12,rootMargin:"0px 0px -8% 0px"});figs.forEach(function(f){io.observe(f);});}\n' +
      'var tick=false;function onScroll(){prog();spy();if(!tick){tick=true;requestAnimationFrame(function(){updateRead();tick=false;});}}\n' +
      'window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",prog);paintChecks();onScroll();\n';
  }
  s += '})();</script>\n';
  // Vercel Web Analytics (cookieless, privacy-friendly) — served at /_vercel/insights when enabled.
  s += '  <script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments);};</script>\n' +
    '  <script defer src="/_vercel/insights/script.js"></script>\n';
  return s;
}

// Callout (tip / warning) with an icon and a label.
var CALLOUT_ICON = {
  tip: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.6.55.9 1.13 1 2.5h6c.1-1.37.4-1.95 1-2.5A6 6 0 0 0 12 3z"/></svg>',
  warn: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
  key: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg>'
};
function callout(kind, label, inner) {
  return '<div class="callout callout-' + kind + '"><span class="callout-ico">' + CALLOUT_ICON[kind] + '</span>' +
    '<div class="callout-body"><span class="callout-label">' + label + '</span>' + inner + '</div></div>';
}

/* ----------------------------------------------------- tool page HTML */
function toolPage(t) {
  var sec = primarySection(t);
  var blurb = GROUP_BLURB[t.group] || 'market research';
  var toolUrl = SITE_URL + '/tools/' + t.slug + '.html';
  var rel = t.isAff ? 'sponsored nofollow noopener noreferrer' : 'noopener noreferrer';
  var secLabels = t.sections.map(function (s) { return SECTION_LABEL[s]; }).join(', ');
  // Overview: unique multi-paragraph content when provided, else a generated fallback.
  var overviewHtml = (t.overview && t.overview.length)
    ? t.overview.map(function (p) { return '    <p>' + fmt(p) + '</p>'; }).join('\n')
    : '    <p>' + esc(t.name + ' is a widely used tool for ' + blurb + ', popular among ' + SECTION_AUDIENCE[sec] +
        ' who follow ' + SECTION_PHRASE[sec] + '. ' + t.description +
        ' It sits in the ' + t.group + ' category of the Market Hub directory and can be accessed at ' + t.host + '.') + '</p>';
  var bestFor = t.bestFor || BEST_FOR[t.group] || ['Researching ' + SECTION_PHRASE[sec], 'Saving time with a trusted source', 'Staying on top of market moves'];
  var related = relatedTo(t);

  var ld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Market Hub', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: SECTION_LABEL[sec], item: SITE_URL + '/?filter=' + sec },
      { '@type': 'ListItem', position: 3, name: t.name, item: toolUrl }
    ] },
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: t.name,
      applicationCategory: 'FinanceApplication', operatingSystem: 'Web', url: t.url, description: t.description }
  ];
  if (t.faqs && t.faqs.length) {
    ld.push({ '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: t.faqs.map(function (f) {
        return { '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } };
      }) });
  }

  var favSrc = 'https://www.google.com/s2/favicons?sz=64&amp;domain=' + encodeURIComponent(t.host);

  return '<!DOCTYPE html>\n' +
'<html lang="en" data-theme="dark">\n' +
'<head>\n' +
'  <meta charset="UTF-8" />\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
'  <title>' + esc(t.name) + ' — ' + esc(cap(blurb)) + ' | Market Hub</title>\n' +
'  <meta name="description" content="' + esc(t.description) + '" />\n' +
'  <link rel="canonical" href="' + esc(toolUrl) + '" />\n' +
'  <meta name="robots" content="index, follow" />\n' +
'  <meta name="theme-color" content="#0b0c0f" />\n' +
'  <meta property="og:type" content="article" />\n' +
'  <meta property="og:site_name" content="Market Hub" />\n' +
'  <meta property="og:title" content="' + esc(t.name) + ' — Market Hub" />\n' +
'  <meta property="og:description" content="' + esc(t.description) + '" />\n' +
'  <meta property="og:url" content="' + esc(toolUrl) + '" />\n' +
'  <meta property="og:image" content="' + esc(OG_IMAGE) + '" />\n' +
'  <meta name="twitter:card" content="summary_large_image" />\n' +
'  <meta name="twitter:title" content="' + esc(t.name) + ' — Market Hub" />\n' +
'  <meta name="twitter:description" content="' + esc(t.description) + '" />\n' +
'  <meta name="twitter:image" content="' + esc(OG_IMAGE) + '" />\n' +
'  <link rel="icon" href="' + FAVICON + '" />\n' +
'  <link rel="stylesheet" href="../styles.css" />\n' +
'  ' + THEME_SCRIPT + '\n' +
'  <script type="application/ld+json">' + jsonld(ld) + '</script>\n' +
'</head>\n' +
'<body>\n' +
siteHead('tools', '../') + '\n' +
'  <main class="tool-wrap tool">\n' +
'    <nav class="crumbs"><a href="../index.html">Home</a> &rsaquo; <a href="../index.html?filter=' + sec + '">' + esc(SECTION_LABEL[sec]) + '</a> &rsaquo; ' + esc(t.name) + '</nav>\n' +
'    <div class="tool-head">\n' +
'      <img class="fav" src="' + favSrc + '" alt="" width="46" height="46" loading="lazy" onerror="this.style.display=\'none\'" />\n' +
'      <div>\n' +
'        <h1>' + esc(t.name) + '</h1>\n' +
'        <p class="tool-sub">' + esc(secLabels) + ' &middot; ' + esc(t.group) + '</p>\n' +
'      </div>\n' +
'    </div>\n' +
'    <p class="tool-lead">' + esc(t.description) + '</p>\n' +
'    <div class="tool-cta">\n' +
'      <a class="btn primary" href="' + esc(t.out) + '" target="_blank" rel="' + rel + '">Visit ' + esc(t.name) + ' &#8599;</a>\n' +
'      <span class="note">' + (t.isAff ? 'Partner link &mdash; we may earn a commission at no extra cost to you.' : 'Opens ' + esc(t.host) + ' in a new tab.') + '</span>\n' +
'    </div>\n\n' +
'    <h2>Overview</h2>\n' +
overviewHtml + '\n\n' +
'    <h2>Best for</h2>\n' +
'    <ul class="points">' + bestFor.map(function (b) { return '<li>' + fmt(b) + '</li>'; }).join('') + '</ul>\n\n' +
'    <h2>Key facts</h2>\n' +
'    <ul class="facts">\n' +
'      <li><b>Category:</b> ' + esc(secLabels) + '</li>\n' +
'      <li><b>Group:</b> ' + esc(t.group) + '</li>\n' +
'      <li><b>Website:</b> ' + esc(t.host) + '</li>\n' +
'      <li><b>Listed on:</b> Market Hub</li>\n' +
'    </ul>\n\n' +
  (t.faqs && t.faqs.length
    ? '    <h2>Frequently asked questions</h2>\n' +
      t.faqs.map(function (f) {
        return '    <details class="faq-item"><summary>' + esc(f.q) + '</summary><p>' + fmt(f.a) + '</p></details>';
      }).join('\n') + '\n\n'
    : '') +
  (related.length
    ? '    <h2>Related tools</h2>\n    <div class="related">' +
      related.map(function (r) { return '<a href="./' + r.slug + '.html">' + esc(r.name) + '</a>'; }).join('') +
      '</div>\n'
    : '') +
'  </main>\n\n' +
'  <footer class="legal">\n' +
'    <p class="disclosure">' + (t.isAff ? 'This page links to ' + esc(t.name) + ' via an affiliate link; we may earn a commission at no extra cost to you. ' : '') + 'Nothing here is financial advice &mdash; always do your own research.</p>\n' +
'    <p><a href="../index.html">&larr; Back to Market Hub</a> &middot; <a href="../privacy.html">Privacy</a></p>\n' +
'  </footer>\n' +
footScript(false) +
'</body>\n</html>\n';
}

/* ----------------------------------------------------------- courses */
function fmt(s) {
  s = esc(s);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  return s;
}

function inlineToolCta(slug, text) {
  var t = toolBySlug[slug];
  if (!t) { console.warn('  ! course references unknown tool slug: ' + slug); return ''; }
  var rel = t.isAff ? 'sponsored nofollow noopener noreferrer' : 'noopener noreferrer';
  var fav = 'https://www.google.com/s2/favicons?sz=64&amp;domain=' + encodeURIComponent(t.host);
  return '<a class="course-tool' + (t.isAff ? ' is-affiliate' : '') + '" href="' + esc(t.out) + '" target="_blank" rel="' + rel + '">' +
    '<img class="fav" src="' + fav + '" alt="" width="40" height="40" loading="lazy" onerror="this.style.display=\'none\'" />' +
    '<span class="ct-body"><span class="ct-eyebrow">Recommended tool</span>' +
    '<span class="ct-name">' + esc(t.name) + (t.isAff ? ' <span class="tag-partner">Partner</span>' : '') + '</span>' +
    '<span class="ct-desc">' + esc(text || t.description) + '</span></span>' +
    '<span class="ct-go">' + (t.isAff ? 'Visit' : 'Open') + ' <span class="ct-arr">&#8599;</span></span></a>';
}

function renderBlocks(blocks) {
  return (blocks || []).map(function (b) {
    if (b.p) return '<p>' + fmt(b.p) + '</p>';
    if (b.h) return '<h3 class="lesson-h">' + fmt(b.h) + '</h3>';
    if (b.ul) return '<ul class="points">' + b.ul.map(function (i) { return '<li>' + fmt(i) + '</li>'; }).join('') + '</ul>';
    if (b.ol) return '<ol class="points">' + b.ol.map(function (i) { return '<li>' + fmt(i) + '</li>'; }).join('') + '</ol>';
    if (b.note) return callout('tip', 'Tip', '<p>' + fmt(b.note) + '</p>');
    if (b.warn) return callout('warn', 'Heads up', '<p>' + fmt(b.warn) + '</p>');
    if (b.key) return callout('key', 'Key point', '<p>' + fmt(b.key) + '</p>');
    if (b.tool) return inlineToolCta(b.tool, b.text);
    if (b.fig) {
      var fp = 'assets/figures/' + b.fig + '.svg';
      if (!fs.existsSync(path.join(ROOT, fp))) console.warn('  ! missing figure: ' + fp);
      return '<figure class="course-fig"><img src="../' + fp + '" alt="' + esc(b.caption || b.fig) + '" loading="lazy" />' +
        (b.caption ? '<figcaption>' + esc(b.caption) + '</figcaption>' : '') + '</figure>';
    }
    return '';
  }).join('\n');
}

function levelClass(level) {
  var l = String(level || '').toLowerCase();
  if (l.indexOf('inter') >= 0) return 'lvl-intermediate';
  if (l.indexOf('adv') >= 0) return 'lvl-advanced';
  return 'lvl-beginner';
}

function courseCard(c, hrefPrefix) {
  var sec = COURSE_SEC_LABEL[c.section] ? c.section : 'general';
  return '<a class="course-card cc-' + sec + '" href="' + hrefPrefix + c.slug + '.html" data-course="' + c.slug + '" data-lessons="' + c.lessons.length + '">' +
    '<span class="cc-head"><span class="cc-tag">' + (COURSE_SEC_LABEL[c.section] || 'Markets') + '</span>' +
    '<span class="cc-level ' + levelClass(c.level) + '">' + esc(c.level) + '</span></span>' +
    '<span class="cc-title">' + esc(c.title) + '</span>' +
    '<span class="cc-desc">' + esc(c.summary) + '</span>' +
    '<span class="cc-foot"><span class="cc-meta">' +
    '<span class="cc-m">' + CLOCK_ICON + c.minutes + ' min</span>' +
    '<span class="cc-m">' + LAYERS_ICON + c.lessons.length + ' lessons</span></span>' +
    '<span class="cc-go">Start <span class="cc-arr">&rarr;</span></span></span>' +
    '<span class="cc-track"><span class="cc-bar"><i></i></span><span class="cc-status">Not started</span></span>' +
    '</a>';
}

function nextCourseCard(course) {
  if (!course) {
    return '<a class="next-course nc-done" href="./index.html">' +
      '<span class="nc-label">Series complete</span>' +
      '<span class="nc-title">Browse all free courses</span>' +
      '<span class="nc-go">View the library <span class="cc-arr">&rarr;</span></span></a>';
  }
  var sec = COURSE_SEC_LABEL[course.section] ? course.section : 'general';
  return '<a class="next-course cc-' + sec + '" href="./' + course.slug + '.html">' +
    '<span class="nc-label">Next course</span>' +
    '<span class="nc-title">' + esc(course.title) + '</span>' +
    '<span class="nc-meta">' + esc(course.level) + ' &middot; ' + course.minutes + ' min &middot; ' + course.lessons.length + ' lessons</span>' +
    '<span class="nc-go">Start course <span class="cc-arr">&rarr;</span></span></a>';
}

function coursePage(c, idx) {
  var canonical = SITE_URL + '/learn/' + c.slug + '.html';
  var secKey = COURSE_SEC_LABEL[c.section] ? c.section : 'general';
  var secLabel = COURSE_SEC_LABEL[c.section] || 'Markets';
  var n = c.lessons.length;
  var toc = c.lessons.map(function (l, i) {
    return '<li><a href="#lesson-' + (i + 1) + '" data-lesson="' + (i + 1) + '">' +
      '<span class="toc-i">' + (i + 1) + '</span>' +
      '<span class="toc-text">' + esc(l.title) + '</span>' +
      '<span class="toc-check">' + CHECK_ICON + '</span></a></li>';
  }).join('');
  var lessons = c.lessons.map(function (l, i) {
    var num = i + 1;
    var prevL = num > 1
      ? '<a class="ln-prev" href="#lesson-' + (num - 1) + '"><span class="ln-dir">&larr; Previous</span><span class="ln-name">' + esc(c.lessons[i - 1].title) + '</span></a>'
      : '<span class="ln-spacer"></span>';
    var nextL = num < n
      ? '<a class="ln-next" href="#lesson-' + (num + 1) + '"><span class="ln-dir">Next lesson &rarr;</span><span class="ln-name">' + esc(c.lessons[i + 1].title) + '</span></a>'
      : '<a class="ln-next ln-finish" href="#course-end"><span class="ln-dir">Finish &rarr;</span><span class="ln-name">Wrap up &amp; mark complete</span></a>';
    return '        <section class="lesson" data-lesson="' + num + '">\n' +
      '          <header class="lesson-head"><span class="lesson-eyebrow">Lesson ' + num + ' of ' + n + '</span>' +
      '<h2 id="lesson-' + num + '" class="lesson-title">' + esc(l.title) + '</h2></header>\n' +
      renderBlocks(l.blocks) + '\n' +
      '          <nav class="lesson-nav" aria-label="Lesson navigation">' + prevL + nextL + '</nav>\n' +
      '        </section>';
  }).join('\n');
  var toolsUsed = c.tools.map(function (s) { var t = toolBySlug[s]; return t ? '<a href="../tools/' + t.slug + '.html">' + esc(t.name) + '</a>' : ''; }).join('');
  var related = COURSES.filter(function (x) { return x.slug !== c.slug; }).map(function (x) { return courseCard(x, './'); }).join('');

  var next = COURSES[idx + 1];
  var courseEnd = '<section class="course-end" id="course-end">\n' +
    '          <div class="ce-bar">\n' +
    '            <button class="btn primary mark-complete" type="button"><span class="mc-ico">' + CHECK_ICON + '</span><span class="mc-text">Mark as complete</span></button>\n' +
    '            <span class="ce-status" aria-live="polite"></span>\n' +
    '          </div>\n' +
    '          ' + nextCourseCard(next) + '\n' +
    '        </section>';

  var ld = [
    { '@context': 'https://schema.org', '@type': 'Course', name: c.title, description: c.summary, inLanguage: 'en',
      provider: { '@type': 'Organization', name: 'Market Hub', sameAs: SITE_URL + '/' } },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Market Hub', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Learn', item: SITE_URL + '/learn/' },
      { '@type': 'ListItem', position: 3, name: c.title, item: canonical }
    ] }
  ];

  return '<!DOCTYPE html>\n<html lang="en" data-theme="dark">\n<head>\n' +
    '  <meta charset="UTF-8" />\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
    '  <title>' + esc(c.title) + ' | Market Hub</title>\n' +
    '  <meta name="description" content="' + esc(c.summary) + '" />\n' +
    '  <link rel="canonical" href="' + esc(canonical) + '" />\n' +
    '  <meta name="robots" content="index, follow" />\n' +
    '  <meta name="theme-color" content="#0b0c0f" />\n' +
    '  <meta property="og:type" content="article" />\n' +
    '  <meta property="og:site_name" content="Market Hub" />\n' +
    '  <meta property="og:title" content="' + esc(c.title) + '" />\n' +
    '  <meta property="og:description" content="' + esc(c.summary) + '" />\n' +
    '  <meta property="og:url" content="' + esc(canonical) + '" />\n' +
    '  <meta property="og:image" content="' + esc(OG_IMAGE) + '" />\n' +
    '  <meta name="twitter:card" content="summary_large_image" />\n' +
    '  <meta name="twitter:title" content="' + esc(c.title) + '" />\n' +
    '  <meta name="twitter:description" content="' + esc(c.summary) + '" />\n' +
    '  <meta name="twitter:image" content="' + esc(OG_IMAGE) + '" />\n' +
    '  <link rel="icon" href="' + FAVICON + '" />\n' +
    '  <link rel="stylesheet" href="../styles.css" />\n' +
    '  ' + THEME_SCRIPT + '\n' +
    '  <script type="application/ld+json">' + jsonld(ld) + '</script>\n' +
    '</head>\n<body>\n' +
    '  <div class="reading-progress"><i></i></div>\n' +
    siteHead('learn', '../') + '\n' +
    '  <main class="course-wrap course" data-course="' + c.slug + '" data-lessons="' + n + '">\n' +
    '    <nav class="crumbs"><a href="../index.html">Home</a> &rsaquo; <a href="./index.html">Learn</a> &rsaquo; ' + esc(c.title) + '</nav>\n' +
    '    <header class="course-hero">\n' +
    '      <div class="course-badges"><span class="badge badge-' + secKey + '">' + esc(secLabel) + '</span>' +
    '<span class="meta-pill">' + esc(c.level) + '</span>' +
    '<span class="meta-pill">' + c.minutes + ' min read</span>' +
    '<span class="meta-pill">' + c.lessons.length + ' lessons</span></div>\n' +
    '      <h1>' + esc(c.title) + '</h1>\n' +
    '      <p class="course-lead">' + esc(c.summary) + '</p>\n' +
    '    </header>\n' +
    '    <div class="course-layout">\n' +
    '      <aside class="course-side">\n' +
    '        <nav class="course-toc" aria-label="Course contents"><span class="toc-label">Contents</span><ol>' + toc + '</ol></nav>\n' +
    '      </aside>\n' +
    '      <div class="course-main">\n' +
    lessons + '\n' +
    '        ' + courseEnd + '\n' +
    '        <div class="tools-used"><h2>Tools used in this course</h2><div class="related">' + toolsUsed + '</div></div>\n' +
    '        <div class="course-next"><h2>More free courses</h2><div class="learn-grid">' + related + '</div></div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </main>\n\n' +
    '  <section class="course-cta">\n' +
    '    <div class="cta-copy"><h2>Found this useful?</h2><p>Get new tools and guides about once a week. No spam.</p></div>\n' +
    '    <a class="btn primary" href="../index.html#newsletter">Get weekly updates</a>\n' +
    '  </section>\n' +
    '  <footer class="legal">\n' +
    '    <p class="disclosure">This course may link to tools via affiliate links marked &ldquo;Partner&rdquo;; we may earn a commission at no extra cost to you. Educational content only &mdash; nothing here is financial advice.</p>\n' +
    '    <p><a href="./index.html">&larr; All courses</a> &middot; <a href="../index.html">Market Hub tools</a> &middot; <a href="../privacy.html">Privacy</a></p>\n' +
    '  </footer>\n' +
    footScript(true) +
    '</body>\n</html>\n';
}

function learnIndex() {
  var canonical = SITE_URL + '/learn/';
  var cards = COURSES.map(function (c) { return courseCard(c, './'); }).join('');
  var totalMin = COURSES.reduce(function (s, c) { return s + (c.minutes || 0); }, 0);
  var totalLessons = COURSES.reduce(function (s, c) { return s + c.lessons.length; }, 0);
  var ld = [{ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Free market courses', numberOfItems: COURSES.length,
    itemListElement: COURSES.map(function (c, i) { return { '@type': 'ListItem', position: i + 1, url: SITE_URL + '/learn/' + c.slug + '.html', name: c.title }; }) }];
  return '<!DOCTYPE html>\n<html lang="en" data-theme="dark">\n<head>\n' +
    '  <meta charset="UTF-8" />\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
    '  <title>Free Courses &mdash; Learn Crypto &amp; Stock Markets | Market Hub</title>\n' +
    '  <meta name="description" content="Free, practical short courses on crypto and stock-market investing: buying your first crypto, reading charts, on-chain analysis, and stock investing foundations." />\n' +
    '  <link rel="canonical" href="' + esc(canonical) + '" />\n' +
    '  <meta name="robots" content="index, follow" />\n' +
    '  <meta name="theme-color" content="#0b0c0f" />\n' +
    '  <meta property="og:type" content="website" />\n' +
    '  <meta property="og:site_name" content="Market Hub" />\n' +
    '  <meta property="og:title" content="Free Courses &mdash; Learn Crypto &amp; Stock Markets" />\n' +
    '  <meta property="og:description" content="Free, practical short courses on crypto and stock-market investing." />\n' +
    '  <meta property="og:url" content="' + esc(canonical) + '" />\n' +
    '  <meta property="og:image" content="' + esc(OG_IMAGE) + '" />\n' +
    '  <meta name="twitter:card" content="summary_large_image" />\n' +
    '  <link rel="icon" href="' + FAVICON + '" />\n' +
    '  <link rel="stylesheet" href="../styles.css" />\n' +
    '  ' + THEME_SCRIPT + '\n' +
    '  <script type="application/ld+json">' + jsonld(ld) + '</script>\n' +
    '</head>\n<body>\n' +
    siteHead('learn', '../') + '\n' +
    '  <main class="learn-wrap">\n' +
    '    <nav class="crumbs"><a href="../index.html">Home</a> &rsaquo; Learn</nav>\n' +
    '    <header class="learn-hero">\n' +
    '      <span class="learn-kicker">Free courses</span>\n' +
    '      <h1>Learn the skills behind the tools</h1>\n' +
    '      <p class="learn-intro">Short, practical guides with no jargon and no paywall &mdash; from buying your first crypto to reading charts, on-chain analysis, and stock investing. Each pairs the concepts with the exact tools you&rsquo;ll use.</p>\n' +
    '      <div class="learn-stats">' +
    '<span class="lstat"><b>' + COURSES.length + '</b> courses</span>' +
    '<span class="lstat"><b>' + totalLessons + '</b> lessons</span>' +
    '<span class="lstat"><b>~' + totalMin + '</b> min total</span>' +
    '<span class="lstat"><b>Free</b> forever</span></div>\n' +
    '    </header>\n' +
    '    <div class="learn-grid">' + cards + '</div>\n' +
    '  </main>\n' +
    '  <footer class="legal">\n' +
    '    <p class="disclosure">Educational content only &mdash; nothing here is financial advice. Some tool links are affiliate links marked &ldquo;Partner&rdquo;.</p>\n' +
    '    <p><a href="../index.html">&larr; Back to Market Hub</a> &middot; <a href="../privacy.html">Privacy</a></p>\n' +
    '  </footer>\n' +
    footScript(false) +
    '</body>\n</html>\n';
}

function coursesTeaser() {
  var cards = COURSES.map(function (c) { return '      ' + courseCard(c, 'learn/'); }).join('\n');
  return '    <div class="lt-head"><h2>Free courses</h2><a class="lt-all" href="learn/index.html">View all &rarr;</a></div>\n' +
    '    <p class="lt-sub">Learn the skills behind the tools &mdash; buying crypto, reading charts, on-chain analysis, and stock investing.</p>\n' +
    '    <div class="learn-grid">\n' + cards + '\n    </div>';
}

/* ----------------------------------------------------------- privacy */
function privacyPage() {
  var canonical = SITE_URL + '/privacy.html';
  var updated = new Date().toISOString().slice(0, 10);
  var ld = { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Privacy Policy', url: canonical,
    description: 'How Market Hub handles your data and privacy.' };
  var body =
    '  <main class="tool-wrap course">\n' +
    '    <nav class="crumbs"><a href="index.html">Home</a> &rsaquo; Privacy</nav>\n' +
    '    <h1>Privacy Policy</h1>\n' +
    '    <p class="tool-sub">Last updated: ' + updated + '</p>\n' +
    '    <p>Market Hub is a static, privacy-first directory of crypto and stock-market tools. It runs in your browser, needs no account, and collects as little as possible. This page explains what is &mdash; and is not &mdash; collected.</p>\n' +
    '    <h2>The short version</h2>\n' +
    '    <ul class="points">' +
      '<li>No account, no login, and no advertising or cross-site tracking cookies.</li>' +
      '<li>Your settings (saved/hidden tools, theme, course progress, cookie choice) stay in <b>your browser</b> via local storage &mdash; we never see them.</li>' +
      '<li>We only receive your email address if you choose to subscribe to the newsletter.</li>' +
      '<li>Nothing is sold; nothing is shared except as needed to serve the site.</li>' +
    '</ul>\n' +
    '    <h2>Information we collect</h2>\n' +
    '    <p><b>Stored only in your browser:</b> your custom links, hidden tools, starred &ldquo;My Links&rdquo;, light/dark theme, view mode, course progress, and your cookie-consent choice. This data lives on your device, is not transmitted to us, and you can clear it any time from your browser settings.</p>\n' +
    '    <p><b>Newsletter (optional):</b> if you submit the signup form, the email address you provide is sent to our email provider so we can send you updates. You can unsubscribe at any time.</p>\n' +
    '    <p><b>Server logs:</b> our host may automatically log standard request data (such as IP address and browser type) for security and reliability, as is typical for any website.</p>\n' +
    '    <h2>Cookies &amp; local storage</h2>\n' +
    '    <p>Market Hub does not use advertising or cross-site tracking cookies. We use your browser&rsquo;s <b>local storage</b> for the preferences above, and we store your cookie-consent choice so the notice appears only once. Declining the notice does not break the site.</p>\n' +
    '    <h2>Third-party services</h2>\n' +
    '    <ul class="points">' +
      '<li><b>Favicons:</b> tool icons load from Google&rsquo;s public favicon service, so your browser requests an icon for each listed domain.</li>' +
      '<li><b>Outbound &amp; affiliate links:</b> clicking a tool takes you to a third-party site governed by its own privacy policy. Some links are affiliate links (marked &ldquo;Partner&rdquo;); the destination may set its own cookies to attribute a referral.</li>' +
      '<li><b>Hosting:</b> the site is served by our hosting provider, which processes requests to deliver the pages.</li>' +
    '</ul>\n' +
    '    <h2>Analytics</h2>\n' +
    '    <p>We use <b>Vercel Web Analytics</b>, a privacy-friendly, <b>cookieless</b> service that measures aggregate page views and traffic sources. It does not use cookies, does not track you across other websites, and does not collect personally identifying information.</p>\n' +
    '    <h2>Your choices</h2>\n' +
    '    <ul class="points">' +
      '<li>Clear your stored preferences any time via your browser&rsquo;s site-data settings.</li>' +
      '<li>Decline the cookie notice, or use private / incognito browsing.</li>' +
      '<li>Unsubscribe from the newsletter using the link in any email.</li>' +
    '</ul>\n' +
    '    <h2>Data retention &amp; security</h2>\n' +
    '    <p>Browser-stored preferences remain until you clear them. Newsletter emails are kept until you unsubscribe. We take reasonable measures to protect any data we hold, though no method of transmission or storage is ever completely secure.</p>\n' +
    '    <h2>Children</h2>\n' +
    '    <p>Market Hub is not directed to children under 13 (or the equivalent age in your country) and we do not knowingly collect their data.</p>\n' +
    '    <h2>Changes to this policy</h2>\n' +
    '    <p>We may update this policy from time to time. Material changes will be reflected by the &ldquo;Last updated&rdquo; date above.</p>\n' +
    '    <h2>Contact</h2>\n' +
    '    <p>Questions about privacy? Email <a href="mailto:' + esc(CONTACT_EMAIL) + '">' + esc(CONTACT_EMAIL) + '</a>.</p>\n' +
    '    <p class="disclosure" style="margin-top:24px">This policy is provided for general information and is not legal advice.</p>\n' +
    '  </main>\n';
  return '<!DOCTYPE html>\n<html lang="en" data-theme="dark">\n<head>\n' +
    '  <meta charset="UTF-8" />\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
    '  <title>Privacy Policy | Market Hub</title>\n' +
    '  <meta name="description" content="How Market Hub handles your data: no tracking cookies, browser-only preferences, and an optional newsletter." />\n' +
    '  <link rel="canonical" href="' + esc(canonical) + '" />\n' +
    '  <meta name="robots" content="index, follow" />\n' +
    '  <meta name="theme-color" content="#0b0c0f" />\n' +
    '  <meta property="og:type" content="website" />\n' +
    '  <meta property="og:site_name" content="Market Hub" />\n' +
    '  <meta property="og:title" content="Privacy Policy &mdash; Market Hub" />\n' +
    '  <meta property="og:description" content="How Market Hub handles your data and privacy." />\n' +
    '  <meta property="og:url" content="' + esc(canonical) + '" />\n' +
    '  <meta property="og:image" content="' + esc(OG_IMAGE) + '" />\n' +
    '  <link rel="icon" href="' + FAVICON + '" />\n' +
    '  <link rel="stylesheet" href="styles.css" />\n' +
    '  ' + THEME_SCRIPT + '\n' +
    '  <script type="application/ld+json">' + jsonld(ld) + '</script>\n' +
    '</head>\n<body>\n' +
    siteHead('', '') + '\n' +
    body +
    '  <footer class="legal">\n' +
    '    <p><a href="index.html">&larr; Back to Market Hub</a></p>\n' +
    '  </footer>\n' +
    footScript(false) +
    '</body>\n</html>\n';
}

/* --------------------------------------------------------------- 404 */
function notFoundPage() {
  // Served by Vercel for any unknown path, so EVERY asset/link must be root-absolute.
  return '<!DOCTYPE html>\n<html lang="en" data-theme="dark">\n<head>\n' +
    '  <meta charset="UTF-8" />\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
    '  <title>Page not found (404) | Market Hub</title>\n' +
    '  <meta name="description" content="The page you were looking for could not be found." />\n' +
    '  <meta name="robots" content="noindex, follow" />\n' +
    '  <meta name="theme-color" content="#0b0c0f" />\n' +
    '  <link rel="icon" href="' + FAVICON + '" />\n' +
    '  <link rel="stylesheet" href="/styles.css" />\n' +
    '  ' + THEME_SCRIPT + '\n' +
    '</head>\n<body>\n' +
    siteHead('', '/') + '\n' +
    '  <main class="notfound">\n' +
    '    <span class="nf-code">404</span>\n' +
    '    <h1>This page wandered off</h1>\n' +
    '    <p>The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Try a search, or jump back in.</p>\n' +
    '    <form class="nf-search" action="/index.html" method="get" role="search">\n' +
    '      <input type="search" name="q" placeholder="Search tools&hellip;" aria-label="Search tools" autocomplete="off" />\n' +
    '      <button class="btn primary" type="submit">Search</button>\n' +
    '    </form>\n' +
    '    <div class="nf-actions">\n' +
    '      <a class="btn primary" href="/index.html">Browse all tools</a>\n' +
    '      <a class="btn" href="/learn/index.html">Free courses</a>\n' +
    '    </div>\n' +
    '  </main>\n' +
    '  <footer class="legal">\n' +
    '    <p><a href="/index.html">&larr; Back to Market Hub</a> &middot; <a href="/privacy.html">Privacy</a></p>\n' +
    '  </footer>\n' +
    footScript(false) +
    '</body>\n</html>\n';
}

/* --------------------------------------------------------------- FAQ */
var FAQS = [
  { q: 'Is Market Hub free to use?',
    a: 'Yes. Market Hub is a completely free, curated directory of the best crypto and stock-market research tools. You can browse, search, filter, and bookmark tools without signing up.' },
  { q: 'What kind of tools does Market Hub list?',
    a: 'It covers ' + tools.length + '+ hand-picked tools across charting and technical analysis, market data, on-chain analytics, screeners, fundamentals, options and derivatives, news, and economic data — for both crypto and the stock market.' },
  { q: 'Do I need an account or any downloads?',
    a: 'No. Market Hub runs entirely in your browser with no account and nothing to install. Your custom links, hidden tools, and light/dark theme are saved locally on your device.' },
  { q: 'How are the tools selected?',
    a: 'Each tool is chosen for a specific job and described in plain language, so you can quickly find the right one for charting, research, on-chain analysis, screening, or staying on top of the news.' },
  { q: 'Does Market Hub offer free courses?',
    a: 'Yes. The Learn section has free, practical courses on buying your first crypto, reading charts, on-chain analysis, and stock-investing foundations — each paired with the exact tools you will use.' },
  { q: 'Is anything here financial advice?',
    a: 'No. Market Hub is an educational directory of third-party tools. Nothing on the site is financial advice — always do your own research before investing.' }
];
function faqBlock() {
  var items = FAQS.map(function (f) {
    return '    <details class="faq-item"><summary>' + esc(f.q) + '</summary><p>' + esc(f.a) + '</p></details>';
  }).join('\n');
  var ld = { '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.map(function (f) {
      return { '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } };
    }) };
  return '    <h2>Frequently asked questions</h2>\n' + items +
    '\n    <script type="application/ld+json">' + jsonld(ld) + '</script>';
}

/* ------------------------------------------------------- index blocks */
function seoBlock() {
  var web = { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: SITE_URL + '/',
    potentialAction: { '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: SITE_URL + '/?q={search_term_string}' },
      'query-input': 'required name=search_term_string' } };
  var itemList = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Crypto & stock market tools',
    numberOfItems: tools.length, itemListElement: tools.map(function (t, i) {
      return { '@type': 'ListItem', position: i + 1, url: SITE_URL + '/tools/' + t.slug + '.html', name: t.name };
    }) };
  return [
    '  <link rel="canonical" href="' + esc(SITE_URL) + '/" />',
    '  <meta name="robots" content="index, follow" />',
    '  <meta property="og:type" content="website" />',
    '  <meta property="og:site_name" content="Market Hub" />',
    '  <meta property="og:title" content="' + esc(INDEX_TITLE) + '" />',
    '  <meta property="og:description" content="' + esc(INDEX_DESC) + '" />',
    '  <meta property="og:url" content="' + esc(SITE_URL) + '/" />',
    '  <meta property="og:image" content="' + esc(OG_IMAGE) + '" />',
    '  <meta name="twitter:card" content="summary_large_image" />',
    '  <meta name="twitter:title" content="' + esc(INDEX_TITLE) + '" />',
    '  <meta name="twitter:description" content="' + esc(INDEX_DESC) + '" />',
    '  <meta name="twitter:image" content="' + esc(OG_IMAGE) + '" />',
    '  <script type="application/ld+json">' + jsonld([web, itemList]) + '</script>'
  ].join('\n');
}

function directoryBlock() {
  var out = ['    <h2>Full directory</h2>',
    '    <p>All ' + tools.length + ' tools, organized by market. Each opens a page with a description and related tools.</p>'];
  SECTION_ORDER.forEach(function (sec) {
    var items = tools.filter(function (t) { return t.sections.indexOf(sec) >= 0; })
      .sort(function (a, b) { return groupRank(a.group) - groupRank(b.group) || a.name.localeCompare(b.name); });
    if (!items.length) return;
    out.push('    <div class="dir-section">');
    out.push('      <h3>' + esc(SECTION_LABEL[sec]) + '</h3>');
    out.push('      <div class="dir-links">');
    items.forEach(function (t) {
      out.push('        <a href="tools/' + t.slug + '.html" title="' + esc(t.description) + '">' + esc(t.name) + '</a>');
    });
    out.push('      </div>');
    out.push('    </div>');
  });
  return out.join('\n');
}

function replaceBlock(html, name, inner) {
  var re = new RegExp('(<!-- ' + name + ':START -->)[\\s\\S]*?(<!-- ' + name + ':END -->)');
  if (!re.test(html)) { console.warn('  ! markers ' + name + ' not found in index.html'); return html; }
  return html.replace(re, '$1\n' + inner + '\n  $2');
}

/* --------------------------------------------------------------- write */
var toolsDir = path.join(ROOT, 'tools');
if (!fs.existsSync(toolsDir)) fs.mkdirSync(toolsDir, { recursive: true });

tools.forEach(function (t) { fs.writeFileSync(path.join(toolsDir, t.slug + '.html'), toolPage(t)); });

var learnDir = path.join(ROOT, 'learn');
if (!fs.existsSync(learnDir)) fs.mkdirSync(learnDir, { recursive: true });
fs.writeFileSync(path.join(learnDir, 'index.html'), learnIndex());
fs.writeFileSync(path.join(ROOT, 'privacy.html'), privacyPage());
fs.writeFileSync(path.join(ROOT, '404.html'), notFoundPage());
COURSES.forEach(function (c, i) { fs.writeFileSync(path.join(learnDir, c.slug + '.html'), coursePage(c, i)); });

var urls = [
  '  <url><loc>' + SITE_URL + '/</loc><priority>1.0</priority></url>',
  '  <url><loc>' + SITE_URL + '/learn/</loc><priority>0.8</priority></url>',
  '  <url><loc>' + SITE_URL + '/privacy.html</loc><priority>0.3</priority></url>'
];
COURSES.forEach(function (c) { urls.push('  <url><loc>' + SITE_URL + '/learn/' + c.slug + '.html</loc><priority>0.8</priority></url>'); });
tools.forEach(function (t) { urls.push('  <url><loc>' + SITE_URL + '/tools/' + t.slug + '.html</loc><priority>0.7</priority></url>'); });
var sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.w3.org/2000/sitemaps/0.9">\n' + urls.join('\n') + '\n</urlset>\n';
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);

fs.writeFileSync(path.join(ROOT, 'robots.txt'),
  'User-agent: *\nAllow: /\n\nSitemap: ' + SITE_URL + '/sitemap.xml\n');

var indexPath = path.join(ROOT, 'index.html');
var html = fs.readFileSync(indexPath, 'utf8');
html = replaceBlock(html, 'SEO', seoBlock());
html = replaceBlock(html, 'TOOLS', directoryBlock());
html = replaceBlock(html, 'COURSES', coursesTeaser());
html = replaceBlock(html, 'FAQ', faqBlock());
fs.writeFileSync(indexPath, html);

var pending = tools.filter(function (t) { return t.isAff; }).length;
console.log('Market Hub build complete:');
console.log('  • ' + tools.length + ' tool pages  -> tools/');
console.log('  • ' + COURSES.length + ' course pages  -> learn/');
console.log('  • sitemap.xml, robots.txt');
console.log('  • index.html SEO + directory blocks injected');
console.log('  • ' + pending + ' active affiliate link(s)');
console.log('  • SITE_URL = ' + SITE_URL + (SITE_URL.indexOf('example.com') >= 0 ? '   <-- set SITE_URL=https://yourdomain.com and re-run before deploying' : ''));
