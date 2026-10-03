import type { Metadata } from "next";
import { khteka, suisseMono, animo, bolton } from "./fonts";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import AboutProvider from '@/components/layout/AboutProvider';
import {
  OG_IMAGE,
  OG_IMAGE_ALT,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  structuredData,
} from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  // Google defaults to a small image preview and truncates snippets; these opt into
  // the larger preview and full-length snippet used in Discover and rich results.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-light.png', sizes: '48x48', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.png', sizes: '48x48', type: 'image/png', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en_US',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${khteka.variable} ${suisseMono.variable} ${animo.variable} ${bolton.variable} bg-background text-foreground`}
    >
      <body className="font-sans bg-background text-foreground antialiased selection:bg-shader-fg/40 selection:text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SmoothScrollProvider>
          <AboutProvider>{children}</AboutProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
