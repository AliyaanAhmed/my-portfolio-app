'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, FileInput, Play, RotateCcw, Sparkles, Square, UserRoundCheck, Workflow } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import s from './LowerSections.module.css';

const stages = [
  { title: 'Request', icon: FileInput, label: 'POWER PAGES', heading: 'Start with a structured request.', body: 'An operations team member requests workspace access.', input: 'Workspace access · REQ-024', output: 'A request with an owner and purpose.' },
  { title: 'AI context', icon: Sparkles, label: 'AI ASSISTANCE', heading: 'Bring the useful details forward.', body: 'Supporting context is summarized for the reviewer.', input: 'Request details + supporting evidence', output: 'A concise summary, ready for human review.' },
  { title: 'Human review', icon: UserRoundCheck, label: 'POWER AUTOMATE', heading: 'Keep the decision with a person.', body: 'The request reaches the right reviewer with its evidence.', input: 'Request + evidence summary', output: 'Waiting for a reviewer’s decision.' },
  { title: 'Outcome', icon: Workflow, label: 'CONNECTED WORKFLOW', heading: 'Make the next step explicit.', body: 'The decision sets the status and next action.', input: 'A reviewer’s decision', output: 'An outcome everyone can understand.' },
];

export function AutomationStudio() {
  const [active, setActive] = useState(0); const [running, setRunning] = useState(false); const [decision, setDecision] = useState<string | null>(null);
  const reduced = useReducedMotion(); const stage = stages[active]; const Icon = stage.icon;
  useEffect(() => {
    if (!running || active >= 2) return;
    const timer = window.setTimeout(() => { setActive(active + 1); if (active + 1 === 2) setRunning(false); }, reduced ? 250 : 950);
    return () => window.clearTimeout(timer);
  }, [running, active, reduced]);
  const reset = () => { setRunning(false); setActive(0); setDecision(null); };
  const decide = (value: string) => { setDecision(value); setRunning(false); setActive(3); };

  return <Reveal><div className={s.automationStudio}>
    <div className={s.studioToolbar}><span><span className={s.liveDot} /> Illustrative automation</span><div>{running ? <button className={s.quietButton} onClick={() => setRunning(false)}><Square size={13} /> Stop</button> : <button className={s.primaryButton} onClick={() => { setDecision(null); setActive(0); setRunning(true); }}><Play size={14} /> Run workflow</button>}<button className={s.iconButton} onClick={reset} aria-label="Reset workflow simulation"><RotateCcw size={17} /></button></div></div>
    <div className={s.flowTrack} role="group" aria-label="Workflow stages">{stages.map((item, i) => { const Glyph = item.icon; return <div className={s.flowStep} key={item.title}><button aria-label={`Step ${i + 1}: ${item.title}`} aria-pressed={active === i} className={active === i ? s.activeNode : ''} onClick={() => { setActive(i); setRunning(false); }}><span className={s.nodeIndex}>{i < active ? <Check size={12} /> : `0${i + 1}`}</span><Glyph size={23} strokeWidth={1.5} /><strong>{item.title}</strong><small>{item.label}</small></button>{i < 3 && <span className={s.flowConnector}><motion.i initial={false} animate={{ scaleX: i < active ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.4 }} /><ArrowRight size={13} /></span>}</div>; })}</div>
    <div className={s.flowDetails}><div className={s.flowDescription}><span className={s.appIcon}><Icon size={23} /></span><span className={s.smallLabel}>{stage.label}</span><h3>{stage.heading}</h3><p>{stage.body}</p></div><div className={s.flowIO} aria-live="polite"><div><span className={s.smallLabel}>INPUT</span><strong>{stage.input}</strong></div><span className={s.ioDivider}><ArrowRight size={17} /></span><div><span className={s.smallLabel}>OUTPUT</span><strong>{active === 3 && decision ? decision : stage.output}</strong></div>{active === 2 ? <div className={s.reviewActions}><button className={s.primaryButton} onClick={() => decide('Approved — ready for the next action')}><Check size={15} /> Approve</button><button className={s.quietButton} onClick={() => decide('Needs information — returned to requester')}>Request changes</button></div> : active === 3 && decision ? <span className={s.decisionResult}><Check size={16} /> Human decision recorded in this demo.</span> : <span className={s.flowHint}>{running ? 'Simulation running…' : active === 3 ? 'Run the workflow to make a decision.' : 'Select a stage, or run the workflow.'}</span>}</div></div>
    <div className={s.studioFooter}><span>Power Pages → AI assistance → Power Automate</span><span>Sample data · No business system connected</span></div>
  </div></Reveal>;
}
