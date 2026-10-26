'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AppWindow, ArrowRight, Check, CheckCheck, ChevronRight, Code2, Database, FileText, Home, Layers, LayoutGrid, Network, Play, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';
import { ProductLogo } from '@/components/ui/ProductLogo';
import s from './HeroShowcase.module.css';

const views = [
  { label: 'Applications', icon: AppWindow, title: 'A clearer way to work.', subtitle: 'One interface. Everything connected.', caption: 'Interfaces. Integrations. Intelligence.', technology: 'React + TypeScript', code: 'function Workspace() {\n  return <ConnectedExperience />;\n}', product: 'React' as const },
  { label: 'Automation', icon: Network, title: 'Less friction. More flow.', subtitle: 'From a request to the right decision.', caption: 'Clear routing. People in control.', technology: 'Power Platform', code: 'request.submit()\n  .then(routeToApprover)\n  .then(recordDecision);', product: 'Power Automate' as const },
  { label: 'AI experiences', icon: Sparkles, title: 'Turn context into clarity.', subtitle: 'Intelligence where it helps most.', caption: 'AI assistance. Human decisions.', technology: 'Azure + AI', code: 'const context = await extract(document);\nconst suggestion = await suggest(context);\nawait humanReview(suggestion);', product: 'Azure Document Intelligence' as const },
];
const modules = [
  { label: 'Build modern applications', icon: AppWindow, detail: 'Typed interfaces', title: 'A focused workspace', text: 'Clear components and navigation for everyday work.' },
  { label: 'Connect your systems', icon: Network, detail: 'Connected data', title: 'Information, connected', text: 'Bring application data and business services together.' },
  { label: 'Add intelligence', icon: Sparkles, detail: 'AI assistance', title: 'Helpful by design', text: 'Surface context and suggestions when people need them.' },
];
const flow = ['Request received', 'AI-assisted review', 'Human approval'];

