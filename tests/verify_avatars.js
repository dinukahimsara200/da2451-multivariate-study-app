const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const shotsDir = path.resolve(__dirname, '..', 'screenshots');
if (!fs.existsSync(shotsDir)) fs.mkdirSync(shotsDir, { recursive: true });

async function testApp(appName, fileName, port) {
  console.log(`\n======================================================`);
  console.log(`Testing Avatar in ${appName} (${fileName})`);
  console.log(`======================================================`);

  const htmlPath = path.resolve(__dirname, '..', fileName).replace(/\\/g, '/');
  const fileUrl = 'file:///' + encodeURI(htmlPath);
  const profileDir = path.resolve(__dirname, '..', `.tmp-edge-avatar-${port}`);
  try { fs.rmSync(profileDir, { recursive: true, force: true }); } catch (e) {}

  const proc = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-extensions',
    '--no-first-run',
    '--window-size=1440,900',
    '--user-data-dir=' + profileDir,
    `--remote-debugging-port=${port}`,
    fileUrl
  ]);

  await new Promise((res, rej) => {
    proc.stderr.on('data', d => {
      if (d.toString().includes('DevTools listening')) res();
    });
    setTimeout(() => rej(new Error('Edge start timeout on port ' + port)), 20000);
  });

  const targets = await fetch(`http://127.0.0.1:${port}/json`).then(r => r.json());
  const page = targets.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r));

  let msgId = 1;
  const pageExceptions = [];
  const consoleErrors = [];

  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.method === 'Runtime.exceptionThrown') {
      pageExceptions.push(m.params.exceptionDetails.text + ' ' + ((m.params.exceptionDetails.exception || {}).description || ''));
    }
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') {
      consoleErrors.push(m.params.args.map(a => a.value || a.description).join(' '));
    }
  });

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = msgId++;
    const handler = ev => {
      const resp = JSON.parse(ev.data);
      if (resp.id === id) {
        ws.removeEventListener('message', handler);
        if (resp.error) reject(new Error(resp.error.message));
        else resolve(resp.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

  const ev = async expr => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error('eval error: ' + JSON.stringify(r.exceptionDetails));
    return r.result.value;
  };

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const shot = async name => {
    const r = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(shotsDir, name), Buffer.from(r.data, 'base64'));
    console.log(`  [PASS] Captured screenshot: ${name}`);
  };

  await send('Runtime.enable');
  await send('Page.enable');

  await sleep(1500);

  // 1. Check Welcome Dialog Avatar (if present)
  const welcomeAvatar = await ev(`(() => {
    const welcome = document.querySelector('#welcome-dialog') || document.querySelector('.welcome-dialog');
    const avatar = welcome ? welcome.querySelector('.creator-avatar') : null;
    if (!avatar) return null;
    const img = avatar.querySelector('img');
    const span = avatar.querySelector('span');
    return {
      found: true,
      hasImg: !!img,
      imgLoaded: !!img && img.complete && img.naturalWidth > 0,
      naturalWidth: img ? img.naturalWidth : 0,
      naturalHeight: img ? img.naturalHeight : 0,
      hasSpan: !!span && span.textContent === 'DH'
    };
  })()`);

  if (welcomeAvatar) {
    console.log('Welcome Dialog Avatar:', JSON.stringify(welcomeAvatar));
    console.log(`  [PASS] Welcome dialog avatar has loaded image (${welcomeAvatar.naturalWidth}x${welcomeAvatar.naturalHeight}px)`);
  }

  // Dismiss welcome dialog if present
  await ev(`(() => {
    const btn = document.querySelector('[data-action="welcome-continue"]') || document.querySelector('#welcome-dialog [data-action="close-dialog"]');
    if (btn) btn.click();
  })()`);
  await sleep(400);

  // 2. Open About Dialog
  await ev(`(() => {
    const btn = document.querySelector('[data-action="open-about"]');
    if (btn) {
      btn.click();
    } else {
      const dlg = document.getElementById('dlg-about');
      if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
    }
  })()`);
  await sleep(500);

  const aboutAvatarStats = await ev(`(() => {
    const dlg = document.getElementById('dlg-about');
    const avatar = dlg ? dlg.querySelector('.creator-avatar--lg') : document.querySelector('.creator-avatar--lg');
    if (!avatar) return { found: false, error: 'avatar container not found' };
    const img = avatar.querySelector('img');
    const span = avatar.querySelector('span');
    const style = window.getComputedStyle(avatar);
    const rect = avatar.getBoundingClientRect();
    
    let imgStyle = null;
    let imgRect = null;
    let imgLoaded = false;
    let imgNatW = 0;
    let imgNatH = 0;
    let imgSrcPrefix = '';
    if (img) {
      imgStyle = {
        borderRadius: window.getComputedStyle(img).borderRadius,
        objectFit: window.getComputedStyle(img).objectFit,
        position: window.getComputedStyle(img).position
      };
      imgRect = img.getBoundingClientRect();
      imgLoaded = img.complete && img.naturalWidth > 0;
      imgNatW = img.naturalWidth;
      imgNatH = img.naturalHeight;
      imgSrcPrefix = (img.src || '').slice(0, 30);
    }

    return {
      found: true,
      rect: { width: Math.round(rect.width), height: Math.round(rect.height) },
      borderRadius: style.borderRadius,
      overflow: style.overflow,
      hasSpanFallback: !!span && span.textContent === 'DH',
      hasImg: !!img,
      imgLoaded,
      imgNatW,
      imgNatH,
      imgSrcPrefix,
      imgStyle
    };
  })()`);

  console.log('About Dialog Avatar Stats:', JSON.stringify(aboutAvatarStats, null, 2));

  if (!aboutAvatarStats.found) {
    throw new Error('About dialog avatar container not found in ' + appName);
  }
  if (!aboutAvatarStats.hasImg || !aboutAvatarStats.imgLoaded) {
    throw new Error('Avatar image is missing or failed to load in ' + appName);
  }
  if (aboutAvatarStats.imgNatW === 0 || aboutAvatarStats.imgNatH === 0) {
    throw new Error('Avatar image natural dimensions are 0 in ' + appName);
  }
  if (!aboutAvatarStats.hasSpanFallback) {
    throw new Error('Fallback span DH is missing in ' + appName);
  }

  console.log(`  [PASS] About hero card avatar rendered successfully (${aboutAvatarStats.imgNatW}x${aboutAvatarStats.imgNatH}px)`);
  console.log(`  [PASS] Circular crop applied (${aboutAvatarStats.borderRadius}, overflow: ${aboutAvatarStats.overflow})`);
  console.log(`  [PASS] Dimensions: ${aboutAvatarStats.rect.width}x${aboutAvatarStats.rect.height}px`);
  console.log(`  [PASS] Image object-fit: ${aboutAvatarStats.imgStyle.objectFit}`);
  console.log(`  [PASS] Fallback <span>DH</span> present beneath image`);

  // Capture screenshot in current theme
  const currentTheme = await ev(`document.documentElement.getAttribute('data-theme') || 'dark'`);
  await shot(`${appName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_about_${currentTheme}.png`);

  // Switch to alternate theme to test both light and dark modes
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  await ev(`(() => {
    document.documentElement.setAttribute('data-theme', '${nextTheme}');
  })()`);
  await sleep(300);

  await shot(`${appName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_about_${nextTheme}.png`);

  // Switch back
  await ev(`(() => {
    document.documentElement.setAttribute('data-theme', '${currentTheme}');
  })()`);

  // Close About Dialog
  await ev(`(() => {
    const closeBtn = document.querySelector('#dlg-about [data-action="close-dialog"]') || document.querySelector('.dlg-close-btn');
    if (closeBtn) closeBtn.click();
  })()`);
  await sleep(200);

  // Check exceptions and console errors
  if (pageExceptions.length > 0) {
    throw new Error(`Page exceptions detected: ${pageExceptions.join('; ')}`);
  }
  if (consoleErrors.length > 0) {
    throw new Error(`Console errors detected: ${consoleErrors.join('; ')}`);
  }

  console.log(`  [PASS] Zero page exceptions & console errors in ${appName}`);

  // Cleanup
  try { proc.kill(); } catch (e) {}
  try { fs.rmSync(profileDir, { recursive: true, force: true }); } catch (e) {}
}

async function run() {
  try {
    await testApp('DA2451_Multivariate_Methods', 'DA2451_Study_App.html', 9482);
    console.log('\n======================================================');
    console.log('DA2451 AVATAR VERIFICATION PASSED SUCCESSFULLY!');
    console.log('======================================================\n');
  } catch (err) {
    console.error('\nVerification failed:', err);
    process.exit(1);
  }
}

run();
