'use client';
import { BOOKING_URL } from '@/lib/contact';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './CtaSection.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const needsRef = useRef<HTMLDivElement>(null);

  // Background Image Parallax: 0 -> -150px
  useGSAP(
    () => {
      if (!sectionRef.current || !bgImageRef.current) return;
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && needsRef.current) {
        const line = needsRef.current;
        gsap.to(line, {
          x: () => Math.max(0, (line.parentElement!.clientWidth - line.clientWidth) / 2),
          ease: 'none',
          scrollTrigger: {
            trigger: line.parentElement,
            start: 'top 75%',
            end: 'bottom 15%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

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

    const isFinePointer = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches;
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
      className="relative w-full min-h-screen pb-[195px] md:pb-[230px] lg:pb-[255px] bg-[#080807] text-[#E8E8E3] overflow-hidden z-[2] select-none flex flex-col"
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
        Let&apos;s build the system your business needs.
      </h2>

      {/* Content Layer (Top / Main Editorial crescendo) */}
      <div className="relative z-[2] w-full max-w-[1280px] mx-auto px-6 pt-[195px] md:pt-[230px] lg:pt-[255px] flex flex-col items-center text-center">
        {/* 4-Line Display Stack */}
        <div
          className="flex flex-col uppercase tracking-normal leading-[0.95] text-[38px] sm:text-[64px] md:text-[80px] lg:text-[104px] xl:text-[131px] font-normal text-[#E8E8E3]"
          style={{ fontFamily: 'var(--font-bolton), var(--font-khteka), sans-serif' }}
          aria-hidden="true"
        >
          <div>Let&apos;s build</div>
          <div>the system</div>
          <div>your business</div>
          <div ref={needsRef} className="flex self-center items-center justify-center gap-[0.2em]">
            <span className={styles.needsArrow}>→</span>
            <span>needs</span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <div className="mt-10 md:mt-12">
          <Link
            ref={buttonRef}
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`group ${styles.button}`}
            aria-label="Tell us what you're building"
          >
            <span className={styles.label} aria-hidden="true"><span>Tell us what you&apos;re building</span><span>Tell us what you&apos;re building</span></span>
            <span aria-hidden="true" className={styles.buttonArrow}>
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

    </section>
  );
}
