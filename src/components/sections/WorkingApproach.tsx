'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'motion/react';
import { Reveal } from '../motion/Reveal';
const steps = [
  { title: 'Find the friction.', label: 'UNDERSTAND', body: 'Map the workflow. Talk to the people. Understand what slows the work down.' },
  { title: 'Make it make sense.', label: 'DESIGN', body: 'Shape the journey, simplify the decisions, and prototype a clearer way forward.' },
  { title: 'Connect the pieces.', label: 'BUILD', body: 'Build the application, automate the handoffs, and integrate the right services.' },
  { title: 'Keep making it better.', label: 'REFINE', body: 'Test real interactions, listen to feedback, and refine the details that matter.' },
];
export function WorkingApproach() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] });
  return <div ref={ref} className="approach-sequence"><div className="approach-track"><motion.div style={{ scaleX: reduced ? 1 : scrollYProgress }} /></div>{steps.map((step, i) => <Reveal key={step.label} className="approach-step" delay={i * 0.08}><span className="approach-number">0{i + 1}</span><span className="eyebrow">{step.label}</span><h3>{step.title}</h3><p>{step.body}</p></Reveal>)}</div>;
}
