'use client';

import { useId, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { ProductLogo, type ProductName } from '@/components/ui/ProductLogo';
import s from './HeroToolkit.module.css';

const tools: { name: ProductName; category: string; description: string; path: ProductName[] }[] = [
  { name: 'Power Apps', category: 'BUSINESS APPLICATIONS', description: 'Role-based enterprise apps, built around the way teams work.', path: ['Power Apps', 'Dataverse', 'Power Automate'] },
  { name: 'Power Automate', category: 'WORKFLOW AUTOMATION', description: 'Approvals, notifications, and handoffs that keep work moving.', path: ['Power Pages', 'Power Automate', 'AI Builder'] },
  { name: 'Power Pages', category: 'ENTERPRISE PORTALS', description: 'Clear, accessible portals connected to business data.', path: ['Power Pages', 'Dataverse', 'Power Apps'] },
  { name: 'Code Apps', category: 'CUSTOM EXPERIENCES', description: 'Custom React and TypeScript experiences on Power Platform.', path: ['React', 'Code Apps', 'Dataverse'] },
  { name: 'React', category: 'FRONTEND ARCHITECTURE', description: 'Reusable components, typed interfaces, and thoughtful interactions.', path: ['React', 'TypeScript', 'Azure'] },
  { name: 'AI', category: 'INTELLIGENT ASSISTANCE', description: 'Document context and useful suggestions, with people in control.', path: ['Azure Document Intelligence', 'AI Builder', 'Power Automate'] },
  { name: 'Azure', category: 'CLOUD & AI INTEGRATION', description: 'Connect cloud services and document intelligence to applications.', path: ['Azure', 'Azure Document Intelligence', 'Code Apps'] },
];

export function HeroToolkit() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: .15 });
  const playing = visible && !paused && !reduced;
  const id = useId();
  const tool = tools[active];

  return <motion.div ref={ref} className={s.panel} initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .15 }} aria-label="Interactive technology toolkit">
    <div className={s.top}><span className={s.title}>MY EVERYDAY TOOLKIT</span><span className={s.instruction}>Select a tool <ArrowUpRight size={12} /></span></div>
    <div className={s.tools} role="group" aria-label="Choose a technology">{tools.map((item, index) => <button key={item.name} className={s.tool} onClick={() => setActive(index)} aria-pressed={active === index} aria-controls={`${id}-detail`}><ProductLogo name={item.name} size={32} /><span>{item.name}</span>{active === index && <motion.span className={s.activeBorder} layoutId={`${id}-active`} transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 340, damping: 32 }} aria-hidden="true" />}</button>)}<div className={s.gridNote} aria-hidden="true"><span>Different tools.</span><strong>Connected thinking.</strong></div></div>
    <div id={`${id}-detail`} className={s.detail} aria-live="polite" aria-atomic="true"><motion.div key={tool.name} initial={reduced ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }}><span className={s.category}>{tool.category}</span><h2>{tool.name === 'AI' ? 'AI assistance' : tool.name}</h2><p>{tool.description}</p></motion.div></div>
    <div className={s.connection} aria-label={`${tool.path.join(' connected to ')} — illustrative integration`}><div className={s.connectionHead}><span>CONNECTED IN PRACTICE</span><button className={s.pause} onClick={() => setPaused(value => !value)} disabled={Boolean(reduced)} aria-label={paused ? 'Play connection animation' : 'Pause connection animation'}>{paused || reduced ? <Play size={12} /> : <Pause size={12} />}</button></div><div className={s.path}>{tool.path.map((name, index) => <div className={s.pathItem} key={`${tool.name}-${index}`}><div className={s.node}><ProductLogo name={name} size={25} /><span>{name}</span></div>{index < 2 && <span className={s.connector} aria-hidden="true"><motion.i key={`${tool.name}-${index}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={reduced ? { duration: 0 } : { duration: .55, delay: index * .15 }} />{playing && <motion.b initial={{ left: '0%', opacity: 0 }} animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }} transition={{ duration: 2, delay: index * .6, repeat: Infinity, repeatDelay: .7, ease: 'linear' }} />}</span>}</div>)}</div></div>
  </motion.div>;
}
