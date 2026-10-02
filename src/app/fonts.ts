import localFont from 'next/font/local';

export const bolton = localFont({
  src: '../../public/fonts/BOLTON.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-bolton',
  display: 'swap',
});

export const khteka = localFont({
  src: [
    {
      path: '../../public/fonts/KHTeka-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/KHTeka-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-khteka',
  display: 'swap',
});

export const suisseMono = localFont({
  src: [
    {
      path: '../../public/fonts/SuisseIntlMono-Regular-WebXL.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-suisse-mono',
  display: 'swap',
});

export const animo = localFont({
  src: [
    {
      path: '../../public/fonts/Animo-Normal_Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-animo',
  display: 'swap',
});
