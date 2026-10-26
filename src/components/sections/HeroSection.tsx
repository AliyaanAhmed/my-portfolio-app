'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/content/profile';
import { HeroToolkit } from './HeroToolkit';
import s from './HeroSection.module.css';

export function HeroSection() {
  const reduced = useReducedMotion();
  return <section className={s.hero} id="home" data-nav-section="home" data-header-theme="light" aria-labelledby="hero-title">
    <div className={s.layout}>
      <div className={s.introduction}>
        <motion.div className={s.identity} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}><span /><b>ALIYAAN AHMED</b><i />POWER PLATFORM CONSULTANT</motion.div>
        <h1 id="hero-title"><span className={s.desktopHeadline}><span className={s.line}><motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: .7, ease: [.22,1,.36,1] }}>Complex work.</motion.span></span><span className={`${s.line} ${s.accent}`}><motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: .7, delay: .08, ease: [.22,1,.36,1] }}>Made simple.</motion.span></span></span><span className={s.mobileHeadline}><span>Thoughtful apps.</span><span>Smarter workflows.</span><span className={s.accent}>Real impact.</span></span></h1>
        <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6, delay: .15 }}><p className={s.description}>I’ve built enterprise applications for government, insurance, and healthcare using Power Platform, React, and AI.</p><div className={s.actions}><a className={s.primary} href="#work">Explore my work <ArrowUpRight size={18} /></a><a className={s.secondary} href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">Let’s talk <ArrowUpRight size={16} /></a></div></motion.div>
      </div>
      <HeroToolkit />
    </div>
  </section>;
}
