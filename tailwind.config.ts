import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080807',
        foreground: '#E8E8E3',
        'shader-fg': '#524D47',
        'border-subtle': '#1F1F1D',
        'border-strong': '#2E2E2A',
        'surface-dark': '#0D0D0B',
      },
      fontFamily: {
        sans: ['var(--font-khteka)', 'Arial', 'sans-serif'],
        mono: ['var(--font-suisse-mono)', 'monospace'],
        body: ['var(--font-animo)', 'sans-serif'],
        display: ['var(--font-animo)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
