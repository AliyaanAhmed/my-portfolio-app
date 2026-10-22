'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { AvatarStage } from './AvatarStage';
import { Action } from '../ui';
import { profile } from '@/content/profile';

export function HeroSection() {
  const reduced = useReducedMotion();
  return <section className="hero-v2" id="home" data-nav-section="home" data-header-theme="light" aria-labelledby="hero-title">
    <div className="container hero-layout"><div className="hero-introduction">
      <motion.div className="hero-eyebrow eyebrow" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}><span className="status-dot" /> HI, I’M ALIYAAN AHMED</motion.div>
      <h1 id="hero-title"><span className="hero-line"><motion.span initial={reduced ? false : { y: '100%' }} animate={{ y: '0%' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>Complex work.</motion.span></span><span className="hero-line accent"><motion.span initial={reduced ? false : { y: '100%' }} animate={{ y: '0%' }} transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>Made simple<span className="hero-period">.</span></motion.span></span></h1>
      <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
        <p>Power Platform, React, and AI.<br />Thoughtful interfaces. Connected workflows.</p>
        <div className="hero-actions"><Action href="#work">See my work</Action><a className="text-link" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">Let’s connect <ArrowUpRight size={17} /></a></div>
        <div className="hero-location"><MapPin size={13} /><span>Karachi, Pakistan</span></div>
      </motion.div>
    </div><AvatarStage /></div>
  </section>;
}
