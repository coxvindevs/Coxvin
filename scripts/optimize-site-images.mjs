import { readdir, mkdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

// Preserve originals; runtime references use these bounded WebP derivatives.
let before = 0;
let after = 0;
for (const folder of ['digital-marquee', 'project-previews']) {
  const source = join('public/images', folder);
  const output = join('public/images/optimized', folder);
  await mkdir(output, { recursive: true });
  for (const name of await readdir(source)) {
    if (!/\.(png|jpe?g|webp)$/i.test(name)) continue;
    const input = join(source, name);
    const destination = join(output, name.replace(/\.[^.]+$/, '.webp'));
    await sharp(input).resize({ width: 1360, withoutEnlargement: true }).webp({ quality: 84 }).toFile(destination);
    before += (await stat(input)).size;
    after += (await stat(destination)).size;
  }
}
console.log(JSON.stringify({ originalBytes: before, optimizedBytes: after, reductionPercent: Math.round((1 - after / before) * 100) }));
