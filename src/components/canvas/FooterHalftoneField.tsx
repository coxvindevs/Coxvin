'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const sharedVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fieldFragmentShader = `
precision highp float;
uniform float uTime;
uniform float uAmplitude;
uniform float uReveal;
varying vec2 vUv;

void main() {
  vec2 c = 2.0 * vUv - 1.0;
  float ds = uAmplitude * uReveal;
  c += ds * 0.4 * sin(c.yx + vec2(1.2, 3.4) + uTime);
  c += ds * 0.2 * sin(5.2 * c.yx + vec2(3.5, 0.4) + uTime);
  c += ds * 0.3 * sin(3.5 * c.yx + vec2(1.2, 3.1) + uTime);
  c += ds * 1.6 * sin(0.4 * c.yx + vec2(0.8, 2.4) + uTime);

  float L = length(c);
  float v = 0.0;
  for (int i = 0; i < 4; i++) {
    v = mix(v, float(i) / 3.0, cos(float(i) * L));
  }
  gl_FragColor = vec4(clamp(v, 0.0, 1.0), 0.0, 0.0, 1.0);
}
`;

const halftoneFragmentShader = `
precision highp float;
uniform sampler2D uFieldTex;
uniform vec2 uFieldRes;
uniform vec2 uResolution;
uniform float uReveal;
uniform float uPixelSize;
uniform float uGooeyness;
uniform float uContrast;
uniform float uBias;
uniform int uInvert;
uniform vec3 uBg;
uniform vec3 uFg;
uniform int uTransparentBg;
uniform float uWaveTime;
uniform float uWaveFrequency;
uniform float uWaveAmplitude;
varying vec2 vUv;

float lumaToRadius(float luma, float pixelSize, float biasOffset) {
  float v = clamp((luma - 0.5 + uBias + biasOffset) * uContrast + 0.5, 0.0, 1.0);
  if (uInvert == 1) v = 1.0 - v;
  return v * pixelSize * 0.6 + pixelSize * 0.05;
}

float smin(float a, float b, float k) {
  if (k <= 0.001) return min(a, b);
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}

