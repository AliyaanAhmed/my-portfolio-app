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
        <motion.div className={s.identity} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}><span /><b className={s.identityName}>ALIYAAN AHMED</b><i /> POWER PLATFORM CONSULTANT</motion.div>
        <h1 id="hero-title"><span className={s.desktopHeadline}><span className={s.line}><motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: .7, ease: [.22,1,.36,1] }}>Complex work.</motion.span></span><span className={`${s.line} ${s.accent}`}><motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: .7, delay: .08, ease: [.22,1,.36,1] }}>Made simple.</motion.span></span></span><span className={s.mobileHeadline}><span>Thoughtful apps.</span><span>Smarter workflows.</span><span className={s.accent}>Real impact.</span></span></h1>
        <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6, delay: .15 }}><p className={s.description}><span className={s.desktopDescription}>I build thoughtful applications and smarter workflows.<br className={s.desktopBreak} /> With Power Platform, React, and AI.</span><span className={s.mobileDescription}>I turn complex ideas into intuitive experiences with Power Platform, React, and AI.</span></p><div className={s.actions}><a className={s.primary} href="#work">Explore my work <ArrowUpRight size={18} /></a><a className={s.secondary} href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">Let’s talk <ArrowUpRight size={16} /></a></div></motion.div>
      </div>
      <div className={s.artwork}><div className={s.mobileSystem} aria-hidden="true"><svg className={s.neuralNetwork} viewBox="0 0 360 380" fill="none"><ellipse cx="180" cy="186" rx="137" ry="141" fill="#eef3e9" /><g stroke="#a3bcad" strokeWidth="1"><path d="M33 135 68 81 126 53 180 34 239 62 293 98 330 157 309 218 329 269 275 309 221 329 154 342 88 314 40 262 53 202 33 135Z" /><path d="m68 81 37 78-52 43 47 50-12 62m38-261-21 106 75 27 59-124m-59-28v152l113-88m37 59-150 29 129 32-34 91m54-40-89-14-19 74m-67 13 26-156-80 66 54 90" /></g><g fill="#789e88" stroke="#fafaf7" strokeWidth="4">{[[33,135],[68,81],[126,53],[180,34],[239,62],[293,98],[330,157],[309,218],[329,269],[275,309],[221,329],[154,342],[88,314],[40,262],[53,202],[105,159],[100,252],[240,255]].map(([cx,cy])=><circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={4} />)}</g><g className={s.signalNodes} fill="#4d8368"><circle cx="68" cy="81" r="4" /><circle cx="330" cy="157" r="4" /><circle cx="88" cy="314" r="4" /></g></svg></div><AvatarStage /></div>
      <div className={s.toolkit} aria-label="Core technologies"><div className={s.toolkitLabel}><span className={s.desktopDescription}>MY EVERYDAY TOOLKIT</span><span className={s.mobileDescription}>TOOLS I BUILD WITH</span></div><ul>{(['Power Apps', 'Power Automate', 'Power Pages', 'Code Apps', 'React', 'AI', 'Azure'] as const).map(name => <li key={name}><ProductLogo name={name} size={29} /><span>{name}</span></li>)}</ul></div>
    </div>
  </section>;
}
