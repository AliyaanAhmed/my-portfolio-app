'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, GraduationCap, MapPin } from 'lucide-react';
import { education, profile } from '@/content/profile';
import { Reveal } from '@/components/motion/Reveal';
import { handleTabKeys } from './tabs';
import s from './LowerSections.module.css';

export function AboutPanel() {
  const [artwork, setArtwork] = useState(false); const [tab, setTab] = useState(0); const reduced = useReducedMotion(); const id = useId();
  return <div className={s.aboutPanel}><Reveal className={s.portraitReveal} direction="left"><div className={s.portraitFrame}><div className={s.portraitCircle} /><AnimatePresence mode="wait"><motion.div className={s.portraitLayer} key={String(artwork)} initial={reduced ? false : { opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={reduced ? {} : { opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }}><Image src={artwork ? profile.avatar : profile.portrait!} alt={artwork ? 'Illustrated avatar of Aliyaan Ahmed' : 'Portrait of Aliyaan Ahmed'} width={artwork ? 1024 : 739} height={artwork ? 1536 : 1024} sizes="(max-width: 900px) 90vw, 45vw" className={artwork ? s.avatarPortrait : s.realPortrait} /></motion.div></AnimatePresence><div className={s.portraitControls} role="group" aria-label="Portrait view"><button aria-pressed={!artwork} onClick={() => setArtwork(false)}>Photo</button><button aria-pressed={artwork} onClick={() => setArtwork(true)}>Illustration</button></div><span className={s.portraitLocation}><MapPin size={12} /> Karachi, Pakistan</span></div></Reveal>
    <Reveal className={s.aboutInformation}><div className={s.aboutTabs} role="tablist" aria-label="About Aliyaan">{['About me', 'Education'].map((label, i) => <button key={label} role="tab" id={`${id}-tab-${i}`} aria-selected={tab === i} aria-controls={`${id}-panel`} tabIndex={tab === i ? 0 : -1} onClick={() => setTab(i)} onKeyDown={event => handleTabKeys(event, i, 2, setTab)}>{label}</button>)}</div><div className={s.aboutTabPanel} role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${tab}`}>{tab === 0 ? <><span className={s.smallLabel}>THE PERSON BEHIND THE WORK</span><h3>I like making<br />complex things click.</h3><p>I build applications and automations that make work easier. Power Platform is my core; frontend engineering and thoughtful design connect the rest.</p><div className={s.aboutFocus}><span>Applications</span><span>Automation</span><span>Human experience</span></div></> : <><span className={s.smallLabel}>ALWAYS LEARNING</span><h3>A foundation<br />to keep building on.</h3><div className={s.educationItems}>{education.map(item => <div key={item.school}><GraduationCap size={20} /><span><strong>{item.school}</strong><span>{item.course}</span><small>{item.dates}</small></span></div>)}</div></>}</div><a className={s.caseLink} href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">More on LinkedIn <ArrowUpRight size={18} /></a></Reveal>
  </div>;
}