void main() {
  vec2 pixelCoord = vUv * uResolution;
  vec2 baseCellIndex = floor(pixelCoord / uPixelSize);
  float minDist = 1.0e5;
  float smoothK = uGooeyness * 1.5;

  const int R = 1;
  for (int dx = -R; dx <= R; dx++) {
    for (int dy = -R; dy <= R; dy++) {
      vec2 cellIndex = baseCellIndex + vec2(float(dx), float(dy));
      if (mod(cellIndex.x + cellIndex.y, 2.0) > 0.5) continue;

      vec2 cellCenter = (cellIndex + 0.5) * uPixelSize;
      vec2 fieldUv    = (cellIndex + 0.5) / uFieldRes;
      float luma      = texture2D(uFieldTex, fieldUv).r;

      float cellY     = cellCenter.y / uResolution.y;
      float wavePhase = cellY * uWaveFrequency * 6.2831853 - uWaveTime;
      float waveBias  = sin(wavePhase) * uWaveAmplitude;

      float dist   = length(pixelCoord - cellCenter);
      float radius = lumaToRadius(luma, uPixelSize, waveBias);
      minDist = smin(minDist, dist - radius, smoothK * uPixelSize);
    }
  }

  float aa    = max(fwidth(minDist), 0.0001);
  float shape = 1.0 - smoothstep(-aa, aa, minDist);

  if (uTransparentBg == 1) {
    gl_FragColor = vec4(uFg * uReveal, shape * uReveal);
  } else {
    vec3 color = mix(uBg, uFg, shape);
    gl_FragColor = vec4(color * uReveal, 1.0);
  }
}
`;

export default function FooterHalftoneField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorPillRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number | null = null;
    let time = 0;
    let isRunning = true;
    let isIntersecting = false;

    // Target parameters from specification:
    // Base: amplitude 0.8, timeSpeed 0.0045
    // Held: amplitude 1.6 (2x), timeSpeed 0.00675 (1.5x)
    // Lerp speed: 0.03
    let currentAmplitude = 0.8;
    let targetAmplitude = 0.8;
    let currentTimeSpeed = 0.0045;
    let targetTimeSpeed = 0.0045;
    const lerpSpeed = 0.03;

    const pixelSize = 4.0;
    const gooeyness = 0.58;
    const contrast = 1.5;
    const bias = 0.0;
    const invert = 1;
    const bg = '#E8E8E3';
    const fg = '#080807';

    // Camera & Plane
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Pass 1: Field Simulation
    const fieldScene = new THREE.Scene();
    const fieldUniforms = {
      uTime: { value: 0 },
      uAmplitude: { value: currentAmplitude },
      uReveal: { value: 1 },
    };

    const fieldMaterial = new THREE.ShaderMaterial({
      vertexShader: sharedVertexShader,
      fragmentShader: fieldFragmentShader,
      uniforms: fieldUniforms,
      depthTest: false,
      depthWrite: false,
    });

    const fieldMesh = new THREE.Mesh(geometry, fieldMaterial);
    fieldScene.add(fieldMesh);

    // Calculate dimensions
    const getTargetDimensions = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width > 0 ? rect.width : window.innerWidth;
      const h = rect.height > 0 ? rect.height : 288;
      const rtWidth = Math.ceil(w / pixelSize) + 1;
      const rtHeight = Math.ceil(h / pixelSize) + 1;
      return { w, h, rtWidth, rtHeight };
    };

    const initial = getTargetDimensions();

    const renderTarget = new THREE.WebGLRenderTarget(initial.rtWidth, initial.rtHeight, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RedFormat,
      type: THREE.UnsignedByteType,
      depthBuffer: false,
      stencilBuffer: false,
    });

    // Pass 2: Halftone Rasterizer
    const displayScene = new THREE.Scene();
    const halftoneUniforms = {
      uFieldTex: { value: renderTarget.texture },
      uFieldRes: { value: new THREE.Vector2(initial.rtWidth, initial.rtHeight) },
      uResolution: { value: new THREE.Vector2(initial.w, initial.h) },
      uReveal: { value: 1 },
      uPixelSize: { value: pixelSize },
      uGooeyness: { value: gooeyness },
      uContrast: { value: contrast },
      uBias: { value: bias },
      uInvert: { value: invert },
      uBg: { value: new THREE.Color(bg) },
      uFg: { value: new THREE.Color(fg) },
      uTransparentBg: { value: 0 },
      uWaveTime: { value: 0 },
      uWaveFrequency: { value: 1.0 },
      uWaveAmplitude: { value: 0.0 },
    };

    const halftoneMaterial = new THREE.ShaderMaterial({
      vertexShader: sharedVertexShader,
      fragmentShader: halftoneFragmentShader,
      uniforms: halftoneUniforms,
      transparent: false,
      depthTest: false,
      depthWrite: false,
    });

    const displayMesh = new THREE.Mesh(geometry, halftoneMaterial);
    displayScene.add(displayMesh);

    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: false,
      powerPreference: 'default',
      preserveDrawingBuffer: false,
    });

    renderer.setPixelRatio(1);
    renderer.setSize(initial.w, initial.h, false);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.pointerEvents = 'auto';
    renderer.domElement.style.cursor = 'grab';

    container.appendChild(renderer.domElement);

    // Hold interaction listeners
    const onPointerDown = () => {
      targetAmplitude = 1.6;
      targetTimeSpeed = 0.00675;
      renderer.domElement.style.cursor = 'grabbing';
      if (cursorPillRef.current) {
        gsap.to(cursorPillRef.current, { scale: 0.9, duration: 0.4, ease: 'power2.out' });
      }
    };

    const onPointerUp = () => {
      targetAmplitude = 0.8;
      targetTimeSpeed = 0.0045;
      renderer.domElement.style.cursor = 'grab';
      if (cursorPillRef.current) {
        gsap.to(cursorPillRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    // Cursor follower for fine pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    let xTo: ((v: number) => void) | null = null;
    let yTo: ((v: number) => void) | null = null;

    if (isFinePointer && cursorPillRef.current) {
      xTo = gsap.quickTo(cursorPillRef.current, 'x', { duration: 0.4, ease: 'power3.out' });
      yTo = gsap.quickTo(cursorPillRef.current, 'y', { duration: 0.4, ease: 'power3.out' });
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isFinePointer) return;
      const rect = container.getBoundingClientRect();
      const inBounds =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      setIsHovered(inBounds);
      if (inBounds && xTo && yTo) {
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      }
    };

    const onMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('mouseleave', onMouseLeave);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const dim = getTargetDimensions();
      renderer.setSize(dim.w, dim.h, false);
      renderTarget.setSize(dim.rtWidth, dim.rtHeight);
      halftoneUniforms.uResolution.value.set(dim.w, dim.h);
      halftoneUniforms.uFieldRes.value.set(dim.rtWidth, dim.rtHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Render loop
    const render = () => {
      if (!isRunning || !isIntersecting) {
        animationFrameId = null;
        return;
      }

      // Smoothly lerp towards target parameters
      currentAmplitude += (targetAmplitude - currentAmplitude) * lerpSpeed;
      currentTimeSpeed += (targetTimeSpeed - currentTimeSpeed) * lerpSpeed;

      time += currentTimeSpeed;

      fieldUniforms.uTime.value = time;
      fieldUniforms.uAmplitude.value = currentAmplitude;

      // Pass 1: Render field to renderTarget
      renderer.setRenderTarget(renderTarget);
      renderer.render(fieldScene, camera);

      // Pass 2: Render halftone output to screen
      renderer.setRenderTarget(null);
      renderer.render(displayScene, camera);

      animationFrameId = requestAnimationFrame(render);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !animationFrameId && isRunning) {
          animationFrameId = requestAnimationFrame(render);
        } else if (!isIntersecting && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      { threshold: 0 }
    );

    intersectionObserver.observe(container);

    // Cleanup
    return () => {
      isRunning = false;
      isIntersecting = false;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);

      intersectionObserver.disconnect();
      resizeObserver.disconnect();

      fieldScene.remove(fieldMesh);
      displayScene.remove(displayMesh);

      geometry.dispose();
      fieldMaterial.dispose();
      halftoneMaterial.dispose();
      renderTarget.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden bg-[#181715]"
      aria-hidden="true"
    >
      {/* Floating cursor label for fine pointer */}
      <div
        ref={cursorPillRef}
        className={`pointer-events-none absolute -top-4 -left-16 z-30 hidden md:flex items-center justify-center px-3 py-1 rounded-full bg-[#080807]/90 text-[#E8E8E3] text-[11px] font-mono tracking-widest uppercase border border-[#E8E8E3]/20 shadow-lg transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        Hold to disrupt
      </div>
    </div>
  );
}
