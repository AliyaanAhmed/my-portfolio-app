import { Reveal } from '@/components/motion/Reveal';
import s from './LowerSections.module.css';

export function SectionShell({ id, index, label, title, note, children, dark = false, tint = false, nav }: {
  id: string; index: string; label: string; title?: string; note?: string; children: React.ReactNode; dark?: boolean; tint?: boolean; nav?: string;
}) {
  return <section className={`${s.section} ${dark ? s.dark : ''} ${tint ? s.tinted : ''}`} id={id} tabIndex={-1} data-nav-section={nav ?? id} data-header-theme={dark ? 'dark' : 'light'}>
    <div className={s.inner}><Reveal><div className={s.sectionLabel}><span>{index}</span><i />{label}</div>{title && <div className={s.sectionHead}><h2 className={s.heading}>{title}</h2>{note && <span>{note}</span>}</div>}</Reveal>{children}</div>
  </section>;
}
