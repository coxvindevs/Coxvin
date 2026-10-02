'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { BOOKING_URL } from '@/lib/contact';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';
import styles from './Navbar.module.css';

const links = [
  { href: '#work', label: 'Work' },
  { href: '#overview', label: 'Philosophy' },
  { href: '#services', label: 'Systems' },
  { href: '#contact', label: 'Contact' },
];

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);

try {
  CustomEase.create('ease-transition', '0.22, 1, 0.36, 1');
} catch {
  // registered
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [active, setActive] = useState('');
  const [atFooter, setAtFooter] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const capsule = navRef.current?.querySelector('nav')?.getBoundingClientRect();
      const sampleY = capsule ? capsule.top + capsule.height / 2 : 48;
      setCompact(['#work', '#services', '#gap', '#faqs'].some(selector => {
        const rect = document.querySelector(selector)?.getBoundingClientRect();
        return Boolean(rect && rect.top <= sampleY + 100 && rect.bottom > sampleY);
      }));
      const footer = document.querySelector('#contact')?.getBoundingClientRect();
      setAtFooter(Boolean(footer && footer.top <= 90));
      const current = links.find(({ href }) => {
        const rect = document.querySelector(href)?.getBoundingClientRect();
        return rect && rect.top <= 120 && rect.bottom > 120;
      });
      setActive(current?.href ?? '');
      const lightSections = document.querySelectorAll<HTMLElement>('[data-theme-section="light"], #contact');
      for (const lightSection of lightSections) {
        const rect = lightSection.getBoundingClientRect();
        if (rect.top <= sampleY && rect.bottom > sampleY) {
          setTheme('light');
          return;
        }
      }
      setTheme('dark');
    };

    let frame = 0;
    const scheduleUpdate = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; updateTheme(); });
    };
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });
    updateTheme();

    const st = ScrollTrigger.create({
      trigger: '#work',
      start: 'top top',
      end: 'bottom top',
      onUpdate: scheduleUpdate,
      onRefresh: scheduleUpdate,
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      st.kill();
    };
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        '.nav-capsule-entrance',
        { opacity: 0, scale: 0.98, y: -14 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, delay: 0.1, ease: 'ease-transition' }
      );
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
      data-nav-theme={theme}
      data-nav-compact={compact}
      style={{ visibility: atFooter ? 'hidden' : 'visible', pointerEvents: atFooter ? 'none' : 'auto' }}
      className={`${styles.header} fixed top-0 left-0 right-0 z-50 h-[79px] flex items-center justify-between px-6 bg-transparent select-none`}
    >
      {/* Left: Coxvin Logo at 24px */}
      <div data-nav-external-logo className="flex items-center overflow-hidden">
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
      <nav aria-label="Primary" className={`${styles.position} font-mono text-xs uppercase tracking-widest`}>
        <div className={`${styles.capsule} nav-capsule-entrance`}>
          <div className={styles.border} aria-hidden="true"><span className={styles.rotor} /></div>
          <div className={styles.glass}>
            <span className={styles.hairline} aria-hidden="true" />
            <span className={styles.shimmer} aria-hidden="true" />
            <div className={styles.links}>
              {links.map(({ href, label }) => (
                <Link key={href} href={href} className={styles.link} aria-current={active === href ? 'location' : undefined}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Right: Restrained CTA matching reference role */}
      <div className="flex items-center overflow-hidden">
        <Link
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`nav-item ${styles.projectCta} inline-flex items-center space-x-1.5 font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 transition-all duration-300 ${
            theme === 'light'
              ? 'text-[#080807] border-[#080807]/20 bg-[#080807]/[0.04] hover:bg-[#080807] hover:text-[#E8E8E3] hover:border-[#080807]'
              : 'text-[#E8E8E3] border-border-subtle bg-surface-dark/60 hover:bg-white hover:text-background hover:border-white'
          }`}
        >
          <span>LET&apos;S BUILD</span>
          <span className={styles.projectArrow} aria-hidden="true">
            <ArrowUpRight size={12} />
            <ArrowUpRight size={12} />
          </span>
        </Link>
      </div>
    </header>
  );
}
