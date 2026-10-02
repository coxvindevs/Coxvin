export interface CarouselEngine {
  navigate(direction: number): void;
  closeFocus(): void;
  destroy(): void;
}
export function createCarousel(mount: HTMLElement, options: {
  projects: { brand: string; description: string; image: { src: string } }[];
  propsRef: { current: Record<string, string | number | boolean> };
  cursorElement: HTMLElement | null;
  staticMode: boolean;
  onActiveChange(index: number): void;
  onFocusChange(focused: boolean): void;
  onEntryDone(done: boolean): void;
  onReady(): void;
  onCycleComplete?(): void;
}): CarouselEngine;
