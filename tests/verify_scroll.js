/**
 * DA2451 vertical-scroll regression suite (real Chromium over file://).
 * Detects: excess blank space after final content, scroll leakage across routes,
 * invalid scroll restoration, nested scroll traps, layout inflation by closed dialogs,
 * scroll drift after reveal/hide answers, wheel/keyboard scrolling in both directions.
 */
const { launch, MEASURE } = require('./cdp');
let failures = 0;
const ok = (c, m, extra) => { if (c) console.log('  [PASS] ' + m); else { failures++; console.error('  [FAIL] ' + m + (extra ? '  -> ' + extra : '')); } };
const J = o => JSON.stringify(o);

// Max tolerated distance between last visible content and document bottom (px).
// Desktop: main bottom padding (~96px) + margin. Mobile adds the fixed bottom tab bar.
const blankLimit = w => (w < 720 ? 300 : 260);

const DOC = `(() => ({ docH: document.documentElement.scrollHeight, y: Math.round(scrollY), max: document.documentElement.scrollHeight - innerHeight }))()`;
const SCROLLERS = `(() => {
  const out = [];
  document.querySelectorAll('body *').forEach(el => {
    const cs = getComputedStyle(el);
    if (!/(auto|scroll)/.test(cs.overflowY) || el.tagName === 'TEXTAREA') return;
    if (el.scrollHeight <= el.clientHeight + 1) return;
    const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return;
    out.push(el.tagName + '.' + String(el.className).split(' ')[0]);
  });
  return out;
})()`;