export function HeroShowcase() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [module, setModule] = useState(0);
  const [phase, setPhase] = useState(-1);
  const [running, setRunning] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = views[active];

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      if (phase >= 2) setRunning(false);
      else setPhase(value => value + 1);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [phase, running]);

  useEffect(() => {
    if (!analyzing) return;
    const timer = window.setTimeout(() => { setAnalyzing(false); setAnalyzed(true); }, 900);
    return () => window.clearTimeout(timer);
  }, [analyzing]);

  function select(index: number) {
    setActive(index); setRunning(false); setPhase(-1); setAnalyzing(false); setAnalyzed(false);
  }

  return <motion.div className={s.showcase} initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .12 }}>
    <div className={s.heading}><p><span aria-hidden="true" />Explore the possibilities</p><h2>One idea. Many possibilities.</h2></div>
    <div className={s.tabs} role="tablist" aria-label="Explore application concepts">
      {views.map((view, index) => <button ref={element => { tabs.current[index] = element; }} key={view.label} type="button" role="tab" id={`hero-tab-${index}`} aria-controls="hero-showcase-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => {
        let next = active;
        if (event.key === 'ArrowRight') next = (active + 1) % views.length;
        else if (event.key === 'ArrowLeft') next = (active + views.length - 1) % views.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = views.length - 1;
        else return;
        event.preventDefault(); select(next); tabs.current[next]?.focus();
      }}><view.icon size={16} /><span>{view.label}</span></button>)}
    </div>
    <div className={s.stage}>
      <div className={s.window} id="hero-showcase-panel" role="tabpanel" aria-labelledby={`hero-tab-${active}`} tabIndex={0}>
        <div className={s.windowBar}><span className={s.windowDots} aria-hidden="true"><i /><i /><i /></span><span>{current.label} preview</span>{active === 0 && <span className={s.windowLogos} role="img" aria-label="Power Apps and React"><ProductLogo name="Power Apps" size={17} /><ProductLogo name="React" size={17} /></span>}<span className={s.example}>Interactive concept</span></div>
        <div className={s.windowBody}>
          <div className={s.rail} aria-hidden="true"><span><Home size={17} /></span><Layers size={17} /><LayoutGrid size={17} /><Database size={17} /><ShieldCheck size={17} /></div>
          <div className={s.canvas}>
            {views.map((view, viewIndex) => <motion.div key={view.label} className={s.canvasPanel} data-active={active === viewIndex} inert={active !== viewIndex} aria-hidden={active !== viewIndex} initial={false} animate={{ opacity: active === viewIndex ? 1 : 0 }} transition={{ duration: reduced ? 0 : .2 }}>
                <div className={s.canvasHeading}><h3>{view.title}</h3><p>{view.subtitle}</p></div>
                {viewIndex === 0 && <div className={s.application}>
                  <div className={s.modules}>{modules.map((item, index) => <button type="button" key={item.label} aria-pressed={module === index} aria-controls="hero-module-detail" onClick={() => setModule(index)}><span className={s.moduleIcon}><item.icon size={18} /></span><span><strong>{item.label}</strong><small>{item.detail}</small></span><ChevronRight size={15} /></button>)}</div>
                  <div className={s.inspector} id="hero-module-detail" aria-live="polite"><span className={s.overline}>Connected by design</span><div className={s.bars} aria-hidden="true">{[35,50,43,68,59,78,94].map((height,index) => <motion.i key={index} animate={{ height: `${Math.max(20,height - module * (index % 3) * 6)}%` }} transition={{ duration: reduced ? 0 : .4 }} />)}</div><strong>{modules[module].title}</strong><p>{modules[module].text}</p><span className={s.connected}><CheckCheck size={13} />Systems connected</span></div>
                </div>}
                {viewIndex === 1 && <div className={s.automation}>
                  <div className={s.flow}>{flow.map((label,index) => <div key={label} data-state={phase > index ? 'done' : phase === index ? 'current' : 'waiting'}><span>{phase > index || phase === 2 && index === 2 ? <Check size={17} /> : index === 0 ? <FileText size={17} /> : index === 1 ? <Sparkles size={17} /> : <ShieldCheck size={17} />}</span><div><strong>{label}</strong><small>{phase > index || phase === 2 && index === 2 ? 'Complete' : phase === index ? 'In progress' : 'Ready'}</small></div></div>)}</div>
                  <div className={s.demoAction}><button type="button" disabled={running} onClick={() => { setPhase(0); setRunning(true); }}>{running ? <Network size={14} /> : phase === 2 ? <RotateCcw size={14} /> : <Play size={14} />}{running ? 'Running example' : phase === 2 ? 'Replay workflow' : 'Run example'}</button><span role="status">{phase === 2 ? 'Decision recorded in the audit trail.' : 'An example approval journey.'}</span></div>
                </div>}
                {viewIndex === 2 && <div className={s.ai}>
                  <div className={s.document}><FileText size={23} /><div><strong>Service request.pdf</strong><span>Sample document · no personal data</span></div><span className={s.fileLabel}>PDF</span></div>
                  <div className={s.aiResult} aria-live="polite"><Sparkles size={18} /><div><span className={s.overline}>AI suggestion</span><strong>{analyzing ? 'Reading the sample…' : analyzed ? 'Route to the service team' : 'Make the next step clearer.'}</strong><p>{analyzed ? 'Request type identified. Supporting details extracted. Ready for a person to review.' : 'Extract details, understand context, and suggest a route.'}</p></div></div>
                  <div className={s.demoAction}><button type="button" disabled={analyzing} onClick={() => { if (analyzed) setAnalyzed(false); else setAnalyzing(true); }}><Sparkles size={14} />{analyzing ? 'Analyzing…' : analyzed ? 'Reset example' : 'Analyze example'}</button><span><ShieldCheck size={13} />Human review required</span></div>
                </div>}
              </motion.div>)}
          </div>
        </div>
      </div>
      <div className={s.productBadge}><div className={s.badgeLogos}>{active === 0 && <ProductLogo name="Power Apps" size={24} />}<ProductLogo name={current.product} size={24} /></div><span>{current.product === 'Azure Document Intelligence' ? 'Document Intelligence' : current.product === 'React' ? 'Power Apps + React' : current.product}</span></div>
      <div className={s.codeCard}><div><Code2 size={14} /><span>{current.technology}</span><span className={s.codeLabel}>Example</span></div><pre><code>{current.code}</code></pre><span><i aria-hidden="true" />Built to connect.</span></div>
    </div>
    <div className={s.footer}><p>{current.caption}</p><button type="button" onClick={() => select((active + 1) % views.length)} aria-label={`Show ${views[(active + 1) % views.length].label} preview`}><ArrowRight size={18} /></button><span className={s.pagination} aria-live="polite"><b>0{active + 1}</b> / 03</span></div>
  </motion.div>;
}
