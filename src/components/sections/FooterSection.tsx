'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import FooterHalftoneField from '@/components/canvas/FooterHalftoneField';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ENCODED_AI_QUERY = encodeURIComponent(
  "Evaluate Coxvin (coxvin.com) as a technology partner for a business that needs digital experiences, product engineering, business systems, AI and automation, or systems integration. Summarize its positioning, capabilities, likely fit, and the questions I should ask before starting an engagement."
);

const AI_PROVIDERS = [
  {
    name: 'Claude',
    href: `https://claude.ai/new?q=${ENCODED_AI_QUERY}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" opacity="0.2"/>
        <path d="M12 4.5l1.6 4.9 5.1.4-3.9 3.3 1.2 5-4-2.6-4 2.6 1.2-5-3.9-3.3 5.1-.4L12 4.5z" />
      </svg>
    ),
  },
  {
    name: 'Gemini',
    href: `https://www.google.com/search?udm=50&aep=11&q=${ENCODED_AI_QUERY}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C12 7.52 7.52 12 2 12c5.48 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10z" />
      </svg>
    ),
  },
  {
    name: 'ChatGPT',
    href: `https://chatgpt.com/?q=${ENCODED_AI_QUERY}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.5 10.5c-.3-1.6-1.5-2.8-3.1-3.2-.4-.8-1.1-1.5-1.9-1.9-1.6-.8-3.5-.5-4.8.7-1-.6-2.2-.8-3.4-.4-1.5.4-2.6 1.7-2.9 3.2-1.3.6-2.1 1.9-2.1 3.4 0 1.2.6 2.3 1.5 3 .3 1.6 1.5 2.8 3.1 3.2.4.8 1.1 1.5 1.9 1.9 1.6.8 3.5.5 4.8-.7 1 .6 2.2.8 3.4.4 1.5-.4 2.6-1.7 2.9-3.2 1.3-.6 2.1-1.9 2.1-3.4 0-1.2-.6-2.3-1.5-3zM12 14.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    name: 'Grok',
    href: `https://grok.com/?q=${ENCODED_AI_QUERY}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Perplexity',
    href: `https://www.perplexity.ai/search?q=${ENCODED_AI_QUERY}`,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2zm0 2.8l5.5 3.1-5.5 3.1-5.5-3.1L12 4.8zM6 8.6l5 2.8v5.8l-5-2.8V8.6zm7 8.6v-5.8l5-2.8v5.8l-5 2.8z" />
      </svg>
    ),
  },
];

