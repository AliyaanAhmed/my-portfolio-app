import { Plus } from 'lucide-react';
import { experience } from '@/content/experience';
import { Reveal } from '@/components/motion/Reveal';
import s from './ExperienceTimeline.module.css';

const years = ['2024 — Present', '2024', '2023 — 2024', 'Consulting'];
const labels = ['Power Platform & frontend', 'React development', 'Web & frontend development', 'Medical company'];

export function ExperienceExplorer() {
  return <div className={s.timeline}>{experience.map((company, index) => <Reveal key={company.name} once direction="up"><details className={s.entry}>
    <summary><span className={s.year}>{years[index]}</span><span className={s.marker} aria-hidden="true" /><span className={s.company}><strong>{company.name}</strong><span>{labels[index]}</span></span><span className={s.role}>{company.roles[0].current ? 'Consultant & developer' : company.roles[0].title}</span><Plus size={19} /></summary>
    <div className={s.detail}><span className={s.context}>{company.type}{company.location ? ` / ${company.location}` : ''}</span>{company.roles.map(role => <div key={role.title} className={s.position}><h3>{role.current ? 'Power Platform Consultant' : role.title}</h3>{role.dates && <span>{role.dates}</span>}<p>{role.description}</p></div>)}</div>
  </details></Reveal>)}</div>;
}
