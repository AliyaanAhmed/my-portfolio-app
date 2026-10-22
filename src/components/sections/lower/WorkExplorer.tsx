'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CheckCheck, FileText, RotateCcw, Search, ShieldCheck } from 'lucide-react';
import { projects } from '@/content/projects';
import { Reveal } from '@/components/motion/Reveal';
import { handleTabKeys } from './tabs';
import s from './LowerSections.module.css';

const studies = [
  { tab: 'Governance', title: 'Make the next decision clear.', description: 'Evidence, reviewers, and decisions in one place.', tags: ['Power Pages', 'Power Automate'] },
  { tab: 'Customer journeys', title: 'Guide people, one step at a time.', description: 'A shorter path from a question to a complete inquiry.', tags: ['Journey design', 'React'] },
  { tab: 'Code Apps', title: 'Give the team a shared view.', description: 'A focused workspace for everyday operations.', tags: ['React & TypeScript', 'Dataverse'] },
];

function GovernanceDemo() {
  const [status, setStatus] = useState('In review');
  const [evidence, setEvidence] = useState(false);
  return <div className={s.appContent}>
    <div className={s.demoHeading}><span className={s.appIcon}><ShieldCheck size={20} /></span><div><span className={s.smallLabel}>REQ-024 / OPERATIONS</span><h4>Workspace access</h4></div><span className={`${s.status} ${status === 'Approved' ? s.success : ''}`} aria-live="polite">{status}</span></div>
    <div className={s.requestFacts}><div><span>Requested by</span><strong>Jordan Davis</strong></div><div><span>Assigned to</span><strong>Operations review</strong></div></div>
    <button className={s.documentButton} onClick={() => setEvidence(!evidence)} aria-expanded={evidence}><FileText size={21} /><span>Supporting evidence<small>Request summary.pdf</small></span><span>{evidence ? 'Close' : 'Open'} <ArrowUpRight size={14} /></span></button>
    {evidence && <div className={s.evidenceDetail}>Sample request: access to the shared planning workspace. Team owner and purpose are included for review.</div>}
    <div className={s.checklist}><span><Check size={15} /> Request details complete</span><span><Check size={15} /> Evidence attached</span></div>
    <div className={s.demoActionRow}>{status === 'In review' ? <><button className={s.primaryButton} onClick={() => setStatus('Approved')}><Check size={16} /> Approve request</button><button className={s.quietButton} onClick={() => setStatus('Needs information')}>Request changes</button></> : <><span className={s.resultText} aria-live="polite"><CheckCheck size={17} /> {status === 'Approved' ? 'Decision recorded in this demo.' : 'Marked for more information.'}</span><button className={s.iconButton} aria-label="Reset governance demo" onClick={() => setStatus('In review')}><RotateCcw size={17} /></button></>}</div>
  </div>;
}

function InquiryDemo() {
  const [step, setStep] = useState(0); const [type, setType] = useState('Personal'); const [ready, setReady] = useState(false);
  return <div className={s.appContent}>
    <div className={s.inquirySteps}>{['Inquiry', 'Documents', 'Summary'].map((label, i) => <span className={step >= i ? s.stepDone : ''} key={label}><i />{label}</span>)}</div>
    <div className={s.inquiryBody} aria-live="polite">{step === 0 ? <><span className={s.smallLabel}>LET’S START HERE</span><h4>What would you like to explore?</h4><div className={s.optionGrid}>{['Personal', 'Business'].map(value => <button key={value} className={`${s.choiceCard} ${type === value ? s.chosen : ''}`} aria-pressed={type === value} onClick={() => setType(value)}><ShieldCheck size={23} /><strong>{value}</strong><span>{value === 'Personal' ? 'For you and your family' : 'For the way you work'}</span>{type === value && <Check className={s.choiceCheck} size={14} />}</button>)}</div></> : step === 1 ? <><span className={s.smallLabel}>A LITTLE PREPARATION</span><h4>Know what comes next.</h4><p>A real inquiry may need identification and supporting documents.</p><label className={s.checkboxLine}><input type="checkbox" checked={ready} onChange={event => setReady(event.target.checked)} />I understand the document requirements.</label></> : <><span className={s.smallLabel}>YOUR SAMPLE INQUIRY</span><h4>A clear starting point.</h4><div className={s.summaryRows}><span>Inquiry type<strong>{type}</strong></span><span>Document guidance<strong>{ready ? 'Reviewed' : 'Not reviewed'}</strong></span><span>Submission<strong>Preview only</strong></span></div></>}</div>
    <div className={s.demoActionRow}>{step > 0 && <button className={s.quietButton} onClick={() => setStep(step - 1)}><ArrowLeft size={15} /> Back</button>}{step < 2 ? <button className={s.primaryButton} onClick={() => setStep(step + 1)}>{step === 0 ? 'Continue' : 'Preview summary'}<ArrowRight size={16} /></button> : <button className={s.quietButton} onClick={() => { setStep(0); setReady(false); }}><RotateCcw size={15} /> Start again</button>}<small className={s.noSubmission}>No information is sent.</small></div>
  </div>;
}

