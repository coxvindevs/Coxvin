'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { portalFragmentShader, portalVertexShader } from './shaders';

gsap.registerPlugin(CustomEase);
CustomEase.create('portal-reveal', '0.31, 0.75, 0.22, 1');

interface PortalFieldProps {
  variant?: 'portal-field';
  className?: string;
  portalCenterX?: number;
  sourceBaseline?: boolean;
}

export function PortalFieldCollection({ className = '', portalCenterX = 0.5, sourceBaseline = false }: PortalFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const interactionHost = host.closest('section') ?? host;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x080807, 0);
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
    host.appendChild(renderer.domElement);
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2() },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_portalCenter: { value: new THREE.Vector2(portalCenterX, 0.5) },
      u_colorCore: { value: new THREE.Color(sourceBaseline ? '#FFFFFF' : '#BDBDB6') },
      u_colorFringe: { value: new THREE.Color(sourceBaseline ? '#1e3a8a' : '#524D47') },
      u_isLightMode: { value: 0 },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: portalVertexShader, fragmentShader: portalFragmentShader,
      uniforms, transparent: true, blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Mesh(geometry, material));
    let frame = 0;
    let visible = true;
    let lost = false;
    let disposed = false;
    let last = 0;
    let elapsed = 0;
    let frames = 0;
    let sampleTime = 0;
    const pointer = new THREE.Vector2();
    const influence = new THREE.Vector2();
    const target = new THREE.Vector2();
    const reveal = gsap.fromTo(host, { opacity: reduced.matches ? 1 : 0 }, { opacity: 1, duration: 3, ease: 'portal-reveal' });

    const render = (now: number) => {
      frame = 0;
      if (disposed || lost || !visible || document.hidden) return;
      const dt = last ? (now - last) / 1000 : 0;
      last = now;
      if (!reduced.matches) elapsed += dt;
      uniforms.u_time.value = reduced.matches ? 2.4 : elapsed;
      if (!sourceBaseline) {
        influence.lerp(fine.matches && !reduced.matches ? pointer : new THREE.Vector2(), 1 - Math.exp(-1.5 * dt));
        const driftX = reduced.matches ? 0 : 0.065 * Math.sin(elapsed * Math.PI * 2 / 18) + 0.02 * Math.sin(elapsed * Math.PI * 2 / 31);
        const driftY = reduced.matches ? 0 : 0.035 * Math.sin(elapsed * Math.PI * 2 / 23);
        target.set(portalCenterX + driftX + influence.x * 0.09, 0.5 + driftY + influence.y * 0.04);
        uniforms.u_portalCenter.value.lerp(target, reduced.matches ? 1 : 1 - Math.exp(-2.7 * dt));
      }
      renderer.render(scene, camera);
      host.dataset.center = uniforms.u_portalCenter.value.toArray().map(v => v.toFixed(4)).join(',');
      host.dataset.time = elapsed.toFixed(3);
      frames++;
      sampleTime += dt;
      if (sampleTime >= 1) {
        host.dataset.fps = (frames / sampleTime).toFixed(1);
        sampleTime = 0;
        frames = 0;
      }
      if (!reduced.matches) frame = requestAnimationFrame(render);
    };
    const resume = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (!disposed && !lost && visible && !document.hidden) frame = requestAnimationFrame(render);
    };
    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height, false);
      // gl_FragCoord is in backing pixels, including at high DPR.
      renderer.getDrawingBufferSize(uniforms.u_resolution.value);
      if (sourceBaseline) uniforms.u_portalCenter.value.set(0.5 / (width / height), 0.5);
      resume();
    };
    const move = (event: Event) => {
      if (!fine.matches || reduced.matches) return;
      const e = event as PointerEvent;
      const rect = interactionHost.getBoundingClientRect();
      pointer.set(Math.max(-1, Math.min(1, (e.clientX - rect.left) / rect.width * 2 - 1)), Math.max(-1, Math.min(1, 1 - (e.clientY - rect.top) / rect.height * 2)));
    };
    const leave = () => pointer.set(0, 0);
    const contextLost = (e: Event) => { e.preventDefault(); lost = true; cancelAnimationFrame(frame); host.dataset.context = 'lost'; };
    const contextRestored = () => { lost = false; host.dataset.context = 'ready'; resize(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(host);
    resizeObserver.observe(host);
    interactionHost.addEventListener('pointermove', move);
    interactionHost.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', resume);
    reduced.addEventListener('change', resume);
    fine.addEventListener('change', leave);
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    renderer.domElement.addEventListener('webglcontextrestored', contextRestored);
    host.dataset.context = 'ready';
    resize();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      reveal.kill();
      observer.disconnect();
      resizeObserver.disconnect();
      interactionHost.removeEventListener('pointermove', move);
      interactionHost.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', resume);
      reduced.removeEventListener('change', resume);
      fine.removeEventListener('change', leave);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', contextRestored);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [portalCenterX, sourceBaseline]);

  return <div ref={hostRef} data-portal-field className={className} aria-hidden="true" />;
}
