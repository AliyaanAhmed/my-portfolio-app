'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, MoveDownRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ProjectPreview } from './ProjectPreview';
import { Reveal } from '../motion/Reveal';
import type { Project } from '@/content/projects';

export function ProjectChapter({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [90, 0, -70]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [9, 0, -4]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [index === 1 ? 4 : -3, 0, index === 1 ? -2 : 2]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.92, 1, 0.98]);
  return <article ref={ref} className={`project-chapter chapter-${project.variant}`} data-project={project.slug}>
    <div className="container"><div className="chapter-topline"><span className="eyebrow">SELECTED EXPLORATION / 0{index + 1}</span><span className="chapter-provenance"><span className="tiny-dot" /> CONCEPT / SYNTHETIC DATA</span></div>
      <div className="project-chapter-grid"><Reveal className="chapter-copy"><span className="chapter-category">{project.title}</span><h3>{project.shortTitle}</h3><p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="chapter-scope"><span className="eyebrow">MY FOCUS</span><p>{project.scope}</p></div><Link className="chapter-action" href={`/work/${project.slug}`}>Inside the concept <ArrowUpRight size={20} /></Link><span className="concept-note">Concept demonstration · No client data or production claims</span></Reveal>
        <motion.div className="chapter-scene" style={reduced ? { y: 0, rotateX: 0, rotate: 0, scale: 1 } : { y, rotateX, rotate, scale }}><Link href={`/work/${project.slug}`} aria-label={`Explore ${project.title}`} className="project-visual-link"><ProjectPreview variant={project.variant} /><span className="preview-open"><ArrowUpRight size={20} /></span></Link></motion.div>
      </div><div className="chapter-bottom"><span>0{index + 1} <i /> 03</span><span>{index === 0 ? 'CONTEXT → EVIDENCE → DECISION' : index === 1 ? 'GUIDANCE → CONFIDENCE → NEXT STEP' : 'INTERFACE → WORKFLOW → DATA'}</span><MoveDownRight size={22} /></div>
    </div>
  </article>;
}