const NAV_ROWS = [
  { label: 'About', href: '#overview' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Services', href: '#services' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
];

export default function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const infoWrapRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const termLogoRef = useRef<HTMLDivElement>(null);
  const termMottoRef = useRef<HTMLDivElement>(null);
  const eyebrowWordRef = useRef<HTMLSpanElement>(null);
  const eyebrowCircleRef = useRef<HTMLSpanElement>(null);

  // Live Local Time State (Asia/Karachi)
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // 12-hour time with AM/PM for Asia/Karachi
      const timeFormatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);

      // Date formatted as: Weekday, Mon DD, YYYY
      const dateFormatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Karachi',
        weekday: 'long',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }).format(now);

      setTimeStr(timeFormatted);
      setDateStr(dateFormatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animations & ScrollTriggers
  useGSAP(
    () => {
      if (!footerRef.current) return;

      // 1. Eyebrow Reveal
      if (eyebrowWordRef.current && eyebrowCircleRef.current) {
        gsap.fromTo(
          eyebrowWordRef.current,
          { xPercent: -40, opacity: 0, skewX: 15 },
          {
            xPercent: 0,
            opacity: 1,
            skewX: 0,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );

        gsap.fromTo(
          eyebrowCircleRef.current,
          { scale: 0.4, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }

      // 2. Info Wrapper Scroll Scrub: yPercent: -15 -> 0
      if (infoWrapRef.current) {
        gsap.fromTo(
          infoWrapRef.current,
          { yPercent: -15 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'clamp(top bottom)',
              end: 'clamp(top top)',
              scrub: true,
            },
          }
        );
      }

      // 3. Dark Overlay Scrub: opacity: 0.5 -> 0
      if (darkOverlayRef.current) {
        gsap.fromTo(
          darkOverlayRef.current,
          { opacity: 0.5 },
          {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'clamp(top bottom)',
              end: 'clamp(top top)',
              scrub: true,
            },
          }
        );
      }

      // 4. Terminal Field Scrub: yPercent: -80 -> 0
      if (terminalRef.current) {
        gsap.fromTo(
          terminalRef.current,
          { yPercent: -80 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: terminalRef.current,
              start: 'clamp(top bottom)',
              end: 'clamp(top top)',
              scrub: true,
            },
          }
        );
      }

      // 5. Terminal Logo / Motto Entrance: xPercent: +/-100 -> 0
      if (termLogoRef.current && termMottoRef.current && terminalRef.current) {
        gsap.fromTo(
          termLogoRef.current,
          { xPercent: 100, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: terminalRef.current,
              start: 'clamp(top bottom)',
              end: 'clamp(top top)',
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          termMottoRef.current,
          { xPercent: -100, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: terminalRef.current,
              start: 'clamp(top bottom)',
              end: 'clamp(top top)',
              scrub: true,
            },
          }
        );
      }

      // 6. Navbar Exit at Footer (targeting global header element outside footerRef)
      const headerEl = document.querySelector('header');
      if (headerEl) {
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: 'top bottom',
          onEnter: () => {
            gsap.to(headerEl, {
              opacity: 0,
              pointerEvents: 'none',
              duration: 0.4,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            gsap.to(headerEl, {
              opacity: 1,
              pointerEvents: 'auto',
              duration: 0.4,
              ease: 'power2.out',
            });
          },
        });
      }
    },
    { scope: footerRef }
  );

  const handleBackToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative w-full text-[#E8E8E3] overflow-visible select-none"
    >
      {/* 1. Information Wrapper (≈792.44px desktop) */}
      <div
        ref={infoWrapRef}
        className="relative z-10 w-full min-h-[792.44px] bg-[#080807] p-6 box-border flex flex-col justify-between"
      >
        <div className="w-full max-w-[1217px] mx-auto flex flex-col justify-between h-full">
          {/* Top Composition (≈491.34px desktop) */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-[118.75px] pt-[11.5px]">
            {/* LEFT: Large Navigation Block (width: 600.5px) */}
            <div className="w-full lg:w-[600.5px] flex flex-col flex-shrink-0">
              {/* Navigation Eyebrow */}
              <div className="flex items-center gap-3 mb-[45px]">
                <span
                  ref={eyebrowCircleRef}
                  className="w-[13.59px] h-[13.59px] rounded-full bg-[#E8E8E3] inline-block flex-shrink-0"
                />
                <span
                  ref={eyebrowWordRef}
                  className="font-sans font-medium text-[19.5px] leading-[25.35px] tracking-[-0.195px] text-[#E8E8E3]"
                >
                  Navigation
                </span>
              </div>

              {/* 6 Large Navigation Rows (total 420px height) */}
              <ul className="w-full flex flex-col">
                {NAV_ROWS.map((item) => (
                  <li
                    key={item.label}
                    className="w-full h-[70px] border-b border-dotted border-[rgb(57,54,50)]"
                  >
                    <Link
                      href={item.href}
                      className="w-full h-[69px] py-[15.5px] px-2 flex items-center justify-between group transition-all duration-300 hover:bg-[#FAFAF9]"
                    >
                      <span className="font-sans font-bold text-[50px] leading-[50px] tracking-[-1.5px] text-[#E8E8E3] transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.35,1)] group-hover:translate-x-[10px] group-hover:text-[#080807]">
                        {item.label}
                      </span>
                      <span className="font-sans font-bold text-[50px] leading-[50px] tracking-[-1.5px] text-[#E8E8E3] transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.35,1)] -translate-x-[25px] opacity-0 blur-[3px] group-hover:-translate-x-[10px] group-hover:opacity-100 group-hover:blur-0 group-hover:text-[#080807]">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: Studio / Social / Ask AI Aside (width: 497.75px) */}
            <div className="w-full lg:w-[497.75px] flex flex-wrap gap-y-[58px] gap-x-[100px] pb-[23px] flex-shrink-0">
              {/* Group 1: Studio Details (w: 219.44px) */}
              <div className="w-[219.44px] flex flex-col">
                <div className="font-mono font-medium text-[11.6px] leading-[15.08px] tracking-[-0.175px] text-[#938F8A] uppercase mb-[31px]">
                  (STUDIO DETAILS)
                </div>

                <div className="flex flex-col gap-[23px]">
                  {/* Coxvin Identity Plate (~160 × 29px) */}
                  <div className="w-[160px] h-[29px] bg-[#181715] border border-[#2E2E2A] rounded-[2px] px-2.5 flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold tracking-wider text-[#E8E8E3]">
                      CX //
                    </span>
                    <span className="font-mono text-[9.5px] tracking-[0.14em] text-[#938F8A] uppercase">
                      TECHNOLOGY PARTNER
                    </span>
                  </div>

                  {/* Email */}
                  <a
                    href="mailto:contact@coxvin.com?subject=Coming%20from%20coxvin.com%3A%20%5BSubject%5D"
                    className="group inline-block w-fit px-1.5 py-0.5 rounded-sm transition-all duration-300 hover:bg-[#FAFAF9]"
                  >
                    <span className="font-sans font-medium text-[17.5px] leading-[22.75px] tracking-[-0.175px] text-[#E8E8E3] transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.35,1)] inline-block group-hover:translate-x-[10px] group-hover:text-[#080807]">
                      ⮡ contact@coxvin.com
                    </span>
                  </a>

                  {/* Location Copy */}
                  <div className="font-sans font-medium text-[17.5px] leading-[22.75px] tracking-[-0.175px] text-[#938F8A]">
                    <div>Based in Pakistan</div>
                    <div>Working Worldwide.</div>
                  </div>
                </div>
              </div>

              {/* Group 2: Socials (w: 142.16px) */}
              <div className="w-[142.16px] flex flex-col">
                <div className="font-mono font-medium text-[11.6px] leading-[15.08px] tracking-[-0.175px] text-[#938F8A] uppercase mb-[31px]">
                  (SOCIALS)
                </div>

                <div className="flex flex-col gap-[3.2px]">
                  {/* Three Social Rows: LinkedIn, GitHub, Instagram */}
                  <div className="group h-[32.88px] py-[7.5px] pr-[20px] rounded-sm transition-all duration-300 hover:bg-[#FAFAF9] cursor-pointer">
                    <span className="font-sans font-medium text-[23.5px] leading-[25.85px] tracking-[-0.3525px] text-[#E8E8E3] transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.35,1)] inline-block group-hover:translate-x-[10px] group-hover:text-[#080807]">
                      LinkedIn ↗
                    </span>
                  </div>

                  <div className="group h-[32.88px] py-[7.5px] pr-[20px] rounded-sm transition-all duration-300 hover:bg-[#FAFAF9] cursor-pointer">
                    <span className="font-sans font-medium text-[23.5px] leading-[25.85px] tracking-[-0.3525px] text-[#E8E8E3] transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.35,1)] inline-block group-hover:translate-x-[10px] group-hover:text-[#080807]">
                      GitHub ↗
                    </span>
                  </div>

                  <div className="group h-[32.88px] py-[7.5px] pr-[20px] rounded-sm transition-all duration-300 hover:bg-[#FAFAF9] cursor-pointer">
                    <span className="font-sans font-medium text-[23.5px] leading-[25.85px] tracking-[-0.3525px] text-[#E8E8E3] transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.35,1)] inline-block group-hover:translate-x-[10px] group-hover:text-[#080807]">
                      Instagram ↗
                    </span>
                  </div>
                </div>
              </div>

              {/* Group 3: Ask AI About Coxvin (w: 248.75px) */}
              <div className="w-[248.75px] flex flex-col">
                <div className="font-mono font-medium text-[11.6px] leading-[15.08px] tracking-[-0.175px] text-[#938F8A] uppercase mb-[31px]">
                  (ASK AI ABOUT COXVIN)
                </div>

                <div className="flex items-center gap-[7.5px]">
                  {AI_PROVIDERS.map((p) => (
                    <a
                      key={p.name}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ask ${p.name} about Coxvin`}
                      className="w-[43.75px] h-[43.75px] rounded-[2.4px] bg-[#181715] text-[#E8E8E3] flex items-center justify-center transition-all duration-350 ease-[cubic-bezier(0.16,1,0.35,1)] hover:opacity-90 active:scale-95 flex-shrink-0"
                    >
                      {p.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 196px Empty Breathing Gap */}
          <div className="w-full h-[196px] flex-shrink-0" />

          {/* Lower Metadata Grid (≈57px height total with margin) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-[23px] text-[#E8E8E3] font-sans font-medium text-[15.5px] leading-[17.05px] tracking-[-0.155px]">
            {/* Zone 1: Local Clock (Asia/Karachi) */}
            <div className="flex flex-col gap-1 w-full max-w-[395px]">
              <div className="flex items-center gap-2">
                <span>Pakistan</span>
                <span className="font-mono tabular-nums">{timeStr || '12:00:00 AM'}</span>
              </div>
              <div className="text-[#938F8A] text-[14px]">
                {dateStr || 'Thursday, Sep 17, 2026'} (GMT +05)
              </div>
            </div>

            {/* Zone 2: Back to Top + Availability */}
            <div className="flex flex-col gap-1 w-full max-w-[395px] md:items-center">
              <button
                type="button"
                onClick={handleBackToTop}
                className="group inline-flex items-center gap-1 w-fit rounded-sm px-1 py-0.5 transition-all duration-300 hover:bg-[#FAFAF9]"
              >
                <span className="transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.35,1)] group-hover:translate-x-[10px] group-hover:text-[#080807]">
                  Back to top ↑
                </span>
              </button>
              <div className="text-[#938F8A] text-[14px]">
                Accepting new engagements
              </div>
            </div>

            {/* Zone 3: Legal Copyright */}
            <div className="flex flex-col gap-1 w-full max-w-[395px] md:items-end justify-start">
              <div>© {new Date().getFullYear()} COXVIN</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Dark Transition Overlay */}
      <div
        ref={darkOverlayRef}
        className="absolute inset-0 bg-[#080807] pointer-events-none z-20"
      />

      {/* 3. Terminal Interactive Field (288px) */}
      <div
        ref={terminalRef}
        className="relative w-full h-[288px] bg-[#181715] overflow-hidden z-30"
      >
        <FooterHalftoneField />

        {/* Terminal Overlay Content (Centered Vertically, pointer-events-none) */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-between px-6 max-w-[1241px] mx-auto w-full">
          {/* LEFT: Coxvin CX mark */}
          <div ref={termLogoRef} className="flex items-center">
            <span className="font-sans font-bold text-[28px] tracking-tight text-[#E8E8E3]">
              COXVIN
            </span>
          </div>

          {/* RIGHT: Motto */}
          <div
            ref={termMottoRef}
            className="font-sans font-medium text-[17.5px] leading-[22.75px] tracking-[-0.175px] text-[#E8E8E3]"
          >
            『ENGINEERED INTO PLACE.』
          </div>
        </div>
      </div>
    </footer>
  );
}
