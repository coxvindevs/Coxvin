'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import FooterCharacter from './FooterCharacter';
import FooterTrail from './FooterTrail';
import { useAbout } from '@/components/layout/AboutProvider';
import styles from './FooterSection.module.css';
import { BOOKING_URL, SOCIAL_PROFILES } from '@/lib/contact';

const links = [['About', '#overview'], ['Work', '#work'], ['Services', '#services'], ['FAQs', '#faqs']];

export default function FooterSection() {
  const openAbout = useAbout();
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).format(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <footer id="contact" className={styles.footer}><div className={styles.panel}>
    <a className={styles.contact} href={BOOKING_URL} target="_blank" rel="noopener noreferrer" aria-label="Let's talk. Book a call with Coxvin">
      <span className={styles.roll}><span>Let&apos;s talk.</span><span aria-hidden="true">Let&apos;s talk.</span></span><span className={styles.arrow} aria-hidden="true"><span className={styles.arrowWindow}><i /><i /></span></span>
    </a>
    <div className={styles.directory}>
      <nav className={styles.explore} aria-label="Footer navigation"><h2>Explore</h2>{links.map(([label, href]) => <a key={label} href={label === 'About' ? '#about' : href} onClick={label === 'About' ? event => { event.preventDefault(); openAbout(); } : undefined}>{label}<span aria-hidden="true"><ArrowRight size={30} strokeWidth={3} /></span></a>)}</nav>
      <FooterCharacter />
      <div className={styles.details}><h2>Studio details</h2><a href="mailto:contact@coxvin.com">contact@coxvin.com</a><p>Based in Pakistan<br />Working Worldwide.</p><h2>Socials</h2><div className={styles.providers}>{SOCIAL_PROFILES.map(({ name, href }) => href ? <a key={name} href={href} target="_blank" rel="noopener noreferrer">{name}<span aria-hidden="true">↗</span></a> : <span key={name}>{name}</span>)}</div></div>
    </div>
    <FooterTrail><div className={styles.meta}>
      <div><Image className={styles.footerLogo} src="/images/coxvin-wordmark-white.png" alt="COXVIN" width={1142} height={211} /><span>Accepting new engagements</span></div>
      <div><span>Pakistan <time>{time}</time></span><span>GMT +05</span></div>
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}>Back to top ↑</button><span>© {new Date().getFullYear()} COXVIN</span>
    </div></FooterTrail>
  </div></footer>;
}
