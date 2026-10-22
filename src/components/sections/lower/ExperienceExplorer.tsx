import { Plus } from 'lucide-react';
import { experience } from '@/content/experience';
import { Reveal } from '@/components/motion/Reveal';
import s from './ExperienceTimeline.module.css';

export function ExperienceExplorer() {
  return <div className={s.timeline}>{experience.map(company => <Reveal key={company.name} once direction="up"><details className={s.entry}>
    <summary><span className={s.year}>{company.period}</span><span className={s.marker} aria-hidden="true" /><span className={s.company}><strong>{company.name}</strong><span>{company.focus}</span></span><span className={s.role}>{company.roles[0].title}</span><Plus size={19} /></summary>
    <div className={s.detail}><span className={s.context}>{company.type}{company.location ? ` / ${company.location}` : ''}</span>{company.roles.map(role => <div key={role.title} className={s.position}><h3>{role.title}</h3>{role.dates && <span>{role.dates}</span>}<p>{role.description}</p></div>)}</div>
  </details></Reveal>)}</div>;
}
