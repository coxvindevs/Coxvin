'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import styles from './FooterTrail.module.css';

const images = [
  '7f/7fa03f07d6ecc851e6f9ecfc2fa3d401ee781e1c3ac345d57697b9792a349b32',
  'eb/eb232a2025c87072e321d8b18a63130ebd6c2cf17360721a13152411548b8064',
  'b8/b8d012bb9179f6ddf83cfb8e9f0d536bda7444a4838c5e691427c5f1a9e78d0e',
  '61/6182e640b5507304132cfa3b61cc62ec45f0b0a85a883ad80a5ff5a397748a5a',
  'b6/b636532c14ec5ec65e1bcb697a4d374f688783477a605ced41bca4606c38b9b0',
  '7f/7f7a80245c0e9bbb97db3b452322f89b7666e27cf41eae1cf235a4c186637d5b',
  'b2/b2d22aafe57a2ab515ef4f48cbc934db635b091d726ad3a946b3d0853bfd249e',
  'bc/bc221d73136c58033b7c56f88f0de1874969299d8132b636e93279a9d1f5f0c3',
  'ee/ee76d11e20654a6f2b0ab123614c71fbf74d82d5c2ac9563de88bcfcf195ee75',
];

export default function FooterTrail({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const media = gsap.matchMedia();
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const cards = Array.from(host.querySelectorAll<HTMLImageElement>('[data-trail-image]'));
      let last: { x: number; y: number } | null = null;
      let index = 0;
      const timelines = new Map<HTMLImageElement, gsap.core.Timeline>();
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' || document.hidden) return;
        const bounds = host.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        if (last && Math.hypot(x - last.x, y - last.y) < 100) return;
        last = { x, y };
        const card = cards[index % cards.length];
        index++;
        if (!card.complete || !card.naturalWidth) return;
        timelines.get(card)?.kill();
        // Cursor movement chooses the drop position; each image falls from the roof.
        const rotation = (index % 5 - 2) * 7;
        gsap.set(card, { x, y: -110, zIndex: index, xPercent: -50, yPercent: 0, scale: 1, opacity: 1, rotation });
        timelines.set(card, gsap.timeline()
          .to(card, { y: bounds.height + 110, rotation: rotation + (index % 2 ? 35 : -35), duration: 1.35, ease: 'power2.in' })
          .set(card, { opacity: 0 }));
      };
      const leave = () => { last = null; };
      host.addEventListener('pointermove', move);
      host.addEventListener('pointerleave', leave);
      return () => {
        host.removeEventListener('pointermove', move);
        host.removeEventListener('pointerleave', leave);
        timelines.forEach(timeline => timeline.kill());
        gsap.set(cards, { clearProps: 'all' });
      };
    });
    return () => media.revert();
  }, []);

  return <div ref={root} className={styles.root}>
    <div className={styles.details}>{children}</div>
    <div className={styles.playground}>
      <p className={styles.prompt}>Move your cursor.<br />Find a little surprise.</p>
      <p className={styles.staticPrompt}>A little unexpected.</p>
    </div>
    <div className={styles.trail} aria-hidden="true">
      {images.map(src => <Image key={src} data-trail-image className={styles.image}
        src={`https://cdn.21st.dev/assets/mirror/${src}.png`} alt="" width={180} height={210} unoptimized />)}
    </div>
  </div>;
}
