import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import PixelNotFound from '@/components/ui/PixelNotFound';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" aria-label="Coxvin home"><Image src="/images/cx-mark-white.png" alt="Coxvin" width={64} height={34} className={styles.logo} priority /></Link>
        <span>COXVIN / OFF THE GRID</span>
      </header>
      <div className={styles.content}>
        <PixelNotFound />
        <p className={styles.label}>ERROR 404 / PAGE NOT FOUND</p>
        <h1>This page is off the grid.</h1>
        <p className={styles.description}>A wrong turn. Not a dead end.</p>
        <Link className={styles.home} href="/">Back to home <ArrowUpRight size={20} aria-hidden="true" /></Link>
      </div>
      <footer className={styles.footer}><span>DESIGN / ENGINEERING</span><span>LET&apos;S GET YOU BACK.</span></footer>
    </main>
  );
}
