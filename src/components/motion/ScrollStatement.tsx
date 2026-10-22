'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

function Word({ children, progress, start, end }: { children: string; progress: MotionValue<number>; start: number; end: number }) {
  const reduced = useReducedMotion();
  const opacity = useTransform(progress, [start, end], [0.55, 1]);
  return <motion.span style={reduced ? { opacity: 1 } : { opacity }}>{children}{' '}</motion.span>;
}

export function ScrollStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.45'] });
  const words = 'Technology should take the complexity out of work. Not add another layer to it.'.split(' ');
  return <p ref={ref} className="scroll-statement">{words.map((word, i) => <Word key={`${word}-${i}`} progress={scrollYProgress} start={i / words.length * 0.8} end={(i + 1) / words.length * 0.8} >{word}</Word>)}</p>;
}
