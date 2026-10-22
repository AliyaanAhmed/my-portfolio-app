import Image from 'next/image';
import { ArrowUpRight, MapPin, Plus } from 'lucide-react';
import { education, profile } from '@/content/profile';
import { Reveal } from '@/components/motion/Reveal';
import s from './PortraitAbout.module.css';

export function AboutPanel() {
  return <div className={s.about}>
    <Reveal className={s.copy} direction="left">
      <h2 className={s.statement}><span aria-hidden="true">“</span>I connect thoughtful interfaces with the workflows behind them, so complex work feels simple.<span aria-hidden="true">”</span></h2>
      <div className={s.byline}><i />Aliyaan Ahmed · Power Platform & frontend</div>
      <div className={s.actions}><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">More about me <ArrowUpRight size={18} /></a><span className={s.location}><MapPin size={14} /> Karachi, Pakistan</span></div>
      <details className={s.education}><summary>Education <Plus size={16} /></summary><div>{education.map(item => <p key={item.school}><strong>{item.course}</strong><span>{item.school}</span></p>)}</div></details>
    </Reveal>
    <Reveal className={s.portrait} direction="right"><Image src={profile.portrait!} alt="Full supplied portrait of Syed Aliyaan Ahmed" width={739} height={1024} sizes="(max-width: 700px) 88vw, 440px" /></Reveal>
  </div>;
}
