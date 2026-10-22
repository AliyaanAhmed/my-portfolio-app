import { Plus } from 'lucide-react';
import { experience } from '@/content/experience';
import { Reveal } from '../motion/Reveal';

const chapters = ['Power Platform & frontend', 'Frontend development · Contract', 'Frontend development', 'Earlier chapter · Operations'];
const initials = ['D', 'M', 'S', 'NG'];

export function CareerTimeline() {
  return <div className="career-list">{experience.map((employer, i) => <Reveal key={employer.name} delay={i * 0.04}><details className="career-company"><summary><span className="company-mark">{initials[i]}</span><span className="company-name"><strong>{employer.name}</strong><small>{chapters[i]}</small></span><span className="company-years">{i === 0 ? '2024 — Present' : i === 1 ? '2024' : i === 2 ? '2023 — 2024' : '2020 — 2023'}</span><Plus size={20} /></summary><div className="company-details"><p>{employer.location}</p>{employer.roles.map(role => <details className="career-role" key={role.title}><summary><span><strong>{role.current ? 'Power Platform Consultant' : role.title}</strong><span className="role-date">{role.dates}</span></span><Plus size={16} /></summary><p>{role.current ? `${role.title}. ${role.description}` : role.description}</p></details>)}</div></details></Reveal>)}</div>;
}
