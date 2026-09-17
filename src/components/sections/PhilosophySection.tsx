'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PhilosophySection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.philosophy-block', {
        opacity: 0,
        y: 35,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative z-10 w-full px-6 md:px-12 py-28 md:py-40 bg-background border-t border-border-subtle"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Sticky Left Column: Massive Editorial Typography */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <span className="font-mono text-xs uppercase tracking-widest text-shader-fg block mb-4">
            [ 03 // PHILOSOPHY ]
          </span>
          <h2 className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl text-foreground uppercase tracking-tight leading-[1.05]">
            Strategy.
            <br />
            <span className="text-neutral-300">Technology.</span>
            <br />
            <span className="text-shader-fg">People.</span>
          </h2>
          <div className="mt-8 pt-6 border-t border-border-subtle font-mono text-xs text-neutral-500 space-y-1">
            <div>FRAMEWORK: FIRST-PRINCIPLES ARCHITECTURE</div>
            <div>STATUS: ZERO COMPROMISE STACK</div>
          </div>
        </div>

        {/* Right Column: Structured Monospaced & Editorial Blocks */}
        <div className="lg:col-span-7 space-y-12 md:space-y-16">
          <div className="philosophy-block p-8 border border-border-subtle bg-surface-dark/40">
            <div className="flex items-center justify-between font-mono text-xs text-shader-fg border-b border-border-subtle/70 pb-3 mb-6">
              <span>[ 01 // STRATEGY ]</span>
              <span className="text-neutral-500">SYSTEM INTENT</span>
            </div>
            <h3 className="font-sans font-bold text-xl sm:text-2xl text-foreground mb-4 uppercase tracking-tight">
              Architecture Precedes Code
            </h3>
            <p className="font-body text-neutral-300 text-base sm:text-lg leading-relaxed">
              We do not write code to solve ill-defined problems. Every engagement begins with forensic analysis of business systems, identifying bottlenecks, throughput constraints, and data lifecycles before authoring a single line of software.
            </p>
            <div className="mt-6 font-mono text-xs text-neutral-400">
              OUTCOME: Structural alignment between operational realities and digital interfaces.
            </div>
          </div>

          <div className="philosophy-block p-8 border border-border-subtle bg-surface-dark/40">
            <div className="flex items-center justify-between font-mono text-xs text-shader-fg border-b border-border-subtle/70 pb-3 mb-6">
              <span>[ 02 // TECHNOLOGY ]</span>
              <span className="text-neutral-500">PERFORMANCE PARADIGM</span>
            </div>
            <h3 className="font-sans font-bold text-xl sm:text-2xl text-foreground mb-4 uppercase tracking-tight">
              Zero Technical Debt Tolerance
            </h3>
            <p className="font-body text-neutral-300 text-base sm:text-lg leading-relaxed">
              We build on verified standards: compiled runtimes, type-safe APIs, and GPU-accelerated rendering pipelines. No bloated dependency trees or volatile abstractions. Systems engineered to operate under high loads without latency spikes or memory leaks.
            </p>
            <div className="mt-6 font-mono text-xs text-neutral-400">
              OUTCOME: Sub-second interaction speeds, zero hydration drops, predictable maintenance.
            </div>
          </div>

          <div className="philosophy-block p-8 border border-border-subtle bg-surface-dark/40">
            <div className="flex items-center justify-between font-mono text-xs text-shader-fg border-b border-border-subtle/70 pb-3 mb-6">
              <span>[ 03 // PEOPLE ]</span>
              <span className="text-neutral-500">HUMAN INTERFACE</span>
            </div>
            <h3 className="font-sans font-bold text-xl sm:text-2xl text-foreground mb-4 uppercase tracking-tight">
              Frictionless Ergonomics
            </h3>
            <p className="font-body text-neutral-300 text-base sm:text-lg leading-relaxed">
              Software is only as potent as the humans commanding it. We synthesize complex data schemas into lucid, immediate surfaces that empower operators, stakeholders, and consumers to execute decisions without cognitive friction.
            </p>
            <div className="mt-6 font-mono text-xs text-neutral-400">
              OUTCOME: Accelerated operational cadence and heightened brand prestige.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
