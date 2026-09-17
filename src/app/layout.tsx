import type { Metadata } from "next";
import { khteka, suisseMono, animo } from "./fonts";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "COXVIN // System Architecture & Digital Engineering",
  description: "Coxvin designs and engineers digital systems that help businesses operate, grow, and evolve.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${khteka.variable} ${suisseMono.variable} ${animo.variable} bg-background text-foreground`}
    >
      <body className="font-body bg-background text-foreground antialiased selection:bg-shader-fg/40 selection:text-foreground">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
