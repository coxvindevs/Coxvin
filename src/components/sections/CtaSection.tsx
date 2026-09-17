'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Background Image Parallax: 0 -> -150px
  useGSAP(
    () => {
      if (!sectionRef.current || !bgImageRef.current) return;

      gsap.fromTo(
        bgImageRef.current,
        { y: 0 },
        {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  // Magnetic Button Proximity Behavior (pointer: fine only)
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      // Proximity threshold ~120px
      if (dist < 120) {
        const deltaX = (e.clientX - btnCenterX) * 0.16;
        const deltaY = (e.clientY - btnCenterY) * 0.16;
        const clampX = Math.max(-8, Math.min(8, deltaX));
        const clampY = Math.max(-8, Math.min(8, deltaY));
        xTo(clampX);
        yTo(clampY);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="closing-cta"
      ref={sectionRef}
      className="relative w-full min-h-[1630.53px] lg:h-[1630.53px] bg-[#080807] text-[#E8E8E3] overflow-hidden z-[2] select-none flex flex-col justify-between"
    >
      {/* Background Media Layer (.cta-cover) */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div
          ref={bgImageRef}
          className="relative w-full h-[calc(100%+300px)] top-0 left-0"
        >
          <Image
            src="/images/closing-cta/cta-bg-loom.webp"
            alt="Coxvin System Engineering Loom Background"
            fill
            sizes="100vw"
            priority={false}
            className="object-cover object-center filter grayscale contrast-[1.18] brightness-[0.82]"
          />
        </div>

        {/* Dark Vignette & Gradient Overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(180deg, rgba(8, 8, 7, 0.32) 0%, rgba(8, 8, 7, 0.52) 32%, rgba(8, 8, 7, 0.78) 64%, #080807 100%)',
          }}
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 35%, rgba(8, 8, 7, 0.6) 100%)',
          }}
        />
      </div>

      {/* Accessible Screen-Reader Heading */}
      <h2 className="sr-only">
        Ready to build the system your business needs next?
      </h2>

      {/* Content Layer (Top / Main Editorial crescendo) */}
      <div className="relative z-[2] w-full max-w-[1280px] mx-auto px-6 pt-[155px] md:pt-[180px] lg:pt-[195px] flex flex-col items-start">
        {/* 4-Line Display Stack */}
        <div
          className="flex flex-col uppercase tracking-[-0.03em] leading-[0.9] text-[clamp(3.5rem,10.23vw,131px)] font-medium font-sans text-[#E8E8E3]"
          aria-hidden="true"
        >
          <div>Let&apos;s build</div>
          <div>the system</div>
          <div>your business</div>
          <div className="flex items-center gap-[0.2em]">
            <span className="inline-block text-[0.88em] leading-none">→</span>
            <span>needs next</span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="mt-10 md:mt-12">
          <Link
            ref={buttonRef}
            href="#contact"
            className="group relative inline-flex items-center gap-4 px-7 py-3.5 rounded-full bg-[#E8E8E3] text-[#080807] transition-all duration-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#E8E8E3]/50 text-[13px] font-sans font-medium uppercase tracking-[0.02em]"
          >
            <span>Tell us what you&apos;re building</span>
            <span className="relative w-7 h-7 rounded-full bg-[#080807] text-[#E8E8E3] flex items-center justify-center overflow-hidden flex-shrink-0">
              {/* Default Arrow */}
              <svg
                className="w-3.5 h-3.5 absolute transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.35,1)] group-hover:translate-x-[140%] group-hover:-translate-y-[140%]"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* Duplicate Diagonal Arrow entering on hover */}
              <svg
                className="w-3.5 h-3.5 absolute -translate-x-[140%] translate-y-[140%] transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.35,1)] group-hover:translate-x-0 group-hover:translate-y-0"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom Proof / Credential Area */}
      <div className="relative z-[2] w-full max-w-[1280px] mx-auto px-6 pb-28 md:pb-36 mt-auto flex flex-col items-center">
        {/* Title */}
        <div className="text-[11px] font-mono tracking-[0.25em] text-[#E8E8E3]/60 uppercase mb-8 text-center">
          SELECTED CAPABILITIES
        </div>

        {/* 3 Truthful Capability Proof Markers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 w-full max-w-[960px] mb-10">
          {/* Capability 01: DIGITAL EXPERIENCES */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full border border-[#E8E8E3]/25 flex items-center justify-center mb-4 transition-colors duration-500 group-hover:border-[#E8E8E3]/50 bg-[#080807]/50 backdrop-blur-sm shadow-sm">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                stroke="currentColor"
                className="text-[#E8E8E3]/90 transition-transform duration-500 group-hover:scale-105"
              >
                <circle cx="14" cy="14" r="11" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="14" cy="14" r="6" strokeWidth="1.2" />
                <line x1="14" y1="2" x2="14" y2="26" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="2" y1="14" x2="26" y2="14" strokeWidth="0.8" strokeOpacity="0.4" />
              </svg>
            </div>
            <div className="text-[11px] font-mono text-[#E8E8E3]/40 tracking-wider mb-1">
              [ DOMAIN — 01 ]
            </div>
            <div className="text-[13px] font-mono font-medium tracking-[0.14em] text-[#E8E8E3] uppercase">
              DIGITAL EXPERIENCES
            </div>
          </div>

          {/* Capability 02: PRODUCT ENGINEERING */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full border border-[#E8E8E3]/25 flex items-center justify-center mb-4 transition-colors duration-500 group-hover:border-[#E8E8E3]/50 bg-[#080807]/50 backdrop-blur-sm shadow-sm">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                stroke="currentColor"
                className="text-[#E8E8E3]/90 transition-transform duration-500 group-hover:scale-105"
              >
                <polygon
                  points="14 3, 24 8.7, 24 20, 14 25.7, 4 20, 4 8.7"
                  strokeWidth="1.2"
                />
                <line x1="14" y1="3" x2="14" y2="25.7" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="4" y1="8.7" x2="24" y2="20" strokeWidth="0.8" strokeOpacity="0.4" />
                <line x1="24" y1="8.7" x2="4" y2="20" strokeWidth="0.8" strokeOpacity="0.4" />
              </svg>
            </div>
            <div className="text-[11px] font-mono text-[#E8E8E3]/40 tracking-wider mb-1">
              [ DOMAIN — 02 ]
            </div>
            <div className="text-[13px] font-mono font-medium tracking-[0.14em] text-[#E8E8E3] uppercase">
              PRODUCT ENGINEERING
            </div>
          </div>

          {/* Capability 03: AI & AUTOMATION */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full border border-[#E8E8E3]/25 flex items-center justify-center mb-4 transition-colors duration-500 group-hover:border-[#E8E8E3]/50 bg-[#080807]/50 backdrop-blur-sm shadow-sm">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                stroke="currentColor"
                className="text-[#E8E8E3]/90 transition-transform duration-500 group-hover:scale-105"
              >
                <circle cx="14" cy="14" r="3" strokeWidth="1.2" />
                <circle cx="6" cy="10" r="2" strokeWidth="1" />
                <circle cx="22" cy="10" r="2" strokeWidth="1" />
                <circle cx="9" cy="21" r="2" strokeWidth="1" />
                <circle cx="19" cy="21" r="2" strokeWidth="1" />
                <line x1="6" y1="10" x2="14" y2="14" strokeWidth="0.8" strokeOpacity="0.5" />
                <line x1="22" y1="10" x2="14" y2="14" strokeWidth="0.8" strokeOpacity="0.5" />
                <line x1="9" y1="21" x2="14" y2="14" strokeWidth="0.8" strokeOpacity="0.5" />
                <line x1="19" y1="21" x2="14" y2="14" strokeWidth="0.8" strokeOpacity="0.5" />
              </svg>
            </div>
            <div className="text-[11px] font-mono text-[#E8E8E3]/40 tracking-wider mb-1">
              [ DOMAIN — 03 ]
            </div>
            <div className="text-[13px] font-mono font-medium tracking-[0.14em] text-[#E8E8E3] uppercase">
              AI & AUTOMATION
            </div>
          </div>
        </div>

        {/* Restrained Architectural Endorsement Statement */}
        <div className="text-center max-w-[620px] pt-4">
          <p className="text-[14px] md:text-[15px] font-sans text-[#E8E8E3]/85 tracking-wide leading-relaxed">
            &ldquo;Engineered systems designed for brand authority, transactional resilience, and conversion velocity.&rdquo;
          </p>
          <div className="text-[10px] font-mono tracking-[0.2em] text-[#E8E8E3]/45 uppercase mt-3">
            — CORE SYSTEM SPECIFICATIONS &amp; PRODUCTION CAPABILITIES
          </div>
        </div>
      </div>
    </section>
  );
}