(async () => {
  const c = await launch(9410);
  try {
    await c.ev(`(()=>{
      const t = document.querySelector('.theme-tile[data-theme-opt="light"]');
      if (t) t.click();
      const b = document.querySelector('[data-action="welcome-continue"]');
      if (b) b.click();
      const d = document.getElementById('dlg-welcome');
      if (d && d.open) d.close();
    })()`);
    await c.sleep(300);

    console.log('\n=== S1. Closed dialogs must not occupy layout ===');
    const dlgs = await c.ev(`Array.from(document.querySelectorAll('dialog')).filter(d=>!d.open).map(d=>({id:d.id,disp:getComputedStyle(d).display}))`);
    ok(dlgs.length >= 5 && dlgs.every(d => d.disp === 'none'), 'All closed <dialog> elements compute to display:none', J(dlgs));
    const stray = await c.ev(`Array.from(document.body.children).filter(e => {
      if (/^(SCRIPT|STYLE|LINK|SVG|DIALOG|TEMPLATE)$/i.test(e.tagName)) return false;
      if (e.matches('.app, #toasts, .sidebar-scrim, #pdf-overlay, .skip-link, .skip, .sr-only, #live, .focus-exit')) return false;
      const r = e.getBoundingClientRect(); const cs = getComputedStyle(e);
      return cs.display !== 'none' && cs.position !== 'fixed' && r.height > 0;
    }).map(e => e.tagName + '#' + e.id + '.' + String(e.className).slice(0, 30) + ' h=' + Math.round(e.getBoundingClientRect().height))`);
    ok(stray.length === 0, 'No stray rendered markup directly under <body> outside the app shell', J(stray));
    const integrity = await c.ev(`Array.from(document.querySelectorAll('h3')).filter(h => /Content Integrity/.test(h.textContent)).length`);
    ok(integrity === 1, `About "Content Integrity" section exists exactly once (${integrity})`);

    console.log('\n=== S2. Blank space after final content, per view x viewport ===');
    const views = ['#dashboard', '#chapters', '#papers', '#practice', '#predicted-mcqs', '#predicted-essays', '#bookmarks', '#chapter/ch01', '#chapter/ch03', '#paper/b23-final-2025-10', '#worksheet/pq01'];
    const sizes = [[320, 700], [390, 844], [768, 700], [1024, 768], [1280, 720], [1440, 900]];
    for (const [w, h] of sizes) {
      await c.viewport(w, h, w < 720);
      for (const v of views) {
        await c.ev(`location.hash='${v}'`); await c.sleep(350);
        await c.ev(`scrollTo(0, 1e7)`); await c.sleep(350);
        await c.ev(`scrollTo(0, 1e7)`); await c.sleep(250);
        const m = await c.ev(MEASURE);
        // Sticky TOC rails can legitimately extend lower than main content; ignore negatives.
        // A page that fits the viewport has no scrollable region, so "blank below" is just viewport fill.
        const scrollable = m.docScrollH > m.innerH + 2;
        ok(!scrollable || m.blankBelow <= blankLimit(w), `${w}x${h} ${v}: ${scrollable ? m.blankBelow + 'px below last content' : 'fits viewport (not scrollable)'} (limit ${blankLimit(w)})`, J(m));
        if (v === '#dashboard' && (w === 390 || w === 1440 || w === 1280)) await c.shot(`scroll_dashboard_bottom_${w}x${h}.png`);
      }
    }

    console.log('\n=== S3. Dark theme + theme switching keeps geometry ===');
    await c.viewport(1440, 900);
    await c.ev(`location.hash='#dashboard'`); await c.sleep(300);
    const before = await c.ev(DOC);
    await c.ev(`document.querySelector('[data-action="toggle-theme"]').click()`); await c.sleep(300);
    const dark = await c.ev(`document.documentElement.getAttribute('data-theme')`);
    await c.ev(`scrollTo(0,1e7)`); await c.sleep(300);
    const mDark = await c.ev(MEASURE);
    ok(Math.abs(mDark.docScrollH - before.docH) < 40, `Theme switch (${dark}) does not change document height`, `${before.docH} -> ${mDark.docScrollH}`);
    ok(mDark.blankBelow <= 260, `Dark dashboard blank-below ${mDark.blankBelow}px`);
    await c.shot('scroll_dashboard_bottom_dark_1440x900.png');
    await c.ev(`document.querySelector('[data-action="toggle-theme"]').click()`); await c.sleep(200);

    console.log('\n=== S4. Wheel + keyboard scrolling in both directions (dashboard) ===');
    await c.ev(`location.hash='#dashboard'`); await c.sleep(300); await c.ev(`scrollTo(0,0)`); await c.sleep(100);
    await c.wheel(400); await c.sleep(500);
    const dn = await c.ev(DOC);
    ok(dn.y > 100, `Mouse wheel scrolls down (scrollY=${dn.y})`);
    await c.wheel(-250); await c.sleep(500);
    const up = await c.ev(DOC);
    ok(up.y < dn.y, `Mouse wheel scrolls back up (${dn.y} -> ${up.y})`);
    await c.key('End'); await c.sleep(600);
    const end = await c.ev(DOC);
    ok(end.y >= end.max - 2, `End key reaches the true bottom (y=${end.y}, max=${end.max})`);
    const mEnd = await c.ev(MEASURE);
    ok(mEnd.blankBelow <= 260, `After End key, final content is within ${mEnd.blankBelow}px of bottom`);
    await c.key('Home'); await c.sleep(600);
    ok((await c.ev(DOC)).y <= 2, 'Home key returns to top');
    await c.wheel(300); await c.sleep(300); await c.wheel(-1000); await c.sleep(600);
    ok((await c.ev(DOC)).y <= 2, 'Wheel-up from the bottom region always returns to top (no trap)');

    console.log('\n=== S5. Scroll-state contamination across routes ===');
    await c.ev(`location.hash='#chapter/ch03'`); await c.sleep(600);
    await c.ev(`scrollTo(0, 9000)`); await c.sleep(500);
    const ch = await c.ev(DOC);
    ok(ch.y > 8000, `Chapter 3 scrolled deep (y=${ch.y})`);
    await c.ev(`location.hash='#dashboard'`); await c.sleep(700);
    const d1 = await c.ev(DOC);
    ok(d1.y === 0, `Dashboard opened after long chapter starts at top (y=${d1.y})`);
    ok(d1.y <= d1.max, 'Dashboard scroll position is within its own scrollable range');
    await c.ev(`scrollTo(0, 300)`); await c.sleep(400);
    await c.ev(`location.hash='#chapter/ch03'`); await c.sleep(700);
    const ch2 = await c.ev(DOC);
    ok(ch2.y > 8000 && ch2.y <= ch2.max, `Returning to Chapter 3 restores its own valid position (y=${ch2.y})`);
    await c.ev(`location.hash='#dashboard'`); await c.sleep(600);
    ok((await c.ev(DOC)).y === 0, 'Returning to Dashboard opens at the top (never restores a chapter or stale offset)');
    await c.ev(`location.hash='#papers'`); await c.sleep(500);
    ok((await c.ev(DOC)).y === 0, 'Past Papers library opens at top');
    await c.ev(`location.hash='#chapter/ch03'`); await c.sleep(700);
    const ch3b = await c.ev(DOC);
    ok(ch3b.y > 8000 && ch3b.y <= ch3b.max, `Chapter 3 still resumes its own valid reading position (y=${ch3b.y})`);
    await c.ev(`location.hash='#papers'`); await c.sleep(500);
    await c.ev(`history.back()`); await c.sleep(700);
    const bk = await c.ev(DOC);
    ok(bk.y <= bk.max, `Browser Back lands inside valid range (y=${bk.y}, max=${bk.max})`);
    await c.ev(`history.forward()`); await c.sleep(500);
    ok((await c.ev(MEASURE)).hash === '#papers', 'Browser Forward returns to Past Papers');
    await c.ev(`location.reload()`); await c.sleep(2500);
    await c.ev(`(()=>{
      const t = document.querySelector('.theme-tile[data-theme-opt="light"]');
      if (t) t.click();
      const b = document.querySelector('[data-action="welcome-continue"]');
      if (b) b.click();
      const d = document.getElementById('dlg-welcome');
      if (d && d.open) d.close();
    })()`);
    const rl = await c.ev(DOC);
    ok(rl.y === 0 && (await c.ev(MEASURE)).hash === '#papers', `Reload of the standalone file starts at top on the same route (y=${rl.y})`);

    console.log('\n=== S6. Dialogs do not inflate or trap page scroll ===');
    await c.ev(`location.hash='#dashboard'`); await c.sleep(400); await c.ev(`scrollTo(0,200)`); await c.sleep(300);
    const dBefore = await c.ev(DOC);
    for (const [id, open] of [['dlg-about', 'open-about'], ['dlg-settings', 'open-settings'], ['dlg-shortcuts', 'open-shortcuts'], ['dlg-search', 'open-search']]) {
      await c.ev(`document.querySelector('[data-action="${open}"]').click()`); await c.sleep(350);
      const isOpen = await c.ev(`document.getElementById('${id}').open`);
      const bodyScrollers = await c.ev(SCROLLERS);
      ok(isOpen, `${id} opens`);
      await c.shot(`scroll_dialog_${id}.png`);
      await c.ev(`document.getElementById('${id}').close()`); await c.sleep(350);
      const dAfter = await c.ev(DOC);
      ok(dAfter.docH === dBefore.docH && Math.abs(dAfter.y - dBefore.y) < 3, `${id}: page height/scroll unchanged after close (${dBefore.docH}/${dBefore.y} -> ${dAfter.docH}/${dAfter.y})`);
    }

    console.log('\n=== S7. Reveal/hide long worked solutions does not drift ===');
    await c.ev(`location.hash='#paper/b23-final-2025-10'`); await c.sleep(700);
    // Prime content-visibility size caches by scrolling through the whole paper once, so the
    // baseline height reflects real (not estimated) card heights.
    for (let i = 0; i < 40; i++) { await c.ev(`scrollBy(0, innerHeight * 0.9)`); await c.sleep(40); }
    await c.ev(`scrollTo(0,0)`); await c.sleep(300);
    const pBase = await c.ev(DOC);
    await c.ev(`(()=>{const b=document.querySelector('#main .btn-reveal'); b.scrollIntoView({block:'center'}); })()`); await c.sleep(400);
    const yBefore = (await c.ev(DOC)).y;
    await c.ev(`document.querySelector('#main .btn-reveal').click()`); await c.sleep(500);
    const open = await c.ev(DOC);
    ok(open.docH > pBase.docH, `Revealing an answer expands the page (${pBase.docH} -> ${open.docH})`);
    await c.ev(`document.querySelector('#main .btn-reveal').click()`); await c.sleep(500);
    const shut = await c.ev(DOC);
    ok(Math.abs(shut.docH - pBase.docH) < 80, `Hiding restores page height (${pBase.docH} -> ${shut.docH})`);
    ok(Math.abs(shut.y - yBefore) < 150, `Scroll position stable after reveal+hide (${yBefore} -> ${shut.y})`);

    console.log('\n=== S8. PDF open/close and font-size changes ===');
    await c.ev(`location.hash='#chapter/ch02'`); await c.sleep(700);
    await c.ev(`scrollTo(0, 1500)`); await c.sleep(300);
    await c.ev(`document.getElementById('btn-view-original-pdf').click()`); await c.sleep(500);
    await c.shot('scroll_pdf_overlay.png');
    await c.ev(`document.querySelector('#pdf-overlay [data-action="close-pdf"]').click()`); await c.sleep(500);
    const pdfAfter = await c.ev(DOC);
    ok(pdfAfter.y <= pdfAfter.max && pdfAfter.max > 0, `After closing PDF viewer the page is scrollable and in range (y=${pdfAfter.y})`);
    const pdfOverlayHidden = await c.ev(`document.getElementById('pdf-overlay').hidden`);
    ok(pdfOverlayHidden, 'PDF overlay hidden after close (no scroll lock left behind)');
    for (const s of [12, 22, 16]) {
      await c.ev(`document.querySelector('[data-action="set-font-size"][data-size="${s}"]')?.click()`); await c.sleep(300);
      await c.ev(`scrollTo(0,1e7)`); await c.sleep(400); await c.ev(`scrollTo(0,1e7)`); await c.sleep(300);
      const mm = await c.ev(MEASURE);
      ok(mm.blankBelow <= 260, `Chapter 2 at ${s}px: ${mm.blankBelow}px below last content`);
    }

    console.log('\n=== S9. Nested scroll containers (only sidebar / TOC / dialogs allowed) ===');
    await c.ev(`location.hash='#chapter/ch03'`); await c.sleep(700);
    await c.viewport(1440, 900);
    const sc = await c.ev(SCROLLERS);
    const allowed = /^(ASIDE\.sidebar|ASIDE\.toc-rail|NAV\.|DIV\.toc|UL\.toc|DIV\.table|DIV\.m-scroll|PRE|DIV\.code|DIALOG)/;
    const bad = sc.filter(s => !allowed.test(s));
    ok(bad.length === 0, `No unexpected nested vertical scroll containers on Chapter 3 (found: ${J(sc)})`, J(bad));

    console.log('\n=== S10. Lazy chapter hydration does not shift layout at bottom ===');
    await c.ev(`location.hash='#chapter/ch09'`); await c.sleep(700);
    const heights = [];
    for (let i = 0; i < 4; i++) { await c.ev(`scrollTo(0,1e7)`); await c.sleep(500); heights.push((await c.ev(DOC)).docH); }
    ok(Math.abs(heights[3] - heights[2]) < 120, `Chapter 9 height settles after hydration (${heights.join(' -> ')})`);
    const m9 = await c.ev(MEASURE);
    ok(m9.blankBelow <= 260, `Chapter 9 bottom: ${m9.blankBelow}px below last content`);

    console.log('\n=== Exceptions ===');
    ok(c.exceptions.length === 0, `Zero uncaught exceptions (${c.exceptions.length})`, J(c.exceptions));
  } catch (e) {
    failures++; console.error('SUITE ERROR', e);
  } finally {
    c.close();
    console.log(failures ? `\nSCROLL REGRESSION FAILED (${failures})` : '\nALL SCROLL REGRESSION CHECKS PASSED');
    process.exit(failures ? 1 : 0);
  }
})();
