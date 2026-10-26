'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

export function Reveal({ children, className = '', delay = 0, direction = 'up', once = true }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' | 'none'; once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.12, margin: '0px 0px -48px 0px', once });
  const [focused, setFocused] = useState(false);
  const visible = Boolean(reduced || inView || focused);
  return <motion.div ref={ref} className={`reveal ${className}`} data-reveal-state={visible ? 'visible' : 'hidden'}
    initial={reduced ? false : 'hidden'} animate={visible ? 'visible' : 'hidden'}
    variants={{ hidden: { opacity: 0, y: direction === 'up' ? 24 : 0, x: direction === 'left' ? -24 : direction === 'right' ? 24 : 0 }, visible: { opacity: 1, y: 0, x: 0 } }}
    transition={reduced ? { duration: 0 } : { duration: 0.6, delay: visible ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    {children}
  </motion.div>;
}
