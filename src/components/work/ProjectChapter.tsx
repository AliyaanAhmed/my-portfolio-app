'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ProjectPreview } from './ProjectPreview';
import { Reveal } from '../motion/Reveal';
import type { Project } from '@/content/projects';

const titles = ['A clearer review process.', 'A more guided inquiry.', 'A connected team workspace.'];

export function ProjectChapter({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [28, -28]);
  return <Reveal className={`project-card chapter-${project.variant} ${index === 2 ? 'project-card-wide' : ''}`} delay={index === 1 ? 0.12 : 0}>
    <article ref={ref} data-project={project.slug}>
      <Link href={`/work/${project.slug}`} aria-label={`Explore ${project.title}`} className="project-card-link">
        <div className="project-card-art"><motion.div className="chapter-scene" style={reduced ? { y: 0 } : { y }}><ProjectPreview variant={project.variant} /></motion.div></div>
        <div className="project-card-caption"><span className="project-card-index">0{index + 1} / CONCEPT STUDY</span><h3>{titles[index]}</h3><div className="project-card-meta"><span>{project.tags.slice(0, 2).join(' · ')}</span><span className="project-card-arrow"><ArrowUpRight size={22} /></span></div></div>
      </Link>
    </article>
  </Reveal>;
}
