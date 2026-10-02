'use client';

import Navbar from "@/components/layout/Navbar";
import SiteLoader from '@/components/layout/SiteLoader';
import HeroSection from "@/components/sections/HeroSection";
import ProblemsSection from "@/components/sections/ProblemsSection";
import CompanyTimeline from "@/components/sections/CompanyTimeline";
import WorkSection from "@/components/sections/WorkSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <SiteLoader><div className="relative w-full min-h-screen bg-background text-foreground selection:bg-shader-fg/40 selection:text-foreground">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative w-full flex flex-col">
        <HeroSection />
        <ProblemsSection />
        <CompanyTimeline />
        <WorkSection />
        <ServicesSection />
        <FaqSection />
        <CtaSection />
      </main>
      <FooterSection />
    </div></SiteLoader>
  );
}
