'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { AvatarStage } from './AvatarStage';
import { profile } from '@/content/profile';
import { ProductLogo } from '../ui/ProductLogo';
import s from './HeroSection.module.css';

export function HeroSection() {
  const reduced = useReducedMotion();
  return <section className={s.hero} id="home" data-nav-section="home" data-header-theme="light" aria-labelledby="hero-title">
    <div className={s.layout}>
      <div className={s.introduction}>
        <motion.div className={s.identity} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}><span />ALIYAAN AHMED <i /> POWER PLATFORM CONSULTANT</motion.div>
        <h1 id="hero-title"><span className={s.line}><motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: .7, ease: [.22,1,.36,1] }}>Complex work.</motion.span></span><span className={`${s.line} ${s.accent}`}><motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: .7, delay: .08, ease: [.22,1,.36,1] }}>Made simple.</motion.span></span></h1>
        <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6, delay: .15 }}><p className={s.description}>I build thoughtful applications and smarter workflows.<br className={s.desktopBreak} /> With Power Platform, React, and AI.</p><div className={s.actions}><a className={s.primary} href="#work">Explore my work <ArrowUpRight size={18} /></a><a className={s.secondary} href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">Let’s talk <ArrowUpRight size={16} /></a></div></motion.div>
      </div>
      <div className={s.artwork}><AvatarStage /></div>
      <div className={s.toolkit} aria-label="Core technologies"><div className={s.toolkitLabel}>MY EVERYDAY<br className={s.desktopBreak} /> TOOLKIT</div><ul>{(['Power Apps', 'Power Automate', 'Power Pages', 'Code Apps', 'React', 'AI', 'Azure'] as const).map(name => <li key={name}><ProductLogo name={name} size={29} /><span>{name}</span></li>)}</ul></div>
    </div>
  </section>;
}
