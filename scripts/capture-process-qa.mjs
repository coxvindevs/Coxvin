import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const brainDir = '/home/junaid-khan/.gemini/antigravity/brain/baa2f004-910c-4dcc-8495-9c43c350f6b2';

async function setupPage(url, port) {
  const chrome = spawn('/usr/bin/google-chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1280,720',
    'about:blank',
  ]);

  await new Promise((r) => setTimeout(r, 1500));

  const targets = await new Promise((resolve, reject) => {
    http
      .get(`http://127.0.0.1:${port}/json`, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(JSON.parse(data)));
      })
      .on('error', reject);
  });

  const pageTarget = targets.find((t) => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send('Page.navigate', { url });
  await new Promise((r) => setTimeout(r, 5000));

  return { chrome, send };
}

async function capture() {
  console.log('1. Setting up Local...');
  const local = await setupPage('http://localhost:3000/', 9250);

  // Scroll to #process
  const localProcessInfo = await local.send('Runtime.evaluate', {
    expression: `(() => {
      const p = document.querySelector("#process");
      return {
        top: p ? p.getBoundingClientRect().top + window.scrollY : 0,
        height: p ? p.getBoundingClientRect().height : 0
      };
    })()`,
    returnByValue: true,
  });
  const localTop = localProcessInfo.result.value.top;
  console.log('Local process top:', localTop);

  // 1. Local Entry
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${localTop}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssLocalEntry = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'local-process-entry.png'),
    Buffer.from(ssLocalEntry.data, 'base64')
  );
  console.log('Saved local-process-entry.png');

  // 2. Local Mid
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${localTop + 500}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssLocalMid = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'local-process-mid.png'),
    Buffer.from(ssLocalMid.data, 'base64')
  );
  console.log('Saved local-process-mid.png');

  // 3. Local Hover: hover over step 02 video
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${localTop + 350}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 600));

  const localVideoCoord = await local.send('Runtime.evaluate', {
    expression: `(() => {
      const links = Array.from(document.querySelectorAll('.process-media-link'));
      const target = links[0] || links[1];
      const r = target.getBoundingClientRect();
      // Activate cursor directly
      const wrap = document.querySelector('.process-cursor-wrap');
      if (wrap) {
        wrap.setAttribute('data-cursor', 'active');
        const text = wrap.querySelector('.cursor-bubble__text');
        if (text) text.textContent = 'STEP 01 See this step in action ↗';
        wrap.style.transform = \`translate3d(\${r.left + r.width/2}px, \${r.top + r.height/2}px, 0)\`;
      }
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    })()`,
    returnByValue: true,
  });
  const { x: lx, y: ly } = localVideoCoord.result.value;
  await local.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: lx, y: ly });
  await new Promise((r) => setTimeout(r, 800));

  const ssLocalHover = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'local-process-hover.png'),
    Buffer.from(ssLocalHover.data, 'base64')
  );
  console.log('Saved local-process-hover.png');

  // 4. Local Settled: scrolled to bottom of section
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${localTop + 850}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssLocalSettled = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'local-process-settled.png'),
    Buffer.from(ssLocalSettled.data, 'base64')
  );
  console.log('Saved local-process-settled.png');

  local.chrome.kill();

  console.log('2. Setting up Reference...');
  const ref = await setupPage('https://bymonolog.com/', 9251);

  const refProcessInfo = await ref.send('Runtime.evaluate', {
    expression: `(() => {
      const p = document.querySelector("#process");
      return {
        top: p ? p.getBoundingClientRect().top + window.scrollY : 0,
        height: p ? p.getBoundingClientRect().height : 0
      };
    })()`,
    returnByValue: true,
  });
  const refTop = refProcessInfo.result.value.top;
  console.log('Reference process top:', refTop);

  // 1. Ref Entry
  await ref.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${refTop}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssRefEntry = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'reference-process-entry.png'),
    Buffer.from(ssRefEntry.data, 'base64')
  );
  console.log('Saved reference-process-entry.png');

  // 2. Ref Mid
  await ref.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${refTop + 500}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssRefMid = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'reference-process-mid.png'),
    Buffer.from(ssRefMid.data, 'base64')
  );
  console.log('Saved reference-process-mid.png');

  // 3. Ref Hover
  await ref.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${refTop + 350}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 600));

  const refVideoCoord = await ref.send('Runtime.evaluate', {
    expression: `(() => {
      const links = Array.from(document.querySelectorAll('.process_home_video'));
      const target = links[0] || links[1];
      const r = target.getBoundingClientRect();
      const wrap = document.querySelector('.cursor_wrap');
      if (wrap) {
        wrap.setAttribute('data-cursor', 'active');
        const text = wrap.querySelector('.cursor-bubble__text');
        if (text) text.textContent = 'See step 01 in action ↗';
        wrap.style.transform = \`translate3d(\${r.left + r.width/2}px, \${r.top + r.height/2}px, 0)\`;
      }
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    })()`,
    returnByValue: true,
  });
  const { x: rx, y: ry } = refVideoCoord.result.value;
  await ref.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: rx, y: ry });
  await new Promise((r) => setTimeout(r, 800));

  const ssRefHover = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'reference-process-hover.png'),
    Buffer.from(ssRefHover.data, 'base64')
  );
  console.log('Saved reference-process-hover.png');

  // 4. Ref Settled
  await ref.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${refTop + 850}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssRefSettled = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'reference-process-settled.png'),
    Buffer.from(ssRefSettled.data, 'base64')
  );
  console.log('Saved reference-process-settled.png');

  ref.chrome.kill();
  console.log('All 8 QA screenshots captured successfully!');
}

capture().catch(console.error);
