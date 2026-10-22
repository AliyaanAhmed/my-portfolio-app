import Image from 'next/image';
import { ArrowUpRight, MapPin, Plus } from 'lucide-react';
import { education, profile } from '@/content/profile';
import { Reveal } from '@/components/motion/Reveal';
import s from './PortraitAbout.module.css';

export function AboutPanel() {
  return <div className={s.about}>
    <Reveal className={s.copy} direction="left"><span className={s.intro}>SYED ALIYAAN AHMED</span><h2>I make complex<br />work feel <em>simple.</em></h2><p>Power Platform consultant. Frontend developer.<br />A curious person who likes connecting the dots.</p><span className={s.location}><MapPin size={13} /> Karachi, Pakistan</span><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">Get to know me <ArrowUpRight size={18} /></a><details className={s.education}><summary>Education <Plus size={15} /></summary><div>{education.map(item => <p key={item.school}><strong>{item.course}</strong><span>{item.school}</span></p>)}</div></details></Reveal>
    <Reveal className={s.portrait} direction="right"><Image src={profile.portrait!} alt="Full supplied portrait of Syed Aliyaan Ahmed" width={739} height={1024} sizes="(max-width: 700px) 88vw, 440px" /><span className={s.signature}>Aliyaan<span>↗</span></span></Reveal>
  </div>;
}
