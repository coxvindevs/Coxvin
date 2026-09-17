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
  const local = await setupPage('http://localhost:3000/', 9295);

  const localInfo = await local.send('Runtime.evaluate', {
    expression: `(() => {
      const f = document.querySelector("#faqs");
      const footer = document.querySelector("#contact");
      return {
        faqTop: f ? f.getBoundingClientRect().top + window.scrollY : 0,
        faqBottom: f ? f.getBoundingClientRect().bottom + window.scrollY : 0,
        footerTop: footer ? footer.getBoundingClientRect().top + window.scrollY : 0,
        footerHeight: footer ? footer.getBoundingClientRect().height : 0
      };
    })()`,
    returnByValue: true,
  });
  const { faqBottom: locFaqBottom, footerTop: locFooterTop } = localInfo.result.value;
  console.log('Local FAQ bottom / Footer top:', locFaqBottom, locFooterTop);

  // 1. Local Handoff (transition between FAQ and footer)
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${locFaqBottom - 360}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssLocHandoff = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'local-final-handoff.png'),
    Buffer.from(ssLocHandoff.data, 'base64')
  );
  console.log('Saved local-final-handoff.png');

  // 2. Local Entry (top of footer)
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${locFooterTop}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssLocEntry = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'local-final-entry.png'),
    Buffer.from(ssLocEntry.data, 'base64')
  );
  console.log('Saved local-final-entry.png');

  // 3. Local Mid
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${locFooterTop + 250}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssLocMid = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'local-final-mid.png'),
    Buffer.from(ssLocMid.data, 'base64')
  );
  console.log('Saved local-final-mid.png');

  // 4. Local Bottom
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssLocBottom = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'local-final-bottom.png'),
    Buffer.from(ssLocBottom.data, 'base64')
  );
  console.log('Saved local-final-bottom.png');

  local.chrome.kill();

  console.log('2. Setting up Reference...');
  const ref = await setupPage('https://bymonolog.com/', 9296);

  const refInfo = await ref.send('Runtime.evaluate', {
    expression: `(() => {
      const f = document.querySelector("#faqs");
      const cta = document.querySelector(".cta_home_wrap");
      const footer = document.querySelector(".footer_wrap_main");
      return {
        faqBottom: f ? f.getBoundingClientRect().bottom + window.scrollY : 0,
        ctaTop: cta ? cta.getBoundingClientRect().top + window.scrollY : 0,
        ctaHeight: cta ? cta.getBoundingClientRect().height : 0,
        footerTop: footer ? footer.getBoundingClientRect().top + window.scrollY : 0,
        footerHeight: footer ? footer.getBoundingClientRect().height : 0
      };
    })()`,
    returnByValue: true,
  });
  const { faqBottom: refFaqBottom, ctaTop: refCtaTop, footerTop: refFooterTop } = refInfo.result.value;
  console.log('Reference FAQ bottom / CTA top / Footer top:', refFaqBottom, refCtaTop, refFooterTop);

  // 1. Ref Handoff (transition between FAQ and CTA)
  await ref.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${refFaqBottom - 360}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssRefHandoff = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'reference-final-handoff.png'),
    Buffer.from(ssRefHandoff.data, 'base64')
  );
  console.log('Saved reference-final-handoff.png');

  // 2. Ref Entry (CTA section top)
  await ref.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${refCtaTop}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssRefEntry = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'reference-final-entry.png'),
    Buffer.from(ssRefEntry.data, 'base64')
  );
  console.log('Saved reference-final-entry.png');

  // 3. Ref Mid (CTA visual / awards / footer transition)
  await ref.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${refCtaTop + 800}, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1200));
  const ssRefMid = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'reference-final-mid.png'),
    Buffer.from(ssRefMid.data, 'base64')
  );
  console.log('Saved reference-final-mid.png');

  // 4. Ref Bottom (footer bottom with Three.js canvas)
  await ref.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })`,
  });
  await new Promise((r) => setTimeout(r, 1500));
  const ssRefBottom = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(
    path.join(brainDir, 'reference-final-bottom.png'),
    Buffer.from(ssRefBottom.data, 'base64')
  );
  console.log('Saved reference-final-bottom.png');

  ref.chrome.kill();
  console.log('All 8 audit screenshots captured successfully!');
}

capture().catch(console.error);
