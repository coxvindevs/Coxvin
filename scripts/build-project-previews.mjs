import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const source = resolve(process.argv[2] ?? '/home/junaid-khan/Documents/design-previews');
const destination = resolve(dirname(fileURLToPath(import.meta.url)), '../public/project-demos');
const { build } = await import(pathToFileURL(resolve(source, 'node_modules/vite/dist/node/index.js')).href);
const pages = [
  ['neo-brutalist-acid', 'NeoBrutalistAcid'], ['kpop-carousel', 'KpopCarousel'],
  ['neumorphism', 'Neumorphism'], ['bauhaus-primaries', 'BauhausPrimaries'],
  ['warm-stationery', 'WarmStationery'], ['minimalist-editorial', 'MinimalistEditorial'],
  ['dark-craft-oscillation', 'DarkCraftOscillation'], ['achromatic-technical', 'AchromaticTechnical'],
];

// Adapt routing only in the exported bundle; leave the original previews untouched.
await build({
  root: source,
  configFile: resolve(source, 'vite.config.ts'),
  base: '/project-demos/',
  plugins: [{
    name: 'coxvin-embedded-preview',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'post',
      handler: html => html.replace(/<link rel="icon"[^>]*>/, '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />'),
    },
    transform(code, id) {
      if (id !== resolve(source, 'src/main.tsx')) return;
      return `import { lazy, Suspense } from 'react';
        import { createRoot } from 'react-dom/client';
        import { createMemoryRouter, RouterProvider } from 'react-router-dom';
        import './index.css';
        ${pages.map(([slug, component], index) => `const Page${index} = lazy(() => import('./sites/${component}'));`).join('\n')}
        const routes = [${pages.map(([slug], index) => `{ path: '/${slug}', element: <Suspense fallback={<p role="status">Loading preview...</p>}><Page${index} /></Suspense> }`).join(',')}];
        const router = createMemoryRouter(routes, { initialEntries: [new URLSearchParams(location.search).get('preview') || '/neo-brutalist-acid'] });
        createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);`;
    },
  }],
  build: { outDir: destination, emptyOutDir: true },
});
