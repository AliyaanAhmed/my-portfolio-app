'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, FileText, Pause, Play, ScanText, ShieldCheck } from 'lucide-react';
import s from './HeroWorkflow.module.css';

const stages = [
  { label: 'Request', icon: FileText, title: 'Start with a clear request.', detail: 'One place to submit the information that matters.' },
  { label: 'AI review', icon: ScanText, title: 'Let AI prepare the next step.', detail: 'Extract key details and flag what needs attention.' },
  { label: 'Approval', icon: ShieldCheck, title: 'Keep people in control.', detail: 'Route to the right approver, with a clear audit trail.' },
];

export function HeroWorkflow() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (active === stages.length - 1) setPlaying(false);
      else setActive(active + 1);
    }, 1900);
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  const current = stages[active];
  const CurrentIcon = current.icon;

  return <div className={s.demo} role="group" aria-label="Interactive example workflow">
    <div className={s.toolbar}>
      <span><i aria-hidden="true" />A workflow, simplified</span>
      <button type="button" onClick={() => {
        if (playing) setPlaying(false);
        else { setActive(0); setPlaying(true); }
      }} aria-label={playing ? 'Pause workflow demo' : 'Play workflow demo'}>
        {playing ? <Pause size={13} /> : <Play size={13} />}<span>{playing ? 'Pause' : 'Play demo'}</span>
      </button>
    </div>
    <div className={s.stages}>
      <div className={s.track} aria-hidden="true"><motion.div animate={{ scaleX: active / (stages.length - 1) }} transition={{ duration: reduced ? 0 : .5 }} /></div>
      {stages.map((stage, index) => {
        const Icon = stage.icon;
        return <button key={stage.label} type="button" className={s.stage} aria-pressed={active === index} aria-controls="hero-workflow-detail" data-state={active === index ? 'active' : active > index ? 'complete' : 'idle'} onClick={() => { setPlaying(false); setActive(index); }}>
          <span className={s.node}>{index < active ? <Check size={19} /> : <Icon size={19} />}</span>
          <span>{stage.label}</span>
        </button>;
      })}
    </div>
    <div className={s.detail} id="hero-workflow-detail" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={active} className={s.detailInner} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: reduced ? 1 : 0 }} transition={{ duration: .16 }}>
          <CurrentIcon className={s.detailIcon} size={22} aria-hidden="true" />
          <div><strong>{current.title}</strong><p>{current.detail}</p></div>
          <ArrowRight className={s.detailArrow} size={18} aria-hidden="true" />
        </motion.div>
      </AnimatePresence>
    </div>
    <p className={s.caption}>Example workflow · Select a step to explore</p>
  </div>;
}
