'use client';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import styles from '@/app/not-found.module.css';

const four = ['000010', '000110', '001010', '010010', '100010', '111111', '000010', '000010'];
const zero = ['011110', '100001', '100001', '100001', '100001', '100001', '100001', '011110'];

export default function PixelNotFound() {
  const [paused, setPaused] = useState(false);
  return <div className={styles.art} data-paused={paused}>
    <svg viewBox="-16 -32 736 320" role="img" aria-label="404, drawn in pixels" className={styles.numerals}>
      {[four, zero, four].map((digit, d) => <g key={d}>
        {digit.flatMap((row, y) => [...row].map((cell, x) => cell === '1' ?
          <rect key={`${x}-${y}`} className={styles.pixel} x={d * 256 + x * 32} y={y * 32} width="32" height="32" /> : null))}
      </g>)}
      {[0, 1, 2].map(i => <g key={i} className={`${styles.runner} ${styles[`runner${i}`]}`} aria-hidden="true">
        <path d="M3 0h4v3h8V0h4v4h3v14H0V4h3Z" fill="#888a83" />
        <path d="M4 7h4v4H4zm10 0h4v4h-4z" fill="#080807" />
        <path d="M3 18h5v4H3zm11 0h5v4h-5z" fill="#888a83" />
      </g>)}
    </svg>
    <button className={styles.motion} type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}
      aria-label={paused ? 'Resume animation' : 'Pause animation'} title={paused ? 'Resume animation' : 'Pause animation'}>
      {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
    </button>
  </div>;
}
