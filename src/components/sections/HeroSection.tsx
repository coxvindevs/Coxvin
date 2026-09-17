'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HalftoneCanvas from '@/components/canvas/HalftoneCanvas';

gsap.registerPlugin(CustomEase, useGSAP, ScrollTrigger);

try {
  CustomEase.create('ease-transition', '0.22, 1, 0.36, 1');
} catch {
  // registered
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.1 });

      // 1. Small hero CX mark entrance
      tl.fromTo(
        '.hero-cx-mark',
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.075,
          ease: 'ease-transition',
        },
        0.1
      )
        // 2. Editorial text entrance (yPercent 110 -> 0, duration 1.075s, stagger 0.05, ease-transition)
        .fromTo(
          '.hero-editorial-line',
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.075,
            stagger: 0.05,
            ease: 'ease-transition',
          },
          0.15
        )
        // 3. Giant wordmark reveal (yPercent 120 -> 0, duration 1.075s, ease-transition)
        .fromTo(
          '.hero-wordmark-reveal',
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 1.075,
            ease: 'ease-transition',
          },
          0.25
        );

      // Hero exit scroll animations
      // 1. hero atmospheric/image layer: translateY from -100px to +100px across hero scroll
      gsap.fromTo(
        '.hero-bg-img',
        { y: -100 },
        {
          y: 100,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // 2. hero dark overlay: opacity 0 -> 0.6 across the same hero scroll range
      gsap.fromTo(
        '.hero-dark-overlay',
        { opacity: 0 },
        {
          opacity: 0.6,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[720px] max-h-[100svh] min-h-[720px] overflow-hidden bg-background select-none"
    >
      {/* 1. Background Image / Light Field at ~0.6 opacity */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/images/hero-light-field.avif"
          alt=""
          className="hero-bg-img w-full h-[130%] -top-[15%] relative object-cover opacity-60"
        />
      </div>

      {/* 2. WebGL Halftone Canvas (existing shaders unchanged) */}
      <HalftoneCanvas
        className="absolute inset-0 z-[1] opacity-100 pointer-events-none"
        amplitude={1.53}
        timeSpeed={0.0065}
        pixelSize={3.0}
        gooeyness={0.0}
        contrast={0.9}
        bias={-0.25}
        invert={0}
        fg="#524D47"
        bg="#080807"
        transparentBg={1}
        waveAmplitude={0.29}
        waveFrequency={3.9}
        waveTimeSpeed={0.0}
      />

      {/* 3. Bottom Dark Gradient Fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background via-background/80 to-transparent z-[2] pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero dark overlay (opacity 0 -> 0.6 on scroll) */}
      <div
        className="hero-dark-overlay absolute inset-0 bg-background pointer-events-none z-[3] opacity-0"
        aria-hidden="true"
      />

      {/* 4. Content: Container x24, y24, w1217, h672 */}
      <div className="relative z-10 w-full h-full max-w-[1217px] mx-auto px-0">
        {/* Small Hero CX Mark: x≈600.13, y≈171.19, w≈64.75, h≈28.39 */}
        <div
          className="absolute left-1/2 -translate-x-1/2 overflow-hidden flex items-center justify-center"
          style={{
            top: '171.19px',
            width: '64.75px',
            height: '28.39px',
          }}
        >
          <Image
            src="/images/cx-mark-light.png"
            alt="CX"
            width={940}
            height={466}
            priority
            className="hero-cx-mark w-full h-full object-contain"
          />
        </div>

        {/* Center Editorial H1: x≈508.47, y≈230.58, w≈248.06, h≈128.81 */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center"
          style={{
            top: '230.58px',
            width: '248.06px',
          }}
        >
          <h1 className="font-sans font-medium text-[17.5px] leading-[19.25px] text-center text-foreground w-full tracking-normal">
            <span className="block overflow-hidden">
              <span className="hero-editorial-line block">We design and engineer</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-editorial-line block">digital systems that finally</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-editorial-line block">reflect what you&apos;ve built.</span>
            </span>

            <span className="block h-[13.3px]" aria-hidden="true" />

            <span className="block overflow-hidden">
              <span className="hero-editorial-line block text-neutral-300">For established brands whose</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-editorial-line block text-neutral-300">growth has outgrown their</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-editorial-line block text-neutral-300">digital infrastructure.</span>
            </span>
          </h1>
        </div>

        {/* Giant Brand Artwork: x≈24, y≈406.58, w≈1217, h≈289.42, bottom sitting 24px above viewport bottom */}
        <div
          className="absolute left-0 right-0 overflow-hidden flex items-end justify-center"
          style={{
            top: '406.58px',
            height: '289.42px',
          }}
        >
          <div className="overflow-hidden w-full h-full flex items-end justify-center">
            <Image
              src="/images/coxvin-wordmark-stone.png"
              alt="COXVIN"
              width={1142}
              height={211}
              priority
              className="hero-wordmark-reveal w-full h-full object-contain object-bottom select-none opacity-90"
            />
          </div>
        </div>
      </div>

      {/* 5. Fixed Subtle Grain Overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.25] mix-blend-color-dodge bg-repeat"
        style={{ backgroundImage: 'url(/images/grain.png)' }}
        aria-hidden="true"
      />
    </section>
  );
}
