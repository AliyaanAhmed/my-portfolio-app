'use client';

import { useState } from 'react';
import { ArrowDown, ArrowRight, Check, Component, FileText, GitBranch, LayoutTemplate, MousePointer2, ShieldCheck, Sparkles } from 'lucide-react';
import { ProductLogo } from '@/components/ui/ProductLogo';
import s from './CapabilityVisual.module.css';

export function CapabilityVisual({ kind }: { kind: 'platform' | 'automation' | 'ai' | 'frontend' | 'design' }) {
  if (kind === 'frontend') return <div className={s.visual}>
    <div className={s.techRow}><span><ProductLogo name="React" size={24} />React SPA</span><span><ProductLogo name="TypeScript" size={20} />TSX</span><span className={s.jsBadge}>JS</span></div>
    <div className={s.codeWindow}><div className={s.windowBar}><i /><i /><i /><span>frontend / src</span></div><div className={s.codeTree}><span><Component size={15} /><strong>components/</strong><small>reusable UI</small></span><span><LayoutTemplate size={15} /><strong>features/</strong><small>screens & routes</small></span><span><GitBranch size={15} /><strong>hooks/</strong><small>state & behaviour</small></span><span><ArrowRight size={15} /><strong>services/</strong><small>typed API contracts</small></span></div></div>
    <div className={s.layers}><span>Interface</span><ArrowRight size={13} /><span>State</span><ArrowRight size={13} /><span>API</span></div>
  </div>;
  if (kind === 'design') return <DesignPreview />;
  if (kind === 'ai') return <div className={s.visual}>
    <div className={s.documentRoute}><div><FileText size={23} /><span>Documents</span></div><ArrowRight size={17} /><div><ProductLogo name="Azure Document Intelligence" size={32} /><span>Extract fields</span></div><ArrowRight size={17} /><div><Sparkles size={25} /><span>AI suggestions</span></div></div>
    <div className={s.extraction}><span className={s.miniLabel}>ILLUSTRATIVE DOCUMENT CONTEXT</span><div><span>Request type</span><strong>Service application</strong></div><div><span>Documents</span><strong><Check size={12} /> Ready for review</strong></div></div>
    <div className={s.aiSuggestion}><Sparkles size={16} /><div><strong>Suggested next step</strong><span>Send to the assigned reviewer.</span></div></div><div className={s.footerNote}><ShieldCheck size={13} /> Human review before any decision</div>
  </div>;
  if (kind === 'automation') return <div className={s.visual}>
    <div className={s.toolHeading}><ProductLogo name="Power Automate" size={35} /><span>Power Automate<strong>Event → rule → action</strong></span></div>
    <div className={s.automationSteps}>{[{label:'Trigger',detail:'A new request arrives',icon:FileText},{label:'Condition',detail:'Check role & request type',icon:GitBranch},{label:'Action',detail:'Assign, notify & track',icon:Check}].map((step,i)=><div key={step.label}><span className={s.stepIcon}><step.icon size={18} /></span><span><small>0{i+1} / {step.label}</small><strong>{step.detail}</strong></span>{i<2 && <ArrowDown className={s.downLink} size={14} />}</div>)}</div>
    <div className={s.footerNote}>JavaScript logic · APIs · Exception handling</div>
  </div>;
  return <div className={s.visual}>
    <div className={s.platformGrid}>{([{name:'Power Pages',caption:'Public-facing portals'},{name:'Power Apps',caption:'Internal business apps'},{name:'Code Apps',caption:'Custom React experiences'},{name:'React SPA',caption:'Independent web apps'}] as const).map(tool=><div key={tool.name}><ProductLogo name={tool.name} size={30} /><strong>{tool.name}</strong><span>{tool.caption}</span></div>)}</div>
    <div className={s.dataLink}><ArrowDown size={15} /></div><div className={s.dataFoundation}><ProductLogo name="Dataverse" size={30} /><div><strong>Dataverse</strong><span>Shared data · relationships · access roles</span></div><ShieldCheck size={19} /></div>
  </div>;
}

function DesignPreview() {
  const [step, setStep] = useState(0);
  return <div className={s.visual}>
    <div className={s.designJourney}><span>Understand</span><i /><span>Prototype</span><i /><span>Refine</span></div>
    <div className={s.designBoard}><div className={s.prototype}><div className={s.prototypeTop}><span /><span /><span /></div><small>0{step+1} / REQUEST JOURNEY</small><strong>{step === 0 ? 'Start with the essentials.' : 'Ready to review.'}</strong>{step===0 ? <div className={s.mockField}><span>Request details</span><i /><i /></div> : <div className={s.mockSuccess}><Check size={24} /><span>A clear next step.</span></div>}<button onClick={()=>setStep(step===0?1:0)}>{step===0?'Continue':'Back to start'}<ArrowRight size={14} /></button></div><div className={s.designTokens}><span className={s.miniLabel}>DESIGN SYSTEM</span><div className={s.swatches}><i /><i /><i /></div><strong>Aa</strong><span>Hierarchy<br />Spacing<br />Feedback</span><MousePointer2 size={21} /></div></div>
    <div className={s.footerNote}>Try the prototype · One clear action at a time</div>
  </div>;
}
