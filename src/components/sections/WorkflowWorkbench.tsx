'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, FileText, GitBranch, ShieldCheck, Sparkles, Workflow } from 'lucide-react';

const steps = [
  { label: 'Request', title: 'A request, with context.', status: 'Ready for review', detail: 'Workspace access request', caption: 'Power Pages captures a structured request.', action: 'Request prepared', platform: 'POWER PAGES', detailLabel: 'Capture the right details at the start.' },
  { label: 'Review', title: 'The right evidence. In view.', status: 'In review', detail: 'Evidence & policy review', caption: 'Power Automate routes the work. AI helps with context.', action: 'Review in progress', platform: 'POWER AUTOMATE + AI', detailLabel: 'Connect evidence with the people reviewing it.' },
  { label: 'Decision', title: 'A clear next step.', status: 'Approved', detail: 'Access request approved', caption: 'A human decision, ready for the next action.', action: 'Decision recorded', platform: 'HUMAN REVIEW', detailLabel: 'Keep accountability in the workflow.' },
];

export function WorkflowWorkbench() {
  const [step, setStep] = useState(1);
  const reduced = useReducedMotion();
  const selected = steps[step];
  return <div className="workbench-wrap"><div className="workbench"><div className="workbench-top"><span><GitBranch size={17} /> From trigger to done.</span><span className="mono">WORKFLOW EXPLORER</span></div>
    <div className="workflow-steps" role="group" aria-label="Illustrative workflow steps">{steps.map((item, i) => <button key={item.label} aria-label={`${String(i + 1).padStart(2, '0')} ${item.label}`} aria-pressed={step === i} onClick={() => setStep(i)} className={step === i ? 'active' : ''}><span>{i < step ? <Check size={13} /> : String(i + 1).padStart(2, '0')}</span>{item.label}{i < 2 && <ArrowRight className="step-arrow" size={14} />}</button>)}</div>
    <div className="workflow-body"><div className="workflow-request"><div className="micro-heading"><span>REQUEST / REQ-024</span><span className="tiny-dot" /></div><AnimatePresence mode="wait"><motion.div key={step} initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? {} : { opacity: 0, y: -10 }} transition={{ duration: 0.22 }}><h3>{selected.title}</h3><div className="request-field"><small>SUBJECT</small><p>{selected.detail}</p></div><div className="request-grid"><div><small>TEAM</small><p>Operations</p></div><div><small>PRIORITY</small><p><span className="tiny-dot" /> Normal</p></div></div><div className="request-status"><span><span className="status-dot" />{selected.status}</span><ShieldCheck size={18} /></div></motion.div></AnimatePresence></div>
      <svg className="connector" viewBox="0 0 40 160" aria-hidden="true"><motion.path d="M0 80H20V40H40M20 80V130H40" fill="none" stroke="currentColor" strokeWidth="1.5" initial={false} animate={{ pathLength: reduced ? 1 : [0, 1] }} transition={{ duration: 0.8 }} key={step} /><circle cx="20" cy="80" r="3" fill="currentColor" /></svg>
      <div className="evidence-stack"><div className="evidence-card"><FileText size={24} /><strong>Supporting evidence</strong><small>Request summary.pdf</small><div className="mini-lines"><i /><i /><i /></div><span className="evidence-verified"><Check size={12} /> Context attached</span></div><div className="ai-indicator"><Sparkles size={18} /><span>AI-assisted summary<small>Ready for human review</small></span></div></div>
    </div><div className="workbench-bottom" aria-live="polite"><span><Check size={14} />{selected.action}</span><span>Human in the loop <span className="tiny-dot" /></span></div></div>
    <div className="workflow-explanation" aria-live="polite"><span className="explanation-icon"><Workflow size={19} /></span><span><small>{selected.platform}</small><strong>{selected.detailLabel}</strong></span><span className="workflow-step-count">0{step + 1} / 03</span></div>
    <div className="workbench-note"><span>Illustrative workflow · Fictional sample data</span><span>SELECT A STEP TO EXPLORE ↑</span></div>
  </div>;
}
