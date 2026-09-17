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
  const local = await setupPage('http://localhost:3000/', 9280);

  const localFaqInfo = await local.send('Runtime.evaluate', {
    expression: `(() => {
      const f = document.querySelector("#faqs");
      return {
        top: f ? f.getBoundingClientRect().top + window.scrollY : 0,
        height: f ? f.getBoundingClientRect().height : 0
      };
    })()`,
    returnByValue: true,
  });
  const localTop = localFaqInfo.result.value.top;
  console.log('Local FAQ top:', localTop);

  // 1. Local Entry
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${localTop}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssLocalEntry = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'local-faq-entry.png'),
    Buffer.from(ssLocalEntry.data, 'base64')
  );
  console.log('Saved local-faq-entry.png');

  // 2. Local Settled (scroll down slightly so bottom contact block and rows are fully framed)
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${localTop + 150}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssLocalSettled = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'local-faq-settled.png'),
    Buffer.from(ssLocalSettled.data, 'base64')
  );
  console.log('Saved local-faq-settled.png');

  // 3. Local Hover (hover over question 01)
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${localTop}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 600));

  const localBtnCoord = await local.send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('#faq-header-0');
      const r = btn.getBoundingClientRect();
      // Also apply hover simulation
      btn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    })()`,
    returnByValue: true,
  });
  const { x: lx, y: ly } = localBtnCoord.result.value;
  await local.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: lx, y: ly });
  await new Promise((r) => setTimeout(r, 800));

  const ssLocalHover = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'local-faq-hover.png'),
    Buffer.from(ssLocalHover.data, 'base64')
  );
  console.log('Saved local-faq-hover.png');

  // 4. Local Expanded (click question 01 to expand)
  await local.send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('#faq-header-0');
      if (btn) btn.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 1000));

  const ssLocalExpanded = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'local-faq-expanded.png'),
    Buffer.from(ssLocalExpanded.data, 'base64')
  );
  console.log('Saved local-faq-expanded.png');

  local.chrome.kill();

  console.log('2. Setting up Reference...');
  const ref = await setupPage('https://bymonolog.com/', 9281);

  const refFaqInfo = await ref.send('Runtime.evaluate', {
    expression: `(() => {
      const f = document.querySelector("#faqs");
      return {
        top: f ? f.getBoundingClientRect().top + window.scrollY : 0,
        height: f ? f.getBoundingClientRect().height : 0
      };
    })()`,
    returnByValue: true,
  });
  const refTop = refFaqInfo.result.value.top;
  console.log('Reference FAQ top:', refTop);

  // 1. Ref Entry
  await ref.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${refTop}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssRefEntry = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'reference-faq-entry.png'),
    Buffer.from(ssRefEntry.data, 'base64')
  );
  console.log('Saved reference-faq-entry.png');

  // 2. Ref Settled
  await ref.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${refTop + 150}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssRefSettled = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'reference-faq-settled.png'),
    Buffer.from(ssRefSettled.data, 'base64')
  );
  console.log('Saved reference-faq-settled.png');

  // 3. Ref Hover
  await ref.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${refTop}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 600));

  const refBtnCoord = await ref.send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('.g_faq_item button');
      const r = btn.getBoundingClientRect();
      btn.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    })()`,
    returnByValue: true,
  });
  const { x: rx, y: ry } = refBtnCoord.result.value;
  await ref.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: rx, y: ry });
  await new Promise((r) => setTimeout(r, 800));

  const ssRefHover = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'reference-faq-hover.png'),
    Buffer.from(ssRefHover.data, 'base64')
  );
  console.log('Saved reference-faq-hover.png');

  // 4. Ref Expanded
  await ref.send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector('.g_faq_item button');
      if (btn) btn.click();
    })()`,
  });
  await new Promise((r) => setTimeout(r, 1000));

  const ssRefExpanded = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'reference-faq-expanded.png'),
    Buffer.from(ssRefExpanded.data, 'base64')
  );
  console.log('Saved reference-faq-expanded.png');

  ref.chrome.kill();
  console.log('All 8 FAQ QA screenshots captured successfully!');
}

capture().catch(console.error);
