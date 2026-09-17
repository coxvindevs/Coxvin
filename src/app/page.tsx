'use client';

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ProblemsSection from "@/components/sections/ProblemsSection";
import GapSection from "@/components/sections/GapSection";
import WorkSection from "@/components/sections/WorkSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-background text-foreground selection:bg-shader-fg/40 selection:text-foreground">
      <Navbar />
      <main className="relative w-full flex flex-col">
        <HeroSection />
        <ProblemsSection />
        <GapSection />
        <WorkSection />
        <ServicesSection />
        <ProcessSection />
        <FaqSection />
        <CtaSection />
      </main>
      <FooterSection />
    </div>
  );
}
