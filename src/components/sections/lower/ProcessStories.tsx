'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, FileText, LockKeyhole, Pause, Play, ShieldCheck, UserRound } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { ProductLogo, type ProductName } from '@/components/ui/ProductLogo';
import s from './ProcessStories.module.css';

const stories = [
  { title: 'Design & architecture.', line: 'The right interface. One connected foundation.', labels: ['Map the experience', 'Connect the data', 'Automate the handoff', 'Ready for people'], products: ['Power Pages', 'Power Apps', 'Code Apps', 'Dataverse'] },
  { title: 'AI that helps work move.', line: 'Read the context. Suggest a next step. Keep people in control.', labels: ['Request received', 'AI reads the context', 'Suggestion prepared', 'Human review'], products: ['Power Pages', 'AI Builder', 'Power Automate'] },
  { title: 'The right access. At every step.', line: 'Role-based workflows for government and enterprise teams.', labels: ['Applicant submits', 'Officer reviews', 'Approver decides', 'Decision recorded'], products: ['Power Apps', 'Dataverse', 'Power Automate'] },
] as const;

function Product({ name, caption, active = false }: { name: ProductName; caption?: string; active?: boolean }) {
  return <div className={`${s.product} ${active ? s.activeProduct : ''}`}><ProductLogo name={name} size={34} /><strong>{name}</strong>{caption && <small>{caption}</small>}</div>;
}

function Architecture({ phase }: { phase: number }) {
  return <div className={s.architecture} aria-label="Power Pages, Power Apps and Code Apps connect through Dataverse to Power Automate">
    <div className={s.interfaceRow}><Product name="Power Pages" caption="Public portal" active={phase === 0} /><Product name="Power Apps" caption="Team workspace" active={phase === 0} /><Product name="Code Apps" caption="Custom experience" active={phase === 0} /></div>
    <div className={`${s.bus} ${phase >= 1 ? s.connected : ''}`} aria-hidden="true"><i /><i /><i /></div>
    <div className={s.foundation}><Product name="Dataverse" caption="Shared data · defined access" active={phase === 1} /><span className={`${s.wire} ${phase >= 2 ? s.connected : ''}`} aria-hidden="true"><ArrowRight size={15} /></span><Product name="Power Automate" caption="Connected workflows" active={phase === 2} /></div>
    <div className={`${s.outcome} ${phase === 3 ? s.outcomeActive : ''}`}><Check size={15} /> One system. A clear path for every user.</div>
  </div>;
}

function AIWorkflow({ phase }: { phase: number }) {
  return <div className={s.aiScene} aria-label="An incoming service request is summarized by AI, which suggests a route for human review">
    <div className={s.aiRoute}><span data-on={phase === 0}><ProductLogo name="Power Pages" size={26} />Request</span><i data-on={phase >= 1}><ArrowRight size={14} /></i><span data-on={phase === 1 || phase === 2}><ProductLogo name="AI Builder" size={26} />AI assistance</span><i data-on={phase >= 3}><ArrowRight size={14} /></i><span data-on={phase === 3}><UserRound size={24} />Reviewer</span></div>
    <div className={s.aiCards}><div className={`${s.document} ${phase === 0 ? s.focusCard : ''}`}><FileText size={23} /><strong>Service request</strong><span>Application + supporting files</span><div className={s.textLines} aria-hidden="true"><i /><i /><i /></div><small><Check size={12} /> Context received</small></div>
      <div className={`${s.suggestion} ${phase >= 1 ? s.focusCard : ''}`}><div className={s.suggestionTop}><ProductLogo name="AI Builder" size={22} /><span>AI suggestion</span></div><AnimatePresence mode="wait"><motion.div key={phase < 2 ? 'reading' : 'suggestion'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}>{phase < 2 ? <><strong>Understanding the request…</strong><div className={s.textLines} aria-hidden="true"><i /><i /><i /></div></> : <><strong>Route to the licensing team</strong><p>Required documents are present.</p><span className={s.reviewTag}><UserRound size={12} /> {phase === 3 ? 'Ready for human review' : 'Suggested route'}</span></>}</motion.div></AnimatePresence></div></div>
    <div className={s.sceneNote}><ShieldCheck size={14} /> AI suggests. A person makes the decision.</div>
  </div>;
}

const roles = [{ title: 'Applicant', action: 'Submit own request', icon: UserRound }, { title: 'Officer', action: 'Review assigned cases', icon: FileText }, { title: 'Approver', action: 'Authorize the decision', icon: ShieldCheck }];

function AccessWorkflow({ phase }: { phase: number }) {
  return <div className={s.accessScene} aria-label="Applicants submit their own requests, officers review assigned cases, approvers authorize decisions, and the action is recorded">
    <div className={s.accessHeader}><LockKeyhole size={16} /><span>Role-based access</span><span>RBAC</span></div>
    <div className={s.roleFlow}>{roles.map((role, i) => <div className={`${s.roleNode} ${phase === i ? s.currentRole : ''} ${phase > i ? s.completedRole : ''}`} key={role.title}><span className={s.roleIcon}><role.icon size={21} /></span><div><strong>{role.title}</strong><span>{role.action}</span></div><span className={s.roleStatus}>{phase > i ? <Check size={15} /> : phase === i ? <span className={s.pulse} /> : <LockKeyhole size={13} />}</span></div>)}</div>
    <div className={`${s.audit} ${phase === 3 ? s.auditDone : ''}`}><ProductLogo name="Dataverse" size={27} /><div><strong>{phase === 3 ? 'Decision recorded' : 'Audit trail'}</strong><span>Who acted · what changed · when</span></div><ShieldCheck size={19} /></div>
  </div>;
}

function Story({ index }: { index: number }) {
  const story = stories[index];
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { amount: .35 });
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const playing = visible && !paused && !reduced;
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setPhase(current => (current + 1) % 4), 2500);
    return () => window.clearInterval(timer);
  }, [playing]);
  const shownPhase = reduced ? 3 : phase;

  return <Reveal><article ref={ref} className={s.story} id={index === 1 ? 'workflow' : undefined} data-story={index} data-playing={playing}>
    <div className={s.storyCopy}><span className={s.chapter}>0{index + 1} / {['ARCHITECTURE', 'AI ASSISTANCE', 'GOVERNANCE'][index]}</span><h3>{story.title}</h3><p>{story.line}</p><div className={s.products}>{story.products.map(name => <span key={name}><ProductLogo name={name} size={19} />{name}</span>)}</div></div>
    <div className={s.visual}><div className={s.visualHeader}><span><i />WORKFLOW CONCEPT</span><button onClick={() => setPaused(value => !value)} disabled={Boolean(reduced)} aria-label={paused ? `Play ${story.title} animation` : `Pause ${story.title} animation`}>{paused || reduced ? <Play size={13} /> : <Pause size={13} />}</button></div>
      <div className={s.scene} data-phase={shownPhase}>{index === 0 ? <Architecture phase={shownPhase} /> : index === 1 ? <AIWorkflow phase={shownPhase} /> : <AccessWorkflow phase={shownPhase} />}</div>
      <div className={s.caption}><span className={s.stepNumber}>0{shownPhase + 1}</span><span>{story.labels[shownPhase]}</span><div className={s.progress} aria-hidden="true">{story.labels.map((label, i) => <span key={label} data-on={i <= shownPhase} />)}</div></div>
    </div>
  </article></Reveal>;
}

export function ProcessStories() {
  return <div className={s.stories}>{stories.map((_, index) => <Story key={index} index={index} />)}</div>;
}
