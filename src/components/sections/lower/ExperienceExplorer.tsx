'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, MapPin, Plus } from 'lucide-react';
import { experience } from '@/content/experience';
import { Reveal } from '@/components/motion/Reveal';
import { handleTabKeys } from './tabs';
import s from './LowerSections.module.css';

const years = ['2024 — Present', '2024', '2023 — 2024', '2020 — 2023'];
const labels = ['Datanox', 'MechConnect', 'Seamless Solutions', 'Next Generation Esports'];

export function ExperienceExplorer() {
  const [active, setActive] = useState(0); const id = useId(); const reduced = useReducedMotion(); const company = experience[active];
  return <Reveal><div className={s.experienceExplorer}><div className={s.employerTabs} role="tablist" aria-label="Career chapters" aria-orientation="vertical">{experience.map((employer, i) => <button key={employer.name} role="tab" id={`${id}-company-${i}`} aria-controls={`${id}-roles`} aria-selected={active === i} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={event => handleTabKeys(event, i, experience.length, setActive)}><span>{years[i]}</span><strong>{labels[i]}</strong><ArrowUpRight size={17} /></button>)}</div>
    <div className={s.rolesPanel} role="tabpanel" id={`${id}-roles`} aria-labelledby={`${id}-company-${active}`}><AnimatePresence mode="wait"><motion.div key={company.name} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? {} : { opacity: 0, y: -6 }} transition={{ duration: 0.2 }}><div className={s.companyPanelHead}><span className={s.smallLabel}>{company.type}</span><h3>{company.name}</h3><p><MapPin size={13} />{company.location}</p></div><div className={s.rolesList}>{company.roles.map(role => <details key={role.title} open={role.current} className={s.role}><summary><span><strong title={role.title}>{role.current ? 'Power Platform Consultant' : role.title}</strong><span>{role.dates}</span></span><Plus size={18} /></summary><div><p>{role.description}</p></div></details>)}</div></motion.div></AnimatePresence></div>
  </div></Reveal>;
}
