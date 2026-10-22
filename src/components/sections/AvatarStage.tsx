'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDownRight, MousePointer2, Sparkles } from 'lucide-react';
import { profile } from '@/content/profile';
import { ProductLogo } from '../ui/ProductLogo';

export function AvatarStage() {
  const stage = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const pointerX = useSpring(0, { stiffness: 105, damping: 22 });
  const pointerY = useSpring(0, { stiffness: 105, damping: 22 });
  const rotateY = useTransform(pointerX, [-1, 1], [-13, 13]);
  const rotateX = useTransform(pointerY, [-1, 1], [7, -7]);
  const rotateZ = useTransform(pointerX, [-1, 1], [-3, 3]);
  const bodyX = useTransform(pointerX, [-1, 1], [-5, 5]);
  const badgeX = useTransform(pointerX, [-1, 1], [12, -12]);
  const badgeY = useTransform(pointerY, [-1, 1], [8, -8]);
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (stage.current) stage.current.dataset.pointerTracking = !reduced && media.matches ? 'enabled' : 'disabled';
    if (reduced) return;
    const reset = () => { pointerX.set(0); pointerY.set(0); };
    const follow = (event: PointerEvent) => {
      if (!media.matches || event.pointerType === 'touch') return;
      const bounds = stage.current?.getBoundingClientRect();
      if (!bounds || bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      pointerX.set(Math.max(-1, Math.min(1, (event.clientX - (bounds.left + bounds.width / 2)) / (window.innerWidth / 2))));
      pointerY.set(Math.max(-1, Math.min(1, (event.clientY - (bounds.top + bounds.height * 0.35)) / (window.innerHeight / 2))));
    };
    window.addEventListener('pointermove', follow, { passive: true }); document.addEventListener('pointerleave', reset); window.addEventListener('blur', reset);
    return () => { window.removeEventListener('pointermove', follow); document.removeEventListener('pointerleave', reset); window.removeEventListener('blur', reset); };
  }, [reduced, pointerX, pointerY]);

  return <div ref={stage} className="avatar-stage">
    <div className="avatar-grid" aria-hidden="true" /><div className="avatar-orbit orbit-one" aria-hidden="true" /><div className="avatar-orbit orbit-two" aria-hidden="true" />
    <span className="stage-coordinate mono">01 / THE HUMAN BEHIND THE WORK</span>
    <motion.div className="avatar-scene" style={reduced ? { y: 0 } : { y }} role="img" aria-label="Illustrated avatar of Aliyaan Ahmed that responds to your cursor">
      <div className="avatar-ground" />
      <motion.div className="avatar-body" style={reduced ? { x: 0 } : { x: bodyX }} aria-hidden="true"><Image src={profile.avatar} width={1024} height={1536} alt="" priority sizes="(max-width: 600px) 300px, 400px" /></motion.div>
      <motion.div className="avatar-head" data-testid="avatar-head" style={reduced ? { rotateY: 0, rotateX: 0, rotateZ: 0 } : { rotateY, rotateX, rotateZ }} aria-hidden="true"><Image src={profile.avatar} width={1024} height={1536} alt="" priority sizes="(max-width: 600px) 300px, 400px" /></motion.div>
    </motion.div>
    <motion.div className="orbit-label label-apps" style={reduced ? undefined : { x: badgeX, y: badgeY }}><span className="platform-icon"><ProductLogo name="Power Apps" size={25} /></span><span>Power Apps<small>Built around your work.</small></span><ArrowDownRight size={14} /></motion.div>
    <motion.div className="orbit-label label-automate" style={reduced ? undefined : { x: bodyX, y: badgeY }}><span className="platform-icon blue"><ProductLogo name="Power Automate" size={25} /></span><span>Power Automate<small>Less repetition. More flow.</small></span></motion.div>
    <motion.div className="orbit-label label-ai" style={reduced ? undefined : { x: badgeX }}><Sparkles size={17} /><span>AI, with purpose.</span><span className="status-dot" /></motion.div>
    <span className="avatar-interaction"><MousePointer2 size={13} /> A little curious. Just like me.<span>MOVE YOUR CURSOR ↗</span></span>
  </div>;
}
