'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { twMerge } from 'tailwind-merge';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

// Register custom cubic-bezier for the reveal uniform: (0.31, 0.75, 0.22, 1)
try {
  CustomEase.create('reveal-bezier', '0.31, 0.75, 0.22, 1');
} catch {
  // Ignore if already registered
}

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

export interface HalftoneCanvasProps {
  className?: string;
  amplitude?: number;
  timeSpeed?: number;
  pixelSize?: number;
  gooeyness?: number;
  contrast?: number;
  bias?: number;
  invert?: number;
  fg?: string;
  bg?: string;
  transparentBg?: number;
  waveAmplitude?: number;
  waveFrequency?: number;
  waveTimeSpeed?: number;
}

export default function HalftoneCanvas({
  className = '',
  amplitude = 1.53,
  timeSpeed = 0.0065,
  pixelSize = 3.0,
  gooeyness = 0.0,
  contrast = 0.9,
  bias = -0.25,
  invert = 0,
  fg = '#524D47',
  bg = '#080807',
  transparentBg = 1,
  waveAmplitude = 0.29,
  waveFrequency = 3.9,
  waveTimeSpeed = 0.0,
}: HalftoneCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number | null = null;
    let time = 0;
    let waveTime = 0;
    let isRunning = true;
    let isIntersecting = false;

    // Reveal Proxy Object animated via custom cubic-bezier (0.31, 0.75, 0.22, 1) over 3s
    const S = { reveal: 0 };
    const revealTween = gsap.to(S, {
      reveal: 1,
      duration: 3,
      ease: 'reveal-bezier',
    });

    // Camera and Geometry
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Offscreen Pass 1: Field Simulation
    const fieldScene = new THREE.Scene();
    const fieldUniforms = {
      uTime: { value: 0 },
      uAmplitude: { value: amplitude },
      uReveal: { value: 0 },
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

    // Calculate dimensions: RenderTarget width/height strictly calculate as Math.ceil(dim / pixelSize) + 1
    const getTargetDimensions = () => {
      const rect = container.getBoundingClientRect();
      const winW = typeof window !== 'undefined' ? window.innerWidth : rect.width;
      const winH = typeof window !== 'undefined' ? window.innerHeight : rect.height;
      const w = rect.width > 0 ? rect.width : winW;
      const h = rect.height > 0 ? rect.height : winH;

      const rtWidth = Math.ceil(winW / pixelSize) + 1;
      const rtHeight = Math.ceil(winH / pixelSize) + 1;

      return { w, h, rtWidth, rtHeight };
    };

    const initial = getTargetDimensions();

    // RenderTarget with RedFormat as mandated
    const renderTarget = new THREE.WebGLRenderTarget(initial.rtWidth, initial.rtHeight, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RedFormat,
      type: THREE.UnsignedByteType,
      depthBuffer: false,
      stencilBuffer: false,
    });

    // Display Pass 2: Halftone Rasterizer
    const displayScene = new THREE.Scene();
    const halftoneUniforms = {
      uFieldTex: { value: renderTarget.texture },
      uFieldRes: { value: new THREE.Vector2(initial.rtWidth, initial.rtHeight) },
      uResolution: { value: new THREE.Vector2(initial.w, initial.h) },
      uReveal: { value: 0 },
      uPixelSize: { value: pixelSize },
      uGooeyness: { value: gooeyness },
      uContrast: { value: contrast },
      uBias: { value: bias },
      uInvert: { value: invert },
      uBg: { value: new THREE.Color(bg) },
      uFg: { value: new THREE.Color(fg) },
      uTransparentBg: { value: transparentBg },
      uWaveTime: { value: 0 },
      uWaveFrequency: { value: waveFrequency },
      uWaveAmplitude: { value: waveAmplitude },
    };

    const halftoneMaterial = new THREE.ShaderMaterial({
      vertexShader: sharedVertexShader,
      fragmentShader: halftoneFragmentShader,
      uniforms: halftoneUniforms,
      transparent: transparentBg === 1,
      depthTest: false,
      depthWrite: false,
    });

    const displayMesh = new THREE.Mesh(geometry, halftoneMaterial);
    displayScene.add(displayMesh);

    // WebGL Renderer: powerPreference: "default", setPixelRatio: 1
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
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
    renderer.domElement.style.pointerEvents = 'none';

    container.appendChild(renderer.domElement);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const dim = getTargetDimensions();

      renderer.setSize(dim.w, dim.h, false);
      renderTarget.setSize(dim.rtWidth, dim.rtHeight);

      halftoneUniforms.uResolution.value.set(dim.w, dim.h);
      halftoneUniforms.uPixelSize.value = pixelSize;
      halftoneUniforms.uFieldRes.value.set(dim.rtWidth, dim.rtHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    // Render loop synced to IntersectionObserver (no time accumulation when offscreen)
    const render = () => {
      if (!isRunning || !isIntersecting) {
        animationFrameId = null;
        return;
      }

      time += timeSpeed;
      waveTime += waveTimeSpeed;

      fieldUniforms.uTime.value = time;
      fieldUniforms.uReveal.value = S.reveal;

      halftoneUniforms.uWaveTime.value = waveTime;
      halftoneUniforms.uReveal.value = S.reveal;

      // Pass 1: Render scalar field into RedFormat renderTarget
      renderer.setRenderTarget(renderTarget);
      renderer.render(fieldScene, camera);

      // Pass 2: Display pass onto screen
      renderer.setRenderTarget(null);
      renderer.render(displayScene, camera);

      animationFrameId = requestAnimationFrame(render);
    };

    // IntersectionObserver wrapping render loop
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
      revealTween.kill();

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);

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

      const gl = renderer.getContext();
      if (gl && typeof gl.getExtension === 'function') {
        const loseContext = gl.getExtension('WEBGL_lose_context');
        if (loseContext) {
          loseContext.loseContext();
        }
      }
    };
  }, [
    amplitude,
    timeSpeed,
    pixelSize,
    gooeyness,
    contrast,
    bias,
    invert,
    fg,
    bg,
    transparentBg,
    waveAmplitude,
    waveFrequency,
    waveTimeSpeed,
  ]);

  return (
    <div
      ref={containerRef}
      className={twMerge('absolute inset-0 z-0 opacity-100 overflow-hidden', className)}
      aria-hidden="true"
    />
  );
}
