/* Search suggestions for the header search box on generated sub-pages
 * (tool / course / learn / privacy / 404). Reads window.SEED_LINKS (data.js)
 * and reuses the .suggest dropdown styles. Selecting a tool opens its detail page. */
(function () {
  'use strict';
  var input = document.querySelector('.site-search input');
  var form = document.querySelector('.site-search');
  if (!input || !form || !window.SEED_LINKS) return;

  function slugify(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }
  function hostname(u) { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return ''; } }
  var SEC_LABEL = { stocks: 'Stocks', crypto: 'Crypto', macro: 'Macro' };
  var SEC_ACC = { stocks: 'blue', crypto: 'amber', macro: 'purple' };

  var TOOLS = window.SEED_LINKS.map(function (t) {
    return { name: t.name, url: t.url, host: hostname(t.url), group: t.group || '',
      sections: t.sections || [], icon: t.icon || null, slug: slugify(t.name) };
  });

  var box = document.createElement('div');
  box.className = 'suggest'; box.setAttribute('role', 'listbox');
  box.setAttribute('aria-label', 'Tool suggestions'); box.hidden = true;
  form.appendChild(box);

  var items = [], active = -1, isOpen = false;

  function monogram(name) {
    var s = (name || '?').trim(), hue = 0, i;
    for (i = 0; i < s.length; i++) hue = (hue * 31 + s.charCodeAt(i)) % 360;
    var d = document.createElement('div');
    d.className = 'fav fav-mono'; d.textContent = (s.charAt(0) || '?').toUpperCase();
    d.style.background = 'hsl(' + hue + ', 48%, 36%)';
    return d;
  }
  function favEl(t) {
    if (t.icon === 'mono' || !t.host) return monogram(t.name);
    var img = document.createElement('img');
    img.className = 'fav'; img.alt = ''; img.loading = 'lazy';
    img.src = 'https://www.google.com/s2/favicons?sz=64&domain=' + encodeURIComponent(t.host);
    img.addEventListener('error', function () { img.replaceWith(monogram(t.name)); });
    return img;
  }
  function rank(q) {
    q = q.trim().toLowerCase(); if (!q) return [];
    var scored = [];
    TOOLS.forEach(function (t) {
      var n = t.name.toLowerCase(), h = t.host.toLowerCase(), s = -1;
      if (n === q) s = 0; else if (n.indexOf(q) === 0) s = 1; else if (h.indexOf(q) === 0) s = 2;
      else if (n.indexOf(q) >= 0) s = 3; else if ((n + ' ' + t.group.toLowerCase() + ' ' + h).indexOf(q) >= 0) s = 4;
      if (s >= 0) scored.push({ t: t, s: s });
    });
    scored.sort(function (a, b) { return a.s - b.s || a.t.name.localeCompare(b.t.name); });
    return scored.slice(0, 8).map(function (x) { return x.t; });
  }
  function highlight(text, q) {
    var span = document.createElement('span'); span.className = 'sug-name';
    var i = q ? text.toLowerCase().indexOf(q) : -1;
    if (i < 0) { span.textContent = text; return span; }
    span.appendChild(document.createTextNode(text.slice(0, i)));
    var b = document.createElement('b'); b.textContent = text.slice(i, i + q.length); span.appendChild(b);
    span.appendChild(document.createTextNode(text.slice(i + q.length)));
    return span;
  }
  function row(t, idx, q) {
    var sec = (t.sections && t.sections[0]) || 'stocks';
    var a = document.createElement('a');
    a.className = 'sug-row'; a.setAttribute('role', 'option'); a.id = 'ssug-' + idx;
    a.href = '/tools/' + t.slug + '.html';
    a.appendChild(favEl(t));
    var main = document.createElement('span'); main.className = 'sug-main';
    main.appendChild(highlight(t.name, q));
    var meta = document.createElement('span'); meta.className = 'sug-meta';
    meta.textContent = (t.group ? t.group + ' · ' : '') + t.host;
    main.appendChild(meta); a.appendChild(main);
    var sc = document.createElement('span'); sc.className = 'sug-sec acc-' + (SEC_ACC[sec] || 'green');
    sc.textContent = SEC_LABEL[sec] || 'Tool'; a.appendChild(sc);
    var go = document.createElement('span'); go.className = 'sug-go'; go.textContent = '↵';
    go.setAttribute('aria-hidden', 'true'); a.appendChild(go);
    a.addEventListener('mousemove', function () { if (active !== idx) setActive(idx); });
    return a;
  }
  function head(n) {
    var h = document.createElement('div'); h.className = 'sug-head';
    var l = document.createElement('span'); l.textContent = n + (n === 1 ? ' match' : ' matches'); h.appendChild(l);
    var hint = document.createElement('span'); hint.className = 'sug-hint';
    ['↑', '↓'].forEach(function (k) { var kb = document.createElement('kbd'); kb.textContent = k; hint.appendChild(kb); });
    var t1 = document.createElement('span'); t1.className = 'sug-hint-t'; t1.textContent = 'navigate'; hint.appendChild(t1);
    var kb = document.createElement('kbd'); kb.textContent = '↵'; hint.appendChild(kb);
    var t2 = document.createElement('span'); t2.className = 'sug-hint-t'; t2.textContent = 'open'; hint.appendChild(t2);
    h.appendChild(hint); return h;
  }
  function update() {
    var q = input.value.trim().toLowerCase();
    if (!q) { close(); return; }
    items = rank(q);
    if (!items.length) { close(); return; }
    box.innerHTML = ''; active = -1;
    box.appendChild(head(items.length));
    items.forEach(function (t, i) { box.appendChild(row(t, i, q)); });
    box.hidden = false; isOpen = true; input.setAttribute('aria-expanded', 'true');
  }
  function close() {
    if (!isOpen) return;
    isOpen = false; box.hidden = true; active = -1;
    input.removeAttribute('aria-activedescendant'); input.setAttribute('aria-expanded', 'false');
  }
  function setActive(i) {
    var rows = box.querySelectorAll('.sug-row'); if (!rows.length) return;
    if (i < 0) i = rows.length - 1; else if (i >= rows.length) i = 0;
    active = i;
    for (var j = 0; j < rows.length; j++) rows[j].classList.toggle('active', j === i);
    input.setAttribute('aria-activedescendant', rows[i].id);
    if (rows[i].scrollIntoView) rows[i].scrollIntoView({ block: 'nearest' });
  }

  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-expanded', 'false');
  box.addEventListener('mousedown', function (e) { e.preventDefault(); });
  input.addEventListener('input', update);
  input.addEventListener('focus', update);
  input.addEventListener('blur', function () { setTimeout(close, 120); });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { if (!isOpen) update(); if (isOpen) { e.preventDefault(); setActive(active + 1); } }
    else if (e.key === 'ArrowUp') { if (isOpen) { e.preventDefault(); setActive(active - 1); } }
    else if (e.key === 'Enter') {
      if (isOpen && active >= 0) { var rows = box.querySelectorAll('.sug-row'); if (rows[active]) { e.preventDefault(); window.location.href = rows[active].href; } }
    } else if (e.key === 'Escape') { if (isOpen) { e.stopPropagation(); close(); } }
  });
})();
