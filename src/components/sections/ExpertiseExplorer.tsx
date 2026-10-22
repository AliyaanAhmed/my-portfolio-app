'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { expertise } from '@/content/expertise';
import { Reveal } from '../motion/Reveal';
import { ProductLogo } from '../ui/ProductLogo';
import { CapabilityVisual } from './CapabilityVisual';
const products = { platform: 'Power Apps', ai: 'Azure Document Intelligence', frontend: 'React' } as const;

export function ExpertiseExplorer() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const item = expertise[active];
  return <div className="expertise-explorer"><div className="capability-rows">{expertise.map((cap, i) => <Reveal key={cap.title} delay={i * 0.04} direction="left"><button aria-pressed={active === i} aria-controls="capability-preview" className={active === i ? 'active' : ''} onClick={() => setActive(i)}><span className="mono">0{i + 1}</span><span><strong>{cap.title}</strong>{active === i && <small>{cap.description}</small>}</span><ArrowUpRight size={22} /></button></Reveal>)}</div>
    <Reveal once direction="none" delay={0.1}><div className="capability-preview" id="capability-preview" aria-live="polite" data-capability={item.kind}><div className="capability-top"><span className="status-dot" /><span className="mono">{item.kind === 'frontend' ? 'FRONTEND + USER EXPERIENCE' : item.kind === 'ai' ? 'DOCUMENTS + INTELLIGENCE' : 'CONNECTED BY DESIGN'}</span><span>0{active + 1}</span></div><motion.div key={item.kind} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <div className="capability-icon"><ProductLogo name={products[item.kind]} size={36} /></div><h3>{item.label}</h3><CapabilityVisual kind={item.kind} /><ul>{item.examples.map(example => <li key={example}><Check size={14} />{example}</li>)}</ul>
    </motion.div></div></Reveal>
  </div>;
}