function WorkspaceDemo() {
  const [query, setQuery] = useState(''); const [filter, setFilter] = useState('All');
  const [items, setItems] = useState([{ id: 1, name: 'Review workspace access', owner: 'JD', done: false }, { id: 2, name: 'Prepare onboarding flow', owner: 'SK', done: false }, { id: 3, name: 'Update document checklist', owner: 'AA', done: true }]);
  const visible = items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()) && (filter === 'All' || (filter === 'Complete' ? item.done : !item.done)));
  return <div className={s.appContent}><div className={s.workspaceTop}><h4>Team work items</h4><span>{items.filter(item => item.done).length} / {items.length} complete</span></div><div className={s.tableTools}><label><Search size={16} /><input aria-label="Search sample work items" placeholder="Find a work item" value={query} onChange={event => setQuery(event.target.value)} /></label><select aria-label="Filter sample work items" value={filter} onChange={event => setFilter(event.target.value)}><option>All</option><option>In progress</option><option>Complete</option></select></div><div className={s.taskRows}>{visible.map(item => <div className={s.taskRow} key={item.id}><button className={`${s.taskToggle} ${item.done ? s.taskComplete : ''}`} aria-label={`${item.done ? 'Reopen' : 'Complete'} ${item.name}`} aria-pressed={item.done} onClick={() => setItems(items.map(record => record.id === item.id ? { ...record, done: !record.done } : record))}>{item.done && <Check size={14} />}</button><span>{item.name}<small>{item.done ? 'Complete' : 'In progress'}</small></span><span className={s.owner}>{item.owner}</span></div>)}{!visible.length && <div className={s.emptyState}>No matching work items. Try another search.</div>}</div><div className={s.appHint}>Try completing an item or filtering the list.</div></div>;
}

export function WorkExplorer() {
  const [active, setActive] = useState(0); const reduced = useReducedMotion(); const id = useId(); const study = studies[active];
  return <Reveal><div className={s.workExplorer}>
    <div role="tablist" aria-label="Project explorations" className={s.projectTabs}>{studies.map((item, i) => <button key={item.tab} role="tab" id={`${id}-tab-${i}`} aria-selected={active === i} aria-controls={`${id}-panel`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={event => handleTabKeys(event, i, studies.length, setActive)}><span>0{i + 1}</span>{item.tab}<ArrowUpRight size={16} /></button>)}</div>
    <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} className={s.projectPanel}>
      <div className={s.projectIntro}><span className={s.smallLabel}>INTERACTIVE CONCEPT</span><h3>{study.title}</h3><p>{study.description}</p><div className={s.tagRow}>{study.tags.map(tag => <span key={tag}>{tag}</span>)}</div><Link href={`/work/${projects[active].slug}`} className={s.caseLink}>Read the concept <ArrowUpRight size={18} /></Link></div>
      <div className={s.liveApp}><div className={s.appBar}><span className={s.windowDots}><i /><i /><i /></span><span>{study.tab} / Sample workspace</span><span className={s.demoBadge}>DEMO</span></div><AnimatePresence mode="wait"><motion.div key={active} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? {} : { opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>{active === 0 ? <GovernanceDemo /> : active === 1 ? <InquiryDemo /> : <WorkspaceDemo />}</motion.div></AnimatePresence><div className={s.appFoot}>Concept demonstration · Synthetic data</div></div>
    </div>
  </div></Reveal>;
}
