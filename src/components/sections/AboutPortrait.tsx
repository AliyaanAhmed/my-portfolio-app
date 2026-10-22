'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/content/profile';

export function AboutPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [65, -45]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 3]);
  return <div ref={ref} className="about-portrait"><div className="portrait-grid" /><span className="portrait-topline mono">THE PERSON, NOT JUST THE STACK.</span><span className="portrait-background-type" aria-hidden="true">AA.</span><motion.div className="portrait-image" style={reduced ? { y: 0, rotate: 0 } : { y, rotate }}><Image src={profile.portrait!} alt="Syed Aliyaan Ahmed wearing a black shirt" width={739} height={1024} sizes="(max-width: 600px) 90vw, 45vw" /></motion.div><div className="portrait-caption"><span><span className="status-dot" /> KARACHI, PAKISTAN<small>A human behind every interface.</small></span><ArrowUpRight size={26} /></div></div>;
}
