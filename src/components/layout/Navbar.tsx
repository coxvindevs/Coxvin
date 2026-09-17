'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);

try {
  CustomEase.create('ease-transition', '0.22, 1, 0.36, 1');
} catch {
  // registered
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const updateTheme = () => {
      const lightSection = document.querySelector<HTMLElement>('[data-theme-section="light"]');
      if (lightSection) {
        const rect = lightSection.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom > 0) {
          setTheme('light');
          return;
        }
      }
      setTheme('dark');
    };

    window.addEventListener('scroll', updateTheme, { passive: true });
    window.addEventListener('resize', updateTheme, { passive: true });
    updateTheme();

    const st = ScrollTrigger.create({
      trigger: '#work',
      start: 'top top',
      end: 'bottom top',
      onEnter: () => setTheme('light'),
      onLeave: () => setTheme('dark'),
      onEnterBack: () => setTheme('light'),
      onLeaveBack: () => setTheme('dark'),
    });

    return () => {
      window.removeEventListener('scroll', updateTheme);
      window.removeEventListener('resize', updateTheme);
      st.kill();
    };
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        '.nav-item',
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1.075,
          stagger: 0.0625,
          ease: 'ease-transition',
          delay: 0.1,
        }
      );
    },
    { scope: navRef }
  );

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 h-[79px] flex items-center justify-between px-6 bg-transparent select-none"
    >
      {/* Left: Coxvin Logo at 24px */}
      <div className="flex items-center overflow-hidden">
        <Link
          href="/"
          className={`nav-item inline-block font-sans font-bold text-lg md:text-xl tracking-tighter transition-colors duration-300 ${
            theme === 'light'
              ? 'text-[#080807] hover:opacity-70'
              : 'text-[#E8E8E3] hover:opacity-80'
          }`}
        >
          COXVIN
        </Link>
      </div>

      {/* Center: Nav-Links Group positioned at true horizontal center of viewport */}
      <nav className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-6 md:space-x-8 font-mono text-xs uppercase tracking-widest pointer-events-auto">
        <div className="overflow-hidden">
          <Link
            href="#work"
            className={`nav-item inline-block transition-colors duration-300 ${
              theme === 'light'
                ? 'text-[#080807]/60 hover:text-[#080807]'
                : 'text-[#E8E8E3] hover:opacity-75'
            }`}
          >
            [ Work ]
          </Link>
        </div>
        <div className="overflow-hidden">
          <Link
            href="#process"
            className={`nav-item inline-block transition-colors duration-300 ${
              theme === 'light'
                ? 'text-[#080807]/60 hover:text-[#080807]'
                : 'text-[#E8E8E3] hover:opacity-75'
            }`}
          >
            [ Philosophy ]
          </Link>
        </div>
        <div className="overflow-hidden">
          <Link
            href="#services"
            className={`nav-item inline-block transition-colors duration-300 ${
              theme === 'light'
                ? 'text-[#080807]/60 hover:text-[#080807]'
                : 'text-[#E8E8E3] hover:opacity-75'
            }`}
          >
            [ Systems ]
          </Link>
        </div>
        <div className="overflow-hidden">
          <Link
            href="#contact"
            className={`nav-item inline-block transition-colors duration-300 ${
              theme === 'light'
                ? 'text-[#080807]/60 hover:text-[#080807]'
                : 'text-[#E8E8E3] hover:opacity-75'
            }`}
          >
            [ Contact ]
          </Link>
        </div>
      </nav>

      {/* Right: Restrained CTA matching reference role */}
      <div className="flex items-center overflow-hidden">
        <Link
          href="#contact"
          className={`nav-item inline-flex items-center space-x-1.5 font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 transition-all duration-300 ${
            theme === 'light'
              ? 'text-[#080807] border-[#080807]/20 bg-[#080807]/[0.04] hover:bg-[#080807] hover:text-[#E8E8E3] hover:border-[#080807]'
              : 'text-[#E8E8E3] border-border-subtle bg-surface-dark/60 hover:bg-white hover:text-background hover:border-white'
          }`}
        >
          <span>LET&apos;S BUILD</span>
          <span>↗</span>
        </Link>
      </div>
    </header>
  );
}
