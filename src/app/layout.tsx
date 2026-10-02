import type { Metadata } from "next";
import { khteka, suisseMono, animo, bolton } from "./fonts";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import AboutProvider from '@/components/layout/AboutProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://coxvin.com'),
  title: "COXVIN",
  description: "Coxvin designs and engineers digital systems that help businesses operate, grow, and evolve.",
  alternates: { canonical: '/' },
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
    siteName: 'Coxvin',
    title: 'COXVIN - System Architecture & Digital Engineering',
    description: 'Coxvin designs and engineers digital systems that help businesses operate, grow, and evolve.',
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
        <SmoothScrollProvider>
          <AboutProvider>{children}</AboutProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
