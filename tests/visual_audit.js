const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const htmlPath = path.resolve(__dirname, '..', 'dist', 'DA2451_Study_App.html').replace(/\\/g, '/');
const fileUrl = 'file:///' + encodeURI(htmlPath);
const profileDir = path.resolve(__dirname, '..', '.tmp-visual-profile');
const shotDir = path.resolve(__dirname, '..', 'screenshots');
if (!fs.existsSync(shotDir)) fs.mkdirSync(shotDir, { recursive: true });

try { fs.rmSync(profileDir, { recursive: true, force: true }); } catch (e) {}

const proc = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-extensions',
  '--no-first-run',
  '--window-size=1440,900',
  '--user-data-dir=' + profileDir,
  '--remote-debugging-port=9338',
  fileUrl
]);

let started = false;

proc.stderr.on('data', async d => {
  const s = d.toString();
  if (!started && s.includes('DevTools listening')) {
    started = true;
    try {
      const targets = await fetch('http://127.0.0.1:9338/json').then(r => r.json());
      const page = targets.find(t => t.type === 'page');
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      let id = 1;
      const send = (method, params = {}) => new Promise((resolve, reject) => {
        const cur = id++;
        const listener = ev => {
          const msg = JSON.parse(ev.data);
          if (msg.id === cur) {
            ws.removeEventListener('message', listener);
            if (msg.error) reject(new Error(msg.error.message));
            else resolve(msg.result);
          }
        };
        ws.addEventListener('message', listener);
        ws.send(JSON.stringify({ id: cur, method, params }));
      });

      const evalPage = async expr => {
        const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
        return r.result ? r.result.value : undefined;
      };

      async function setViewport(w, h, mobile = false) {
        await send('Emulation.setDeviceMetricsOverride', {
          width: w,
          height: h,
          deviceScaleFactor: 1,
          mobile
        });
        await new Promise(r => setTimeout(r, 100));
      }

      async function capture(name) {
        const ss = await send('Page.captureScreenshot', { format: 'png' });
        const filePath = path.join(shotDir, name);
        fs.writeFileSync(filePath, Buffer.from(ss.data, 'base64'));
        console.log(`  [CAPTURED] ${name} (${(ss.data.length / 1024).toFixed(1)} KB)`);
        return filePath;
      }

      ws.addEventListener('open', async () => {
        await send('Page.enable');
        await send('DOM.enable');
        await new Promise(r => setTimeout(r, 400));

        // 1. Permanently dismiss initial welcome dialog and set storage
        await evalPage(`(() => {
          const dlg = document.getElementById('dlg-welcome');
          if (dlg && typeof dlg.close === 'function') dlg.close();
          const state = JSON.parse(localStorage.getItem('da2451:state') || '{}');
          state.welcomeDone = true;
          localStorage.setItem('da2451:state', JSON.stringify(state));
        })()`);
        await new Promise(r => setTimeout(r, 150));

        console.log('\n=== A. Capturing About Dialog at Viewport 1440x900 (Top, Middle, Bottom) ===');
        await setViewport(1440, 900);
        await evalPage(`document.getElementById('dlg-about').showModal()`);
        await new Promise(r => setTimeout(r, 150));
        await capture('about_top_1440x900.png');

        // Scroll about body to middle
        await evalPage(`(() => {
          const b = document.querySelector('#dlg-about .dlg-editorial-body');
          if (b) b.scrollTop = 380;
        })()`);
        await new Promise(r => setTimeout(r, 100));
        await capture('about_middle_1440x900.png');

        // Scroll about body to bottom
        await evalPage(`(() => {
          const b = document.querySelector('#dlg-about .dlg-editorial-body');
          if (b) b.scrollTop = b.scrollHeight;
        })()`);
        await new Promise(r => setTimeout(r, 100));
        await capture('about_bottom_1440x900.png');

        console.log('\n=== B. Capturing About Dialog in Dark Theme ===');
        await evalPage(`document.documentElement.setAttribute('data-theme', 'dark')`);
        await evalPage(`(() => {
          const b = document.querySelector('#dlg-about .dlg-editorial-body');
          if (b) b.scrollTop = 0;
        })()`);
        await new Promise(r => setTimeout(r, 100));
        await capture('about_dark_top_1440x900.png');
        await evalPage(`document.documentElement.setAttribute('data-theme', 'light')`);

        console.log('\n=== C. Capturing About Dialog on Mobile (390x844 & 320x700) ===');
        await setViewport(390, 844, true);
        await evalPage(`(() => {
          const b = document.querySelector('#dlg-about .dlg-editorial-body');
          if (b) b.scrollTop = 0;
        })()`);
        await new Promise(r => setTimeout(r, 100));
        await capture('about_mobile_390x844.png');

        await setViewport(320, 700, true);
        await new Promise(r => setTimeout(r, 100));
        await capture('about_mobile_320x700.png');

        // Close about dialog
        await evalPage(`document.querySelector('#dlg-about .dlg-close-btn').click()`);
        await new Promise(r => setTimeout(r, 150));

        console.log('\n=== D. Capturing Sidebar across Screen Heights (900px, 700px, 600px, 500px) ===');
        // 1440x900
        await setViewport(1440, 900);
        await evalPage(`window.location.hash = '#dashboard'`);
        await new Promise(r => setTimeout(r, 100));
        await capture('sidebar_desktop_1440x900.png');

        // 1280x720
        await setViewport(1280, 720);
        await new Promise(r => setTimeout(r, 80));
        await capture('sidebar_laptop_1280x720.png');

        // 1024x768
        await setViewport(1024, 768);
        await new Promise(r => setTimeout(r, 80));
        await capture('sidebar_small_1024x768.png');

        // 1280x600 (short laptop screen)
        await setViewport(1280, 600);
        await new Promise(r => setTimeout(r, 80));
        await capture('sidebar_short_1280x600.png');

        // 1024x500 (very short screen)
        await setViewport(1024, 500);
        await new Promise(r => setTimeout(r, 80));
        await capture('sidebar_very_short_1024x500.png');

        // Scroll sidebar down at 500px
        await evalPage(`document.querySelector('.sidebar').scrollTop = 160`);
        await new Promise(r => setTimeout(r, 80));
        await capture('sidebar_scrolled_1024x500.png');
        await evalPage(`document.querySelector('.sidebar').scrollTop = 0`);

        console.log('\n=== E. Capturing Sidebar with Learning Chapters Expanded ===');
        await setViewport(1440, 900);
        await evalPage(`(() => {
          const navCh = document.querySelector('a.nav-item[href="#chapters"]');
          if (navCh) navCh.click();
          const sub = document.getElementById('nav-chapters-sublist');
          if (sub) sub.removeAttribute('hidden');
        })()`);
        await new Promise(r => setTimeout(r, 120));
        await capture('sidebar_chapters_expanded_1440x900.png');

        // Test scrolling expanded sidebar on 600px height
        await setViewport(1280, 600);
        await new Promise(r => setTimeout(r, 80));
        await capture('sidebar_chapters_expanded_1280x600_top.png');
        await evalPage(`document.querySelector('.sidebar').scrollTop = 250`);
        await new Promise(r => setTimeout(r, 80));
        await capture('sidebar_chapters_expanded_1280x600_scrolled.png');

        console.log('\n=== F. Capturing Representative Academic Reading Views ===');
        await setViewport(1440, 900);
        // Chapter 3 PCA
        await evalPage(`window.location.hash = '#chapter/ch03'`);
        await new Promise(r => setTimeout(r, 200));
        await capture('chapter_ch03_reading_1440x900.png');

        // Past Paper B23 Final 2025
        await evalPage(`window.location.hash = '#paper/b23-final-2025-10'`);
        await new Promise(r => setTimeout(r, 200));
        await capture('past_paper_b23_1440x900.png');

        // Practice Worksheet PQ01
        await evalPage(`window.location.hash = '#worksheet/pq01'`);
        await new Promise(r => setTimeout(r, 200));
        await capture('worksheet_pq01_1440x900.png');

        // Predicted MCQs
        await evalPage(`window.location.hash = '#predicted-mcqs'`);
        await new Promise(r => setTimeout(r, 200));
        await capture('predicted_mcqs_1440x900.png');

        // Dashboard Clean View
        await evalPage(`window.location.hash = '#dashboard'`);
        await new Promise(r => setTimeout(r, 150));
        await capture('dashboard_clean_1440x900.png');

        console.log('\n=== Visual Audit Captures Completed Successfully! ===');
        proc.kill();
        try { fs.rmSync(profileDir, { recursive: true, force: true }); } catch (e) {}
        process.exit(0);
      });
    } catch (e) {
      console.error(e);
      proc.kill();
      process.exit(1);
    }
  }
});
