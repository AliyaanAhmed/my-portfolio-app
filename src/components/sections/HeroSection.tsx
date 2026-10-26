'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/content/profile';
import { HeroShowcase } from './HeroShowcase';
import s from './HeroSection.module.css';

export function HeroSection() {
  const reduced = useReducedMotion();
  return <section className={s.hero} id="home" data-nav-section="home" data-header-theme="light" aria-labelledby="hero-title">
    <div className={s.layout}>
      <motion.div className={s.introduction} initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
        <p className={s.identity}><span aria-hidden="true" />Power Platform Consultant <i aria-hidden="true" /> Software Engineer</p>
        <h1 id="hero-title"><span>Thoughtful apps.</span><span>Connected systems.</span><span className={s.accent}>Made simple.</span></h1>
        <p className={s.description}>I turn complex ideas into intuitive applications, connected workflows, and AI-powered experiences.</p>
        <div className={s.actions}><a className={s.primary} href="#work">Explore my work <ArrowUpRight size={19} /></a><a className={s.secondary} href={profile.links.linkedinMessage} target="_blank" rel="noopener noreferrer">Let’s talk <ArrowUpRight size={19} /></a></div>
        <p className={s.disciplines}><span>React & TypeScript</span><i>/</i><span>Power Platform</span><i>/</i><span>AI & Automation</span></p>
      </motion.div>
      <HeroShowcase />
    </div>
    <div className={s.footnote}><span>Enterprise applications. Human-centered experiences.</span><span>Government <i>·</i> Insurance <i>·</i> Healthcare</span></div>
  </section>;
}
