import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const svg = await readFile('public/favicon.svg', 'utf8');
const light = svg.replace(/<style>[\s\S]*?<\/style>/, '<style>.mark{fill:#101010}</style>');
const dark = svg.replace(/<style>[\s\S]*?<\/style>/, '<style>.mark{fill:#f5f5f5}</style>');
for (const [theme, source] of [['light', light], ['dark', dark]]) {
  await sharp(Buffer.from(source)).resize(48, 48).png().toFile(`public/favicon-${theme}.png`);
}
await sharp(Buffer.from(light)).resize(180, 180).flatten({ background: '#f5f5f5' }).png().toFile('public/apple-touch-icon.png');

// ICO supports embedded PNG frames; an opaque light tile works on either tab theme.
const frames = await Promise.all([16, 32, 48].map(size => sharp(Buffer.from(light)).resize(size, size).flatten({ background: '#f5f5f5' }).png().toBuffer()));
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((frame, index) => {
  const entry = 6 + index * 16;
  header[entry] = header[entry + 1] = [16, 32, 48][index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(frame.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
await writeFile('src/app/favicon.ico', Buffer.concat([header, ...frames]));
