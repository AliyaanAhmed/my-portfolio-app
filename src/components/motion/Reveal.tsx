'use client';

import { motion, useReducedMotion } from 'motion/react';

export function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={`reveal ${className}`} initial={false}
    whileInView={reduced ? {} : { y: [42, 0], opacity: [0.25, 1], filter: ['blur(4px)', 'blur(0px)'] }}
    viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
