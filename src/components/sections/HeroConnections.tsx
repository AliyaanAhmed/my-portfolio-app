'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { useReducedMotion } from 'motion/react';
import s from './HeroShowcase.module.css';

type AnchorRef = RefObject<HTMLDivElement | null>;

export function HeroConnections({ mode, paused, windowRef, badgeRef, codeRef }: {
  mode: number; paused: boolean; windowRef: AnchorRef; badgeRef: AnchorRef; codeRef: AnchorRef;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext('2d');
    if (!element || !context) return;
    let frame = 0;
    let visible = false;
    let width = 0;
    let height = 0;
    let last = 0;
    let elapsed = 0;
    let routes: number[][] = [];
    const color = ['39,115,91', '15,118,110', '78,112,150'][mode];

    function draw() {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      routes.forEach((route, index) => {
        const [x0,y0,x1,y1,x2,y2,x3,y3] = route;
        context.beginPath();
        context.moveTo(x0, y0);
        context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        context.strokeStyle = `rgba(${color},.32)`;
        context.lineWidth = 1;
        context.stroke();
        // Each end is a real component port, rather than a floating endpoint.
        [[x0,y0],[x3,y3]].forEach(([x,y]) => {
          context.beginPath(); context.arc(x, y, 3, 0, Math.PI * 2);
          context.fillStyle = '#fafaf7'; context.fill();
          context.strokeStyle = `rgba(${color},.7)`; context.stroke();
        });
        const t = (elapsed / (6500 + index * 750) + index * .23) % 1;
        const u = 1 - t;
        const x = u ** 3 * x0 + 3 * u ** 2 * t * x1 + 3 * u * t ** 2 * x2 + t ** 3 * x3;
        const y = u ** 3 * y0 + 3 * u ** 2 * t * y1 + 3 * u * t ** 2 * y2 + t ** 3 * y3;
        context.beginPath(); context.arc(x, y, 7, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color},.08)`; context.fill();
        context.beginPath(); context.arc(x, y, 3, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color},.8)`; context.fill();
      });
    }

    function tick(time: number) {
      if (last) elapsed += Math.min(time - last, 64);
      last = time;
      draw();
      frame = requestAnimationFrame(tick);
    }

    function sync() {
      cancelAnimationFrame(frame);
      last = 0;
      draw();
      if (visible && !document.hidden && !paused && !reduced) frame = requestAnimationFrame(tick);
    }

    const resize = new ResizeObserver(() => {
      const rect = element.getBoundingClientRect();
      width = rect.width; height = rect.height;
      const density = Math.min(window.devicePixelRatio || 1, 2);
      element.width = Math.round(width * density);
      element.height = Math.round(height * density);
      context.setTransform(density, 0, 0, density, 0, 0);
      const windowBox = windowRef.current?.getBoundingClientRect();
      const badgeBox = badgeRef.current?.getBoundingClientRect();
      const codeBox = codeRef.current?.getBoundingClientRect();
      routes = [];
      if (windowBox && codeBox) {
        const startX = windowBox.right - rect.left - 28;
        const startY = windowBox.top - rect.top;
        const endX = codeBox.right - rect.left + 1;
        const endY = codeBox.top - rect.top + codeBox.height / 2;
        if (badgeBox && badgeBox.width > 0 && badgeBox.height > 0) {
          const badgeX = badgeBox.right - rect.left + 1;
          const badgeY = badgeBox.top - rect.top + badgeBox.height / 2;
          const outsideX = Math.max(badgeX, endX) + 22;
          routes.push([startX,startY,startX,startY-26,outsideX,startY-26,badgeX,badgeY]);
          routes.push([badgeX,badgeY,outsideX,badgeY,outsideX,endY,endX,endY]);
        } else {
          const outsideX = Math.max(windowBox.right - rect.left, endX) + 18;
          routes.push([startX,startY,outsideX,startY-24,outsideX,endY,endX,endY]);
        }
      }
      sync();
    });
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    resize.observe(element);
    [windowRef.current, badgeRef.current, codeRef.current].forEach(anchor => { if (anchor) resize.observe(anchor); });
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, [mode, paused, reduced, windowRef, badgeRef, codeRef]);

  return <canvas ref={canvas} className={s.connections} aria-hidden="true" />;
}
