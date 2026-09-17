import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fonts = [
  {
    name: 'Animo-Normal_Regular.woff2',
    url: 'https://cdn.prod.website-files.com/68b652bbd6c64a44c8fe3e5e/68b65b9ff7f95f04c5db6845_Animo-Normal_Regular.woff2',
  },
  {
    name: 'SuisseIntlMono-Regular-WebXL.woff2',
    url: 'https://cdn.prod.website-files.com/68b652bbd6c64a44c8fe3e5e/69c69d75a0cda52c270e65bf_SuisseIntlMono-Regular-WebXL.woff2',
  },
  {
    name: 'KHTeka-Bold.woff2',
    url: 'https://cdn.prod.website-files.com/68b652bbd6c64a44c8fe3e5e/6aa0c3bf16eda4f4f4a2d77f_KHTeka-Bold.woff2',
  },
  {
    name: 'KHTeka-Medium.woff2',
    url: 'https://cdn.prod.website-files.com/68b652bbd6c64a44c8fe3e5e/6968b3919a24a99e002f91dc_KHTeka-Medium.woff2',
  },
];

const targetDir = path.resolve(__dirname, '../public/fonts');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function downloadFont(item) {
  const destination = path.join(targetDir, item.name);
  console.log(`[download-assets] Fetching ${item.name}...`);
  const res = await fetch(item.url);
  if (!res.ok) {
    throw new Error(`Failed to download ${item.name}: ${res.status} ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destination, buffer);
  console.log(`[download-assets] Saved ${item.name} (${buffer.length} bytes)`);
}

async function main() {
  for (const font of fonts) {
    await downloadFont(font);
  }
  console.log('[download-assets] All font assets successfully downloaded.');
}

main().catch((err) => {
  console.error('[download-assets] Error:', err);
  process.exit(1);
});
