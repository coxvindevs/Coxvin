'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import styles from './digital-marquee.module.css';

// Original demo order; only the six Aceternity-branded textures are adapted.
const images = Array.from({ length: 31 }, (_, index) =>
  `/images/optimized/digital-marquee/${index}.webp`);

export default function DigitalMarquee({ active = true }: { active?: boolean }) {
  const mount = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const resume = useRef(() => {});
  const [fallback, setFallback] = useState(false);
  useEffect(() => { activeRef.current = active; resume.current(); }, [active]);
  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
    catch { setFallback(true); return; }
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const anisotropy = renderer.capabilities.getMaxAnisotropy();
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-6, 6, 5, -5, .1, 100);
    camera.position.z = 30;
    const field = new THREE.Group();
    // The supplied marquee's 55-degree tilt and -45-degree diagonal composition.
    field.rotation.set(THREE.MathUtils.degToRad(55), 0, THREE.MathUtils.degToRad(-45));
    scene.add(field);
    const geometry = new THREE.PlaneGeometry(2.7, 2.7 * 700 / 970);
    const textures: THREE.Texture[] = [];
    const pendingUploads: { texture: THREE.Texture; material: THREE.MeshBasicMaterial }[] = [];
    const materials: THREE.MeshBasicMaterial[] = [];
    const tiles: THREE.Mesh[] = [];
    const columns: THREE.Group[] = [];
    let disposed = false;
    const loader = new THREE.TextureLoader();
    images.forEach(image => {
      const material = new THREE.MeshBasicMaterial({ color: '#000000' });
      material.onBeforeCompile = shader => {
        shader.fragmentShader = shader.fragmentShader.replace('#include <clipping_planes_fragment>', `
          #include <clipping_planes_fragment>
          #ifdef USE_MAP
          vec2 q = abs(vMapUv - 0.5) * vec2(2.7, 1.94845) - vec2(1.297, 0.921225);
          if (length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) > 0.053) discard;
          #endif
        `);
      };
      materials.push(material);
      loader.load(image, texture => {
        if (disposed) { texture.dispose(); return; }
        texture.colorSpace = THREE.SRGBColorSpace;
        // Preserve small UI details when the cards are viewed at a steep angle.
        texture.anisotropy = anisotropy;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;
        const imageAspect = texture.image.width / texture.image.height;
        const tileAspect = 970 / 700;
        if (imageAspect > tileAspect) { texture.repeat.x = tileAspect / imageAspect; texture.offset.x = (1 - texture.repeat.x) / 2; }
        else { texture.repeat.y = imageAspect / tileAspect; texture.offset.y = (1 - texture.repeat.y) / 2; }
        textures.push(texture);
        pendingUploads.push({ texture, material });
        resume.current();
      }, undefined, () => { if (!disposed) setFallback(true); });
    });
    for (let col = 0; col < 4; col++) {
      const column = new THREE.Group();
      column.position.x = (col - 1.5) * 2.913;
      field.add(column); columns.push(column);
      for (let row = 0; row < 8 && col * 8 + row < images.length; row++) {
        const tile = new THREE.Mesh(geometry, materials[col * 8 + row]);
        tile.position.y = (3.5 - row) * 2.1615;
        tile.userData.baseY = tile.position.y;
        column.add(tile); tiles.push(tile);
      }
    }
    const resize = () => {
      const width = host.clientWidth, height = host.clientHeight;
      if (!width || !height) return;
      // Supersample standard-density displays too, with a bounded GPU pixel budget.
      const qualityRatio = Math.max(2, Math.min(window.devicePixelRatio, 3));
      renderer.setPixelRatio(Math.min(qualityRatio, Math.sqrt(4_000_000 / (width * height))));
      renderer.setSize(width, height);
      const halfWidth = width < 500 ? 2.8 : 3.6;
      camera.left = -halfWidth; camera.right = halfWidth;
      camera.top = halfWidth * height / width; camera.bottom = -camera.top;
      camera.updateProjectionMatrix();
    };
    // Tab descriptions animate the panel height; resize the GPU buffer after they settle.
    let resizeTimer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    });
    observer.observe(host); resize();
    const pointer = new THREE.Vector2(10, 10);
    const raycaster = new THREE.Raycaster();
    const move = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, 1 - (event.clientY - rect.top) / rect.height * 2);
    };
    const leave = () => pointer.set(10, 10);
    host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false, nearby = false, frame = 0, time = 0, previous = 0;
    const start = () => {
      if (!frame && !document.hidden && ((visible && activeRef.current) || (nearby && pendingUploads.length))) {
        previous = 0;
        frame = requestAnimationFrame(render);
      }
    };
    resume.current = start;
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); });
    intersection.observe(host);
    const warmup = new IntersectionObserver(([entry]) => { nearby = entry.isIntersecting; start(); }, { rootMargin: '750px' });
    warmup.observe(host);
    const render = (now: number) => {
      frame = 0;
      if (document.hidden) return;
      const delta = previous ? Math.min(now - previous, 48) / 1000 : 0;
      previous = now;
      // Upload once, ahead of the section, without a 31-texture burst on hover.
      if (nearby && !document.hidden && pendingUploads.length) {
        const upload = pendingUploads.shift()!;
        renderer.initTexture(upload.texture);
        upload.material.color.set('#ffffff');
        upload.material.map = upload.texture;
        upload.material.needsUpdate = true;
      }
      if (visible && activeRef.current && !document.hidden) {
        if (!media.matches) time += delta;
        columns.forEach((column, i) => {
          const progress = (1 - Math.cos(time * Math.PI / (i % 2 ? 15 : 10))) / 2;
          column.position.y = media.matches ? 0 : progress * .665 * (i % 2 ? 1 : -1);
        });
        scene.updateMatrixWorld();
        raycaster.setFromCamera(pointer, camera);
        const hovered = raycaster.intersectObjects(tiles, false)[0]?.object;
        tiles.forEach(tile => {
          const target = tile.userData.baseY + (tile === hovered && !media.matches ? .0665 : 0);
          tile.position.y += (target - tile.position.y) * .15;
        });
        renderer.render(scene, camera);
      }
      if ((nearby && pendingUploads.length) || (visible && activeRef.current && !media.matches)) frame = requestAnimationFrame(render);
    };
    const onVisibility = () => { cancelAnimationFrame(frame); frame = 0; start(); };
    document.addEventListener('visibilitychange', onVisibility);
    media.addEventListener('change', onVisibility);
    start();
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); warmup.disconnect();
      resume.current = () => {};
      document.removeEventListener('visibilitychange', onVisibility);
      media.removeEventListener('change', onVisibility);
      clearTimeout(resizeTimer);
      pendingUploads.length = 0;
      host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave);
      geometry.dispose();
      materials.forEach(material => material.dispose()); textures.forEach(texture => texture.dispose());
      renderer.dispose(); renderer.domElement.remove();
    };
  }, []);
  return <div className={styles.marquee} ref={mount} data-active={active} aria-hidden={!active} role="img" aria-label="Coxvin digital experiences: an animated gallery of interface designs">
    {fallback && <div className={styles.fallback} />}
  </div>;
}
