/* ============================================================ Market Hub
 * Vanilla JS. No build step, no dependencies. State persists in localStorage.
 * ------------------------------------------------------------------------- */
(function () {
  'use strict';

  var STORE = {
    custom:  'marketHub.custom.v1',
    hidden:  'marketHub.hidden.v1',
    theme:   'marketHub.theme.v1',
    starred: 'marketHub.starred.v1',
    view:    'marketHub.view.v1'
  };

  // Newsletter endpoint. Two supported options:
  //   1. No backend — paste a provider URL (Formspree, Buttondown, Beehiiv, ConvertKit,
  //      Netlify Forms). The form is POSTed as multipart, which these accept as-is.
  //        var NEWSLETTER_ENDPOINT = 'https://formspree.io/f/XXXXXXX';
  //   2. Own your list — use the bundled Supabase function (see api/subscribe.js):
  //        var NEWSLETTER_ENDPOINT = '/api/subscribe';
  // Leave '' for demo mode — the form validates and thanks the user but stores nothing.
  var NEWSLETTER_ENDPOINT = '';

  var SECTION_ORDER = ['stocks', 'crypto', 'macro'];
  var SECTION_LABEL = { stocks: 'Stocks', crypto: 'Crypto', macro: 'Macro & Economy' };

  // Preferred order of sub-headings within a section; anything else falls to the end.
  var GROUP_ORDER = [
    // stocks
    'Charting & Technical Analysis', 'Market Data & Quotes', 'Screeners',
    'Fundamentals & Research', 'Filings & Ownership', 'Options & Derivatives',
    'Earnings & Calendars', 'News & Analysis',
    // crypto
    'Market Data & Aggregators', 'Derivatives & Futures', 'On-Chain Analytics',
    'DeFi & TVL', 'Block Explorers', 'DEX & Discovery', 'Exchanges',
    'Portfolio & Wallets', 'NFT', 'News & Research',
    // macro
    'Economic Data', 'Cross-Asset & Calendars',
    // custom
    'My Links'
  ];

  var ARROW_SVG = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M5 11L11 5M11 5H6.2M11 5v4.8" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var X_SVG = '<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>';
  var STAR_LINE = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3.6l2.6 5.2 5.8.85-4.2 4.05 1 5.75L12 17.8l-5.2 2.7 1-5.75-4.2-4.05 5.8-.85z"/></svg>';
  var STAR_FILL = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="currentColor" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"><path d="M12 3.6l2.6 5.2 5.8.85-4.2 4.05 1 5.75L12 17.8l-5.2 2.7 1-5.75-4.2-4.05 5.8-.85z"/></svg>';

  // Deliberate accent palette: each market category maps to one colour (see styles.css .acc-*).
  var GROUP_COLOR = {
    'Charting & Technical Analysis': 'blue', 'Market Data & Quotes': 'green', 'Screeners': 'purple',
    'Fundamentals & Research': 'teal', 'Filings & Ownership': 'amber', 'Options & Derivatives': 'pink',
    'Earnings & Calendars': 'orange', 'News & Analysis': 'indigo', 'Market Data & Aggregators': 'green',
    'Derivatives & Futures': 'pink', 'On-Chain Analytics': 'amber', 'DeFi & TVL': 'teal',
    'Block Explorers': 'blue', 'DEX & Discovery': 'purple', 'Exchanges': 'orange',
    'Portfolio & Wallets': 'teal', 'NFT': 'pink', 'News & Research': 'indigo',
    'Economic Data': 'green', 'Cross-Asset & Calendars': 'orange', 'My Links': 'green'
  };
  var SECTION_COLOR = { all: 'green', stocks: 'blue', crypto: 'amber', macro: 'purple', my: 'green' };
  function groupAccent(g) { return GROUP_COLOR[g] || 'green'; }
  function sectionAccent(s) { return SECTION_COLOR[s] || 'green'; }
  var SUN_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  /* -------------------------------------------------------------- storage */
  function load(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; }
    catch (e) { return fallback; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* ignore */ }
  }

  var customLinks = load(STORE.custom, []);
  var hiddenIds   = load(STORE.hidden, []);
  var starred     = load(STORE.starred, []);
  var state = { filter: 'all', query: '', view: 'grid' };

  /* ----------------------------------------------------------- utilities */
  function slugify(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function buildSeed() {
    var used = {};
    return (window.SEED_LINKS || []).map(function (it) {
      var id = 'seed-' + (slugify(it.name) || 'x');
      while (used[id]) { id += '-x'; }
      used[id] = true;
      var copy = {};
      for (var k in it) { copy[k] = it[k]; }
      copy.id = id;
      copy.isCustom = false;
      return copy;
    });
  }
  var seedLinks = buildSeed();

  function allLinks() { return seedLinks.concat(customLinks); }
  function notHidden(item) { return item.isCustom || hiddenIds.indexOf(item.id) === -1; }

  function hostname(url) {
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return ''; }
  }
  function faviconUrl(url) {
    var h = hostname(url);
    return h ? 'https://www.google.com/s2/favicons?sz=64&domain=' + encodeURIComponent(h) : '';
  }

  // Affiliate links: active only once the YOUR_ID placeholder is replaced.
  var PLACEHOLDER_RE = /YOUR_ID|YOUR_REF|__REF__/i;
  function isActiveAffiliate(item) { return !!item.affiliate && !PLACEHOLDER_RE.test(item.affiliate); }
  function linkHref(item) { return isActiveAffiliate(item) ? item.affiliate : item.url; }

  // Star a default tool to keep it in "My Links". (Custom links live there already.)
  function isStarred(item) { return !item.isCustom && starred.indexOf(item.id) >= 0; }
  function toggleStar(item) {
    var i = starred.indexOf(item.id);
    if (i >= 0) { starred.splice(i, 1); toast('Removed from My Links'); }
    else { starred.push(item.id); toast('Saved to My Links ★'); }
    save(STORE.starred, starred);
    render();
  }

  function matches(item, q) {
    if (!q) return true;
    var hay = (item.name + ' ' + (item.description || '') + ' ' + (item.group || '') + ' ' + hostname(item.url)).toLowerCase();
    return q.split(/\s+/).every(function (t) { return hay.indexOf(t) >= 0; });
  }

  function byGroupOrder(a, b) {
    var ia = GROUP_ORDER.indexOf(a); var ib = GROUP_ORDER.indexOf(b);
    if (ia < 0) ia = 999; if (ib < 0) ib = 999;
    if (ia !== ib) return ia - ib;
    return a < b ? -1 : (a > b ? 1 : 0);
  }

  /* ---------------------------------------------------------- DOM helpers */
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null) return;
        if (k === 'class') n.className = v;
        else if (k === 'text') n.textContent = v;
        else if (k === 'html') n.innerHTML = v;
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') n.addEventListener(k.slice(2), v);
        else n.setAttribute(k, v);
      });
    }
    (kids || []).forEach(function (c) {
      if (c == null) return;
      n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return n;
  }

  function monogram(name) {
    var d = el('div', { class: 'fav fav-mono' });
    var s = (name || '?').trim();
    d.textContent = (s.charAt(0) || '?').toUpperCase();
    var hue = 0;
    for (var i = 0; i < s.length; i++) { hue = (hue * 31 + s.charCodeAt(i)) % 360; }
    d.style.background = 'hsl(' + hue + ', 48%, 36%)';
    return d;
  }

  function faviconEl(item) {
    var url = faviconUrl(item.url);
    if (!url) return monogram(item.name);
    var img = el('img', { class: 'fav', src: url, alt: '', loading: 'lazy', width: '34', height: '34' });
    img.addEventListener('error', function () { img.replaceWith(monogram(item.name)); });
    return img;
  }

  function card(item) {
    var aff = isActiveAffiliate(item);
    var acc = item.isCustom ? 'green' : groupAccent(item.group);
    var a = el('a', {
      class: 'card acc-' + acc + (item.isCustom ? ' is-custom' : '') + (aff ? ' is-affiliate' : ''),
      href: linkHref(item), target: '_blank',
      rel: aff ? 'sponsored nofollow noopener noreferrer' : 'noopener noreferrer'
    });

    var top = el('div', { class: 'card-top' }, [
      el('span', { class: 'card-name', text: item.name }),
      item.isCustom ? el('span', { class: 'tag-custom', text: 'custom' }) : null,
      aff ? el('span', { class: 'tag-partner', text: 'Partner' }) : null
    ]);

    var body = el('div', { class: 'card-body' }, [
      top,
      el('p', { class: 'card-desc', text: item.description || hostname(item.url) }),
      el('span', { class: 'card-host', text: hostname(item.url) })
    ]);

    a.appendChild(faviconEl(item));
    a.appendChild(body);

    if (!item.isCustom) {
      var on = isStarred(item);
      a.appendChild(el('button', {
        class: 'card-star' + (on ? ' on' : ''), type: 'button',
        title: on ? 'Remove from My Links' : 'Save to My Links',
        'aria-label': (on ? 'Remove ' + item.name + ' from' : 'Save ' + item.name + ' to') + ' My Links',
        'aria-pressed': on ? 'true' : 'false',
        html: on ? STAR_FILL : STAR_LINE,
        onclick: function (ev) { ev.preventDefault(); ev.stopPropagation(); toggleStar(item); }
      }));
    }

    a.appendChild(el('button', {
      class: 'card-x', type: 'button',
      title: item.isCustom ? 'Remove this link' : 'Hide this link',
      'aria-label': item.isCustom ? 'Remove ' + item.name : 'Hide ' + item.name,
      html: X_SVG,
      onclick: function (ev) { ev.preventDefault(); ev.stopPropagation(); removeItem(item); }
    }));
    return a;
  }

  function removeItem(item) {
    if (item.isCustom) {
      if (!window.confirm('Remove “' + item.name + '” from your links?')) return;
      customLinks = customLinks.filter(function (x) { return x.id !== item.id; });
      save(STORE.custom, customLinks);
      toast('Link removed');
    } else {
      if (hiddenIds.indexOf(item.id) === -1) { hiddenIds.push(item.id); save(STORE.hidden, hiddenIds); }
      toast('Hidden — restore from the footer');
    }
    render();
  }

  function groupedBlock(titleText, items, showTitle, secId) {
    var wrap = el('section', { class: 'sec', id: secId });
    var secKey = String(secId || '').replace(/^sec-/, '');
    if (showTitle) {
      wrap.appendChild(el('div', { class: 'sec-head' }, [
        el('h2', { class: 'sec-title', text: titleText }),
        el('span', { class: 'sec-count acc-' + sectionAccent(secKey), text: String(items.length) })
      ]));
    }
    var groups = {};
    items.forEach(function (i) { var g = i.group || 'Other'; (groups[g] = groups[g] || []).push(i); });
    Object.keys(groups).sort(byGroupOrder).forEach(function (g) {
      wrap.appendChild(el('h3', { class: 'grp-title', id: (secId || 'sec') + '-g-' + slugify(g), 'data-label': g }, [
        document.createTextNode(g),
        el('span', { class: 'grp-count acc-' + groupAccent(g), text: String(groups[g].length) })
      ]));
      var grid = el('div', { class: 'grid' });
      groups[g].sort(function (a, b) { return a.name.localeCompare(b.name); })
        .forEach(function (it) { grid.appendChild(card(it)); });
      wrap.appendChild(grid);
    });
    return wrap;
  }

  function emptyState(q) {
    return el('div', { class: 'empty' }, [
      el('h3', { text: q ? 'No tools match “' + q + '”' : 'Nothing here yet' }),
      el('p', { text: q ? 'Try a different term, or add it as your own link.' : 'Add your first link to get started.' }),
      el('button', { class: 'btn primary', type: 'button', text: '+ Add a link', onclick: openModal })
    ]);
  }

  function myEmptyState(q) {
    if (q) return emptyState(q);
    return el('div', { class: 'empty empty-my' }, [
      el('div', { class: 'empty-star', html: STAR_FILL }),
      el('h3', { text: 'Your shortlist is empty' }),
      el('p', { text: 'Tap the ★ on any tool to save it here for one-click access — or add your own link.' }),
      el('div', { class: 'empty-cta' }, [
        el('button', { class: 'btn primary', type: 'button', text: '+ Add a link', onclick: openModal }),
        el('button', { class: 'btn ghost', type: 'button', text: 'Browse all tools', onclick: function () { setFilter('all'); } })
      ])
    ]);
  }

  function setFilter(f) {
    state.filter = f;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* -------------------------------------------------------------- render */
  function counts() {
    var v = allLinks().filter(notHidden);
    function inSec(s) { return function (i) { return i.sections && i.sections.indexOf(s) >= 0; }; }
    return {
      all: v.length,
      stocks: v.filter(inSec('stocks')).length,
      crypto: v.filter(inSec('crypto')).length,
      macro: v.filter(inSec('macro')).length,
      my: customLinks.length + seedLinks.filter(isStarred).length
    };
  }

  function render() {
    var content = document.getElementById('content');
    content.innerHTML = '';
    var q = state.query.trim().toLowerCase();
    var c = counts();
    updatePills(c);

    var pool = allLinks().filter(notHidden).filter(function (i) { return matches(i, q); });
    var shown = 0;

    if (state.filter === 'my') {
      var mine = pool.filter(function (i) { return i.isCustom || isStarred(i); });
      if (mine.length) { content.appendChild(groupedBlock('My Links', mine, true, 'sec-my')); shown = mine.length; }
      else { content.appendChild(myEmptyState(q)); }
    } else {
      var secs = state.filter === 'all' ? SECTION_ORDER : [state.filter];
      secs.forEach(function (sec) {
        var items = pool.filter(function (i) { return i.sections && i.sections.indexOf(sec) >= 0; });
        if (!items.length) return;
        shown += items.length;
        content.appendChild(groupedBlock(SECTION_LABEL[sec], items, state.filter === 'all', 'sec-' + sec));
      });
      if (!shown) content.appendChild(emptyState(q));
    }

    updateStatus(q, pool.length, c);
    renderFooter();
    document.body.classList.toggle('is-browsing', state.filter !== 'all' || !!state.query.trim());
    renderJumpbar();
    renderCatnav();
    setHeaderH();
    setupSpy();
    spyScroll();
    syncUrl();
  }

  function updatePills(c) {
    document.querySelectorAll('.pill').forEach(function (p) {
      var f = p.getAttribute('data-filter');
      p.classList.toggle('active', f === state.filter);
      var span = p.querySelector('.pill-count');
      if (span) span.textContent = c[f] != null ? c[f] : '';
    });
  }

  function updateStatus(q, poolLen, c) {
    var s = document.getElementById('status');
    if (q) { s.textContent = poolLen + (poolLen === 1 ? ' result' : ' results'); return; }
    var n = state.filter === 'my' ? c.my : c[state.filter];
    s.textContent = n + (n === 1 ? ' tool' : ' tools');
  }

  function renderFooter() {
    var foot = document.getElementById('foot');
    foot.innerHTML = '';
    foot.appendChild(el('span', { text: 'Market Hub' }));
    foot.appendChild(el('span', { class: 'spacer' }));
    if (hiddenIds.length) {
      foot.appendChild(el('a', {
        text: 'Restore ' + hiddenIds.length + ' hidden',
        onclick: function () { hiddenIds = []; save(STORE.hidden, hiddenIds); toast('Hidden links restored'); render(); }
      }));
    }
    foot.appendChild(el('span', { text: 'Links open in a new tab · saved locally in your browser' }));
  }

  // Reflect filter/search in the URL so views are shareable (and the SearchAction is valid).
  function syncUrl() {
    try {
      var params = new URLSearchParams();
      if (state.filter && state.filter !== 'all') params.set('filter', state.filter);
      if (state.query.trim()) params.set('q', state.query.trim());
      var qs = params.toString();
      history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
    } catch (e) { /* file:// or unsupported — ignore */ }
  }

  function readUrlState() {
    try {
      var p = new URLSearchParams(location.search);
      var f = p.get('filter');
      if (f && ['all', 'stocks', 'crypto', 'macro', 'my'].indexOf(f) >= 0) state.filter = f;
      var q = p.get('q');
      if (q) state.query = q;
    } catch (e) { /* ignore */ }
  }

  /* ----------------------------------------------------- in-page nav */
  function headerH() { var tb = document.querySelector('.topbar'); return tb ? tb.offsetHeight : 132; }
  function setHeaderH() { document.documentElement.style.setProperty('--header-h', headerH() + 'px'); }

  // Keep the active item visible inside the (scrollable) sidebar without moving the page.
  function ensureVisible(a) {
    var nav = document.getElementById('catnav');
    if (!nav) return;
    var ar = a.getBoundingClientRect(), nr = nav.getBoundingClientRect();
    if (ar.top < nr.top) nav.scrollTop += ar.top - nr.top - 8;
    else if (ar.bottom > nr.bottom) nav.scrollTop += ar.bottom - nr.bottom + 8;
  }

  // Highlight the current section/group across both the sidebar and the mobile chip bar.
  // id = the precise current target; secId = its parent section (when inside a group).
  var lastSpyId = null;
  function setActiveNav(id, secId) {
    if (id === lastSpyId) return;
    lastSpyId = id;
    document.querySelectorAll('.cat-link').forEach(function (a) {
      var href = a.getAttribute('href');
      var on = href === '#' + id;
      a.classList.toggle('active', on);
      a.classList.toggle('within', !on && !!secId && href === '#' + secId);
      if (on) ensureVisible(a);
    });
    document.querySelectorAll('.jb-chip').forEach(function (a) {
      var href = a.getAttribute('href');
      var on = href === '#' + id || (!!secId && href === '#' + secId);
      a.classList.toggle('active', on);
      if (on && a.scrollIntoView) a.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  }

  // Targets in visual order: each section, followed by its groups.
  var spyTargets = [];
  function setupSpy() {
    spyTargets = [];
    document.querySelectorAll('#content .sec[id]').forEach(function (s) {
      spyTargets.push(s);
      s.querySelectorAll('.grp-title[id]').forEach(function (g) { spyTargets.push(g); });
    });
    lastSpyId = null;
  }
  function spyScroll() {
    if (!spyTargets.length) return;
    var threshold = headerH() + 24;
    var cur = spyTargets[0];
    for (var i = 0; i < spyTargets.length; i++) {
      if (spyTargets[i].getBoundingClientRect().top <= threshold) cur = spyTargets[i];
    }
    var sec = cur.classList.contains('sec') ? null : ((cur.closest('.sec') || {}).id || null);
    setActiveNav(cur.id, sec);
  }

  // Mobile: horizontal chip bar (sections on All, groups when filtered).
  function renderJumpbar() {
    var jb = document.getElementById('jumpbar');
    if (!jb) return;
    jb.innerHTML = '';
    var targets = [];
    if (!state.query.trim()) {
      if (state.filter === 'all') {
        SECTION_ORDER.forEach(function (sec) {
          if (document.getElementById('sec-' + sec)) targets.push({ id: 'sec-' + sec, label: SECTION_LABEL[sec], acc: sectionAccent(sec) });
        });
      } else {
        document.querySelectorAll('#content .grp-title[id]').forEach(function (h) {
          var label = h.getAttribute('data-label') || h.textContent;
          targets.push({ id: h.id, label: label, acc: groupAccent(label) });
        });
      }
    }
    if (targets.length <= 1) { jb.hidden = true; return; }
    jb.hidden = false;
    targets.forEach(function (t) {
      jb.appendChild(el('a', { class: 'jb-chip acc-' + t.acc, href: '#' + t.id }, [
        el('span', { class: 'jb-dot' }), el('span', { text: t.label })
      ]));
    });
  }

  // Desktop: sticky vertical category nav — sections and their groups, with counts.
  function renderCatnav() {
    var nav = document.getElementById('catnav');
    var browse = document.getElementById('browse');
    if (!nav) return;
    nav.innerHTML = '';
    function done(hidden) {
      nav.hidden = hidden;
      if (browse) browse.classList.toggle('no-catnav', hidden);
    }
    if (state.query.trim()) { done(true); return; }

    var inner = el('div', { class: 'catnav-inner' });
    var labelText = state.filter === 'my' ? 'My Links'
      : (SECTION_LABEL[state.filter] || 'Categories');
    inner.appendChild(el('span', { class: 'cat-label', text: labelText }));

    var any = false;
    document.querySelectorAll('#content .sec[id]').forEach(function (secEl) {
      var secKey = secEl.id.replace(/^sec-/, '');
      var title = secEl.querySelector('.sec-title');
      if (title) {
        any = true;
        var sc = secEl.querySelector('.sec-count');
        inner.appendChild(el('a', { class: 'cat-link cat-sec acc-' + sectionAccent(secKey), href: '#' + secEl.id }, [
          el('span', { class: 'cat-dot' }),
          el('span', { class: 'cat-name', text: title.textContent }),
          sc ? el('span', { class: 'cat-count', text: sc.textContent }) : null
        ]));
      }
      secEl.querySelectorAll('.grp-title[id]').forEach(function (g) {
        any = true;
        var label = g.getAttribute('data-label') || g.textContent;
        var gc = g.querySelector('.grp-count');
        inner.appendChild(el('a', { class: 'cat-link cat-grp acc-' + groupAccent(label), href: '#' + g.id }, [
          el('span', { class: 'cat-dot' }),
          el('span', { class: 'cat-name', text: label }),
          gc ? el('span', { class: 'cat-count', text: gc.textContent }) : null
        ]));
      });
    });

    if (!any) { done(true); return; }
    nav.appendChild(inner);
    done(false);
  }

  /* --------------------------------------------------------------- modal */
  function openModal() {
    var m = document.getElementById('modal');
    m.hidden = false;
    var first = m.querySelector('input[name="name"]');
    if (first) setTimeout(function () { first.focus(); }, 30);
  }
  function closeModal() {
    document.getElementById('modal').hidden = true;
    document.getElementById('addForm').reset();
  }

  function handleAdd(e) {
    e.preventDefault();
    var form = e.target;
    var fd = new FormData(form);
    var name = String(fd.get('name') || '').trim();
    var rawUrl = String(fd.get('url') || '').trim();
    if (!name || !rawUrl) return;
    if (!/^https?:\/\//i.test(rawUrl)) rawUrl = 'https://' + rawUrl;
    try { new URL(rawUrl); } catch (err) { window.alert('Please enter a valid URL.'); return; }

    var section = String(fd.get('section') || 'stocks');
    var item = {
      id: 'custom-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7),
      name: name,
      url: rawUrl,
      description: String(fd.get('description') || '').trim(),
      sections: [section],
      group: String(fd.get('group') || '').trim() || 'My Links',
      isCustom: true
    };
    customLinks.push(item);
    save(STORE.custom, customLinks);
    closeModal();
    state.filter = section;
    state.query = '';
    var search = document.getElementById('search');
    if (search) search.value = '';
    render();
    toast('Link added');
  }

  /* ---------------------------------------------------------- newsletter */
  function handleSubscribe(e) {
    e.preventDefault();
    var form = e.target;
    var input = form.querySelector('input[name="email"]');
    var note = document.getElementById('newsletterNote');
    var email = (input.value || '').trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      note.textContent = 'Please enter a valid email address.';
      note.className = 'nl-note nl-err';
      input.focus();
      return;
    }
    if (!NEWSLETTER_ENDPOINT) {
      subscribeDone(form, note, true);
      console.info('[Market Hub] Newsletter is in demo mode. Set NEWSLETTER_ENDPOINT in app.js ' +
        '(e.g. your Formspree/Buttondown/Beehiiv/Netlify form URL) to start collecting sign-ups.');
      return;
    }
    var btn = form.querySelector('button');
    btn.disabled = true; btn.textContent = '…';
    // Our own /api/* endpoint expects JSON; third-party providers expect a form post.
    var ownApi = /^\/api\//.test(NEWSLETTER_ENDPOINT);
    var opts = ownApi
      ? { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ email: email }) }
      : { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) };
    fetch(NEWSLETTER_ENDPOINT, opts)
      .then(function (r) { if (!r.ok) throw new Error('bad status'); subscribeDone(form, note, false); })
      .catch(function () {
        note.textContent = 'Something went wrong — please try again.';
        note.className = 'nl-note nl-err';
        btn.disabled = false; btn.textContent = 'Subscribe';
      });
  }

  function subscribeDone(form, note, demo) {
    form.innerHTML = '';
    form.appendChild(el('p', { class: 'nl-success', text: '✓ Thanks — you\'re on the list.' }));
    note.textContent = demo ? 'Demo mode: connect a provider in app.js to store sign-ups.' : 'We\'ll never share your email.';
    note.className = 'nl-note';
  }

  /* --------------------------------------------------------------- theme */
  var themeBtn;
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    save(STORE.theme, t);
    if (themeBtn) {
      themeBtn.innerHTML = t === 'dark' ? SUN_SVG : MOON_SVG;
      themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  /* ---------------------------------------------------------- view mode */
  function applyView(v) {
    state.view = (v === 'list') ? 'list' : 'grid';
    var c = document.getElementById('content');
    if (c) c.classList.toggle('list', state.view === 'list');
    document.querySelectorAll('.view-btn').forEach(function (b) {
      var on = b.getAttribute('data-view') === state.view;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    save(STORE.view, state.view);
  }

  /* ----------------------------------------------------------- count-up */
  function animateCounts() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('[data-count]').forEach(function (node) {
      var target = parseInt(node.getAttribute('data-count'), 10) || 0;
      if (reduce) { node.textContent = String(target); return; }
      var start = null, dur = 1100;
      function step(now) {
        if (start == null) start = now;
        var t = Math.min(1, (now - start) / dur);
        node.textContent = String(Math.round((1 - Math.pow(1 - t, 3)) * target));
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ------------------------------------------------- course progress */
  var CHECK_SVG = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 6.5"/></svg>';
  function fillCourseProgress() {
    var store; try { store = JSON.parse(localStorage.getItem('marketHub.courses.v1')) || {}; } catch (e) { store = {}; }
    document.querySelectorAll('.course-card[data-course]').forEach(function (c) {
      var slug = c.getAttribute('data-course'), total = parseInt(c.getAttribute('data-lessons'), 10) || 0;
      var done = Math.min(store[slug] || 0, total), pct = total ? Math.round(done / total * 100) : 0;
      var bar = c.querySelector('.cc-bar > i'), st = c.querySelector('.cc-status');
      if (bar) bar.style.width = pct + '%';
      c.classList.remove('is-done', 'is-progress');
      if (st) {
        if (done <= 0) { st.textContent = 'Not started'; }
        else if (done >= total) { st.innerHTML = CHECK_SVG + ' Completed'; c.classList.add('is-done'); }
        else { st.textContent = done + ' / ' + total + ' lessons'; c.classList.add('is-progress'); }
      }
    });
  }

  /* --------------------------------------------------------------- toast */
  var toastTimer;
  function toast(msg) {
    var prev = document.querySelector('.toast');
    if (prev) prev.remove();
    var t = el('div', { class: 'toast', text: msg });
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { t.remove(); }, 260);
    }, 2400);
  }

  /* -------------------------------------------------- search suggestions */
  var suggestBox, searchInput, sugItems = [], sugActive = -1, sugOpen = false;

  // Rank matches: exact name > name prefix > host prefix > name contains > anywhere.
  function suggestionsFor(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    var scored = [];
    allLinks().filter(notHidden).forEach(function (it) {
      var name = it.name.toLowerCase(), host = hostname(it.url).toLowerCase(), s = -1;
      if (name === q) s = 0;
      else if (name.indexOf(q) === 0) s = 1;
      else if (host.indexOf(q) === 0) s = 2;
      else if (name.indexOf(q) >= 0) s = 3;
      else if (matches(it, q)) s = 4;
      if (s >= 0) scored.push({ it: it, s: s });
    });
    scored.sort(function (a, b) { return a.s - b.s || a.it.name.localeCompare(b.it.name); });
    return scored.slice(0, 8).map(function (x) { return x.it; });
  }

  // Tool name with the matched fragment wrapped in <b>.
  function highlightName(text, q) {
    var span = el('span', { class: 'sug-name' });
    var i = q ? text.toLowerCase().indexOf(q) : -1;
    if (i < 0) { span.textContent = text; return span; }
    span.appendChild(document.createTextNode(text.slice(0, i)));
    span.appendChild(el('b', { text: text.slice(i, i + q.length) }));
    span.appendChild(document.createTextNode(text.slice(i + q.length)));
    return span;
  }

  function sugRow(item, idx, q) {
    var sec = (item.sections && item.sections[0]) || 'stocks';
    var aff = isActiveAffiliate(item);
    var meta = (item.group ? item.group + ' · ' : '') + hostname(item.url);
    var row = el('a', {
      class: 'sug-row', role: 'option', id: 'sug-' + idx, href: linkHref(item),
      target: '_blank', rel: aff ? 'sponsored nofollow noopener noreferrer' : 'noopener noreferrer'
    }, [
      faviconEl(item),
      el('span', { class: 'sug-main' }, [
        highlightName(item.name, q),
        el('span', { class: 'sug-meta', text: meta })
      ]),
      el('span', { class: 'sug-sec acc-' + sectionAccent(sec), text: SECTION_LABEL[sec] || 'Tool' }),
      el('span', { class: 'sug-go', text: '↵', 'aria-hidden': 'true' })
    ]);
    row.addEventListener('mousemove', function () { if (sugActive !== idx) setActiveSug(idx); });
    row.addEventListener('click', function () { toast('Opening ' + item.name + ' ↗'); closeSuggest(); });
    return row;
  }

  function renderSuggest(items, q) {
    suggestBox.innerHTML = '';
    sugItems = items; sugActive = -1;
    suggestBox.appendChild(el('div', { class: 'sug-head' }, [
      el('span', { text: items.length + (items.length === 1 ? ' match' : ' matches') }),
      el('span', { text: '↑↓ navigate · ↵ open' })
    ]));
    items.forEach(function (it, i) { suggestBox.appendChild(sugRow(it, i, q)); });
  }

  function openSuggest() { sugOpen = true; suggestBox.hidden = false; searchInput.setAttribute('aria-expanded', 'true'); }
  function closeSuggest() {
    if (!sugOpen) return;
    sugOpen = false; suggestBox.hidden = true; sugActive = -1;
    searchInput.setAttribute('aria-expanded', 'false');
    searchInput.removeAttribute('aria-activedescendant');
  }
  function updateSuggest() {
    var q = searchInput.value.trim().toLowerCase();
    if (!q) { closeSuggest(); return; }
    var items = suggestionsFor(q);
    if (!items.length) { closeSuggest(); return; }
    renderSuggest(items, q);
    openSuggest();
  }
  function setActiveSug(i) {
    var rows = suggestBox.querySelectorAll('.sug-row');
    if (!rows.length) return;
    if (i < 0) i = rows.length - 1; else if (i >= rows.length) i = 0;
    sugActive = i;
    rows.forEach(function (r, idx) { r.classList.toggle('active', idx === i); });
    searchInput.setAttribute('aria-activedescendant', rows[i].id);
    if (rows[i].scrollIntoView) rows[i].scrollIntoView({ block: 'nearest' });
  }

  function setupSuggest() {
    suggestBox = document.getElementById('suggest');
    if (!suggestBox) return;
    // Keep input focused when clicking a row so the anchor's own click still fires.
    suggestBox.addEventListener('mousedown', function (e) { e.preventDefault(); });
    searchInput.addEventListener('focus', updateSuggest);
    searchInput.addEventListener('blur', function () { setTimeout(closeSuggest, 120); });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        if (!sugOpen) updateSuggest();
        if (sugOpen) { e.preventDefault(); setActiveSug(sugActive + 1); }
      } else if (e.key === 'ArrowUp') {
        if (sugOpen) { e.preventDefault(); setActiveSug(sugActive - 1); }
      } else if (e.key === 'Enter') {
        if (sugOpen && sugActive >= 0) {
          var rows = suggestBox.querySelectorAll('.sug-row');
          if (rows[sugActive]) { e.preventDefault(); rows[sugActive].click(); }
        }
      } else if (e.key === 'Escape') {
        if (sugOpen) { e.stopPropagation(); closeSuggest(); }
      }
    });
  }

  /* ----------------------------------------------------------------- init */
  function init() {
    readUrlState();

    themeBtn = document.getElementById('themeBtn');
    applyTheme(load(STORE.theme, 'dark'));
    themeBtn.addEventListener('click', function () {
      applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });

    var pending = allLinks().filter(function (i) { return i.affiliate && PLACEHOLDER_RE.test(i.affiliate); });
    if (pending.length) {
      console.info('[Market Hub] ' + pending.length + ' affiliate link(s) still use the YOUR_ID placeholder. ' +
        'Edit data.js to activate: ' + pending.map(function (i) { return i.name; }).join(', '));
    }

    document.getElementById('addBtn').addEventListener('click', openModal);
    document.getElementById('addForm').addEventListener('submit', handleAdd);
    document.querySelectorAll('[data-close]').forEach(function (n) {
      n.addEventListener('click', closeModal);
    });

    document.getElementById('filters').addEventListener('click', function (e) {
      var pill = e.target.closest('.pill');
      if (!pill) return;
      setFilter(pill.getAttribute('data-filter'));
    });

    document.querySelectorAll('.view-btn').forEach(function (b) {
      b.addEventListener('click', function () { applyView(b.getAttribute('data-view')); });
    });
    applyView(load(STORE.view, 'grid'));

    var search = document.getElementById('search');
    searchInput = search;
    search.value = state.query;
    search.addEventListener('input', function () { state.query = search.value; render(); updateSuggest(); });
    setupSuggest();

    var nlForm = document.getElementById('newsletterForm');
    if (nlForm) nlForm.addEventListener('submit', handleSubscribe);
    document.querySelectorAll('a[href="#newsletter"]').forEach(function (a) {
      a.addEventListener('click', function () {
        setTimeout(function () { var i = document.querySelector('#newsletterForm input'); if (i) i.focus(); }, 320);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== search && !modalOpen()) {
        e.preventDefault(); search.focus(); search.select();
      } else if (e.key === 'Escape') {
        if (modalOpen()) { closeModal(); }
        else if (search.value) { search.value = ''; state.query = ''; render(); }
        else { search.blur(); }
      }
    });

    var toTop = document.getElementById('toTop');
    var topbar = document.querySelector('.topbar');
    var ticking = false;
    function onScroll() {
      var y = window.scrollY || window.pageYOffset || 0;
      if (topbar) topbar.classList.toggle('scrolled', y > 6);
      if (toTop) toTop.hidden = y < 700;
      if (!ticking) { ticking = true; requestAnimationFrame(function () { spyScroll(); ticking = false; }); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { setHeaderH(); spyScroll(); });
    if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    // Clicking the logo scrolls back to the top (it's a <div> on the homepage, not a link).
    var brand = document.querySelector('.brand');
    if (brand && brand.tagName !== 'A') {
      brand.style.cursor = 'pointer';
      brand.setAttribute('role', 'button');
      brand.setAttribute('tabindex', '0');
      brand.setAttribute('aria-label', 'Back to top');
      var toTopBrand = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); };
      brand.addEventListener('click', toTopBrand);
      brand.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toTopBrand(); }
      });
    }
    onScroll();

    render();
    animateCounts();
    fillCourseProgress();
  }
  function modalOpen() { return !document.getElementById('modal').hidden; }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
