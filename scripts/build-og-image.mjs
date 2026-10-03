import sharp from 'sharp';

// Social crawlers need an opaque raster card. The wordmark PNGs are transparent,
// so they are flattened onto the site's own background token (#080807).
const WIDTH = 1200;
const HEIGHT = 630;
const WORDMARK_WIDTH = 760;

const wordmark = await sharp('public/images/coxvin-wordmark-light.png')
  .resize({ width: WORDMARK_WIDTH })
  .toBuffer();
const { height = 0 } = await sharp(wordmark).metadata();

await sharp({ create: { width: WIDTH, height: HEIGHT, channels: 4, background: '#080807' } })
  .composite([{
    input: wordmark,
    top: Math.round((HEIGHT - height) / 2),
    left: Math.round((WIDTH - WORDMARK_WIDTH) / 2),
  }])
  .png()
  .toFile('public/images/og-cover.png');

console.log(`Wrote public/images/og-cover.png (${WIDTH}x${HEIGHT})`);
