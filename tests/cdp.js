/* Minimal CDP helper: launches Edge headless on the standalone file:// bundle. */
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function launch(port, opts = {}) {
  const htmlPath = path.resolve(__dirname, '..', 'DA2451_Study_App.html').replace(/\\/g, '/');
  const fileUrl = 'file:///' + encodeURI(htmlPath);
  const profileDir = path.resolve(__dirname, '..', '.tmp-cdp-' + port);
  try { fs.rmSync(profileDir, { recursive: true, force: true }); } catch (e) {}
  const browserBin = process.env.EDGE_BIN || process.env.CHROME_BIN || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
  const proc = spawn(browserBin, [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--disable-extensions', '--no-first-run',
    '--window-size=1440,900', '--user-data-dir=' + profileDir, '--remote-debugging-port=' + port, fileUrl
  ]);
  await new Promise((res, rej) => {
    proc.stderr.on('data', d => { if (d.toString().includes('DevTools listening')) res(); });
    setTimeout(() => rej(new Error('edge start timeout')), 20000);
  });
  const targets = await fetch(`http://127.0.0.1:${port}/json`).then(r => r.json());
  const page = targets.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));
  let id = 1;
  const exceptions = [];
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.method === 'Runtime.exceptionThrown') exceptions.push(m.params.exceptionDetails.text + ' ' + ((m.params.exceptionDetails.exception || {}).description || ''));
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const cur = id++;
    const l = ev => {
      const m = JSON.parse(ev.data);
      if (m.id === cur) { ws.removeEventListener('message', l); m.error ? reject(new Error(m.error.message)) : resolve(m.result); }
    };
    ws.addEventListener('message', l);
    ws.send(JSON.stringify({ id: cur, method, params }));
  });
  const ev = async expr => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error('eval error: ' + JSON.stringify(r.exceptionDetails).slice(0, 300));
    return r.result.value;
  };
  await send('Runtime.enable'); await send('Page.enable');
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  for (let i = 0; i < 60; i++) {
    const ready = await ev(`document.readyState === 'complete' && !!window.DA2451_APP`).catch(() => false);
    if (ready) break;
    await sleep(150);
  }
  const viewport = async (w, h, mobile) => {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: !!mobile });
    await send('Emulation.setTouchEmulationEnabled', { enabled: !!mobile });
    await sleep(120);
  };
  const shot = async name => {
    const dir = path.resolve(__dirname, '..', 'screenshots'); fs.mkdirSync(dir, { recursive: true });
    const r = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(dir, name), Buffer.from(r.data, 'base64'));
  };
  const close = () => { try { proc.kill(); } catch (e) {} try { fs.rmSync(profileDir, { recursive: true, force: true }); } catch (e) {} };
  const KC = { End: 35, Home: 36, PageDown: 34, PageUp: 33, ArrowDown: 40, ArrowUp: 38, ' ': 32 };
  const key = k => send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: k, code: k, windowsVirtualKeyCode: KC[k], nativeVirtualKeyCode: KC[k] })
    .then(() => send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code: k, windowsVirtualKeyCode: KC[k], nativeVirtualKeyCode: KC[k] }));
  const wheel = async (dy, x = 700, y = 400) => {
    await send('Page.bringToFront');
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y });
    await sleep(60);
    await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x, y, deltaX: 0, deltaY: dy, modifiers: 0, pointerType: 'mouse' });
    await sleep(150);
  };
  return { send, ev, sleep, viewport, shot, close, key, wheel, exceptions };
}

// Measurement snippet: how far does the document extend beyond the last real content?
const MEASURE = `(() => {
  const de = document.documentElement, b = document.body;
  const main = document.querySelector('main');
  let lastBottom = 0, lastEl = '';
  const root = main || b;
  root.querySelectorAll('*').forEach(el => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || el.closest('[hidden], .toc-rail, .sidebar, dialog, .pdf-split-pane, .pdf-overlay')) return;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    const bottom = r.bottom + window.scrollY;
    if (bottom > lastBottom) { lastBottom = bottom; lastEl = el.tagName + '.' + (el.className || '').toString().slice(0, 40); }
  });
  const sh = Math.max(de.scrollHeight, b.scrollHeight);
  return { hash: location.hash, scrollY: Math.round(window.scrollY), docScrollH: de.scrollHeight, bodyScrollH: b.scrollHeight,
    innerH: window.innerHeight, lastContentBottom: Math.round(lastBottom), lastEl,
    blankBelow: Math.round(sh - lastBottom), mainH: main ? Math.round(main.getBoundingClientRect().height) : null };
})()`;

module.exports = { launch, MEASURE };
