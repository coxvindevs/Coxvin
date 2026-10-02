'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import styles from './AboutProvider.module.css';

const AboutContext = createContext<() => void>(() => {});
export const useAbout = () => useContext(AboutContext);
const principles = [
  ['Understand before building', 'Start with the people, the business and the constraints. Define the problem clearly before choosing the technology.'],
  ['One connected system', 'Brand, interface, product and operations should work together. We consider the whole experience, not just individual screens.'],
  ['People stay in control', 'Make complex systems understandable. Build automation with clear decisions, visible outcomes and room for human judgement.'],
  ['Build for what comes next', 'Treat launch as the beginning of real-world learning. Create systems that can adapt as the business grows.'],
];
const clients = ['Gulf Fiber', 'Cullet', 'Oscilla Engineering', 'Flozen AI', 'Softly', 'Open ERP', 'Mowasala', 'Staatliche Form'];
const founders = [
  ['Junaid Khan', 'CEO'],
  ['Muhammad Abbas', 'COO'],
  ['Muhammad Awais', 'Managing Director'],
  ['Muhammad Abdullah Bhatti', 'CTO'],
];

export default function AboutProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const reduced = useReducedMotion();
  const close = () => setClosing(true);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element?.showModal();
    closeButton.current?.focus({ preventScroll:true });
    return () => { element?.close(); document.body.style.overflow = previous; trigger.current?.focus({preventScroll:true}); };
  }, [open]);
  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(() => { setOpen(false); setClosing(false); }, reduced ? 0 : 650);
    return () => window.clearTimeout(timer);
  }, [closing, reduced]);
  const reveal = { initial:{opacity:0,y:reduced?0:24}, whileInView:{opacity:1,y:0}, viewport:{once:true,amount:0.15}, transition:{duration:reduced?0:0.7} };
  return <AboutContext.Provider value={() => { trigger.current = document.activeElement as HTMLElement; setOpen(true); }}>
    {children}
    {open && <dialog ref={dialog} className={styles.dialog} aria-labelledby="about-title" onCancel={event => {event.preventDefault();close();}}>
      <motion.button className={styles.backdrop} aria-label="Close About" onClick={close} initial={{opacity:0}} animate={{opacity:closing?0:1}} transition={{duration:reduced?0:0.45}} />
      <motion.div className={styles.panel} data-lenis-prevent initial={{x:reduced?0:'100%'}} animate={{x:closing?'100%':0}} transition={{duration:reduced?0:0.65,ease:[0.22,1,0.36,1]}}>
        <div className={styles.top}><h1 id="about-title">About the studio</h1><button ref={closeButton} onClick={close} className={styles.close}>Close <span>esc</span></button></div>
        <div className={styles.intro}>
          {[
            'Coxvin brings brand, digital experience and engineering together for businesses whose growth has outpaced the systems supporting them.',
            'We connect the way a business presents itself with the way it works. From visual identity and websites to operational platforms and intelligent automation, every part should serve the same purpose.',
            'Our work begins with understanding what you have built, where the friction is, and what needs to happen next. Then we design and engineer the system to get you there.',
          ].map((text,i)=><motion.p key={text} initial={{opacity:0,y:reduced?0:30,clipPath:'inset(0 0 100% 0)'}} animate={{opacity:1,y:0,clipPath:'inset(0 0 0% 0)'}} transition={{duration:reduced?0:0.8,delay:reduced?0:0.25+i*0.12}}>{text}</motion.p>)}
        </div>
        <motion.section {...reveal} className={styles.cover} aria-label="Coxvin approach">
          <div className={styles.meta}><span>CX / COXVIN</span><span>BASED IN PAKISTAN / WORKING WORLDWIDE</span></div>
          <div className={styles.media}><Image src="/images/closing-cta/cta-bg-loom.webp" alt="Interwoven structural forms" fill sizes="(max-width: 720px) 100vw, 672px"/>{['listen','design','engineer','evolve'].map((word,i)=><motion.span key={word} initial={{opacity:0,y:reduced?0:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:reduced?0:0.9,delay:reduced?0:i*.1}}>{word}</motion.span>)}</div>
        </motion.section>
        <motion.section {...reveal} className={styles.row} aria-labelledby="about-founders"><h2 id="about-founders">Co-founders</h2><ul className={styles.founders}>{founders.map(([name,role])=><li key={name}><span>{name}</span><span className={styles.founderRole}>Co-founder &amp; {role}</span></li>)}</ul></motion.section>
        <motion.section {...reveal} className={styles.row}><h2>Clients</h2><ul>{clients.map(name=><li key={name}>{name}</li>)}</ul></motion.section>
        <motion.section {...reveal} className={styles.row}><h2>Capabilities</h2><ul>{['Digital Experiences','Visual Direction','Business Systems','AI & Integrations','Cloud & Infrastructure','SEO & Optimization'].map(name=><li key={name}>{name}</li>)}</ul></motion.section>
        <section className={styles.row}>
          <h2>Our principles</h2>
          <div>{principles.map(([title, copy]) => (
            <motion.article key={title} {...reveal} className={styles.principle}>
              <h3 key="title">{title}</h3>
              <p key="copy">{copy}</p>
            </motion.article>
          ))}</div>
        </section>
      </motion.div>
    </dialog>}
  </AboutContext.Provider>;
}
