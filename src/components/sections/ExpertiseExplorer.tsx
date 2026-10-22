'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Braces, Check, Database, Layers3, PenTool, Sparkles, UserRoundCheck, Workflow } from 'lucide-react';
import { expertise } from '@/content/expertise';
import { Reveal } from '../motion/Reveal';
import { ProductLogo, productLogos, type ProductName } from '../ui/ProductLogo';
const icons = [Layers3, Workflow, Sparkles, Braces, PenTool];
const products = ['Power Apps', 'Power Automate', 'AI Builder', 'Code Apps', null] as const;

export function ExpertiseExplorer() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const item = expertise[active]; const Icon = icons[active];
  return <div className="expertise-explorer"><div className="capability-rows">{expertise.map((cap, i) => <Reveal key={cap.title} delay={i * 0.04} direction="left"><button aria-pressed={active === i} aria-controls="capability-preview" className={active === i ? 'active' : ''} onClick={() => setActive(i)}><span className="mono">0{i + 1}</span><span><strong>{cap.title}</strong>{active === i && <small>{cap.description}</small>}</span><ArrowUpRight size={22} /></button></Reveal>)}</div>
    <Reveal direction="right" delay={0.1}><div className="capability-preview" id="capability-preview" aria-live="polite" data-capability={item.kind}><div className="capability-top"><span className="status-dot" /><span className="mono">CONNECTED BY DESIGN</span><span>0{active + 1}</span></div><AnimatePresence mode="wait"><motion.div key={active} initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? {} : { opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
      <div className="capability-icon">{products[active] ? <ProductLogo name={products[active]} size={36} /> : <Icon size={32} strokeWidth={1.4} />}</div><h3>{item.label}</h3><div className="capability-diagram">{item.nodes.map((node, i) => <div key={node} className={`diagram-row row-${i}`}><span className="diagram-node-icon">{node in productLogos ? <ProductLogo name={node as ProductName} size={24} /> : i === 0 ? <Icon size={19} /> : i === 1 ? <Database size={19} /> : <UserRoundCheck size={19} />}</span><span>{node}</span><Check size={13} />{i < 2 && <span className="diagram-link"><ArrowDown size={12} /></span>}</div>)}</div><ul>{item.examples.slice(0, 2).map(example => <li key={example}><Check size={14} />{example}</li>)}</ul><div className="capability-code">{item.code}</div>
    </motion.div></AnimatePresence></div></Reveal>
  </div>;
}
