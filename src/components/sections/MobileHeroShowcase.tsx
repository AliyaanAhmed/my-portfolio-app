'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, FileText, LayoutGrid, Network, ShieldCheck, Sparkles } from 'lucide-react';
import { ProductLogo, type ProductName } from '@/components/ui/ProductLogo';
import s from './MobileHeroShowcase.module.css';

const scenes: { label: string; icon: typeof LayoutGrid; title: string; left: ProductName; right: ProductName; heading: string; rows: string[]; caption: string }[] = [
  { label: 'Apps', icon: LayoutGrid, title: 'Connected workspace', left: 'React', right: 'Dataverse', heading: 'Workspace', rows: ['Applications', 'Shared data'], caption: 'Built to connect.' },
  { label: 'Automate', icon: Network, title: 'Connected approval workflow', left: 'Power Apps', right: 'Power Automate', heading: 'Approval flow', rows: ['Request received', 'Ready for review'], caption: 'Work, in flow.' },
  { label: 'AI', icon: Sparkles, title: 'AI-assisted document review', left: 'Azure Document Intelligence', right: 'AI Builder', heading: 'AI assistance', rows: ['Read document', 'Suggest next step'], caption: 'Clarity from context.' },
];
const connections = ['M 52 91 C 79 91 70 119 90 119', 'M 230 119 C 251 119 246 104 268 104'];

export function MobileHeroShowcase() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const scene = scenes[active];

  return <div className={s.showcase}>
    <div className={s.card}>
      <div className={s.tabs} role="tablist" aria-label="Explore apps, automation, and AI">
        {scenes.map((item, index) => <button key={item.label} ref={element => { tabs.current[index] = element; }} type="button" role="tab" id={`mobile-hero-tab-${index}`} aria-selected={active === index} aria-controls="mobile-hero-scene" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
          let next = active;
          if (event.key === 'ArrowRight') next = (active + 1) % scenes.length;
          else if (event.key === 'ArrowLeft') next = (active + 2) % scenes.length;
          else if (event.key === 'Home') next = 0;
          else if (event.key === 'End') next = 2;
          else return;
          event.preventDefault(); setActive(next); tabs.current[next]?.focus();
        }}><item.icon size={17} /><span>{item.label}</span></button>)}
      </div>
      <div className={s.scene} id="mobile-hero-scene" role="tabpanel" aria-labelledby={`mobile-hero-tab-${active}`} tabIndex={0}>
        <svg key={`connections-${active}`} className={s.connections} viewBox="0 0 320 200" aria-hidden="true">
          {connections.map((path, index) => <g key={path}><path d={path} fill="none" stroke="#7da991" strokeWidth="1.5" />{!reduced && <motion.circle key={`${active}-${index}`} r="3" fill="#3a8c65" initial={{ opacity: 0 }} animate={{ opacity: [0,1,1,0] }} transition={{ duration: 2.4, delay: index * .2 }}><animateMotion path={path} dur="2.4s" begin={`${index * .2}s`} fill="freeze" /></motion.circle>}</g>)}
        </svg>
        <div className={`${s.product} ${s.left}`} role="img" aria-label={scene.left}><ProductLogo name={scene.left} size={29} /></div>
        <motion.div key={`preview-${active}`} className={s.miniWindow} initial={reduced ? false : { opacity: .6, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }} aria-label={scene.title}>
          <div className={s.chrome}><span /><span /><span /><small>Concept</small></div>
          <div className={s.miniBody}><div className={s.miniRail} aria-hidden="true"><LayoutGrid size={13} /><FileText size={13} /><ShieldCheck size={13} /></div><div className={s.miniContent}><strong>{scene.heading}</strong>{scene.rows.map(row => <span key={row}>{row}</span>)}<b><Check size={11} />{active === 2 ? 'Human review' : 'Connected'}</b></div></div>
        </motion.div>
        <div className={`${s.product} ${s.right}`} role="img" aria-label={scene.right}><ProductLogo name={scene.right} size={29} /></div>
      </div>
      <div className={s.footer}><p aria-live="polite">{scene.caption}</p><button type="button" aria-label={`Explore ${scenes[(active + 1) % scenes.length].label}`} onClick={() => setActive(value => (value + 1) % scenes.length)}><ArrowUpRight size={22} /></button></div>
    </div>
    <div className={s.pagination} role="group" aria-label="Choose a concept">{scenes.map((item,index) => <button key={item.label} type="button" aria-label={`Show ${item.label}`} aria-pressed={active === index} onClick={() => setActive(index)}><span /></button>)}</div>
    <p className={s.hint}>Tap to explore</p>
    <p className={s.signature}>Power Platform + React</p>
  </div>;
}
