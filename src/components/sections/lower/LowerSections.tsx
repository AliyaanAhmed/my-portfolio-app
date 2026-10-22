import { SectionShell } from './SectionShell';
import { ProcessStories } from './ProcessStories';
import { ExperienceExplorer } from './ExperienceExplorer';
import { AboutPanel } from './AboutPanel';
import { ContactPanel } from './ContactPanel';
import s from './LowerSections.module.css';

export function LowerSections() {
  return <div className={s.scope}>
    <SectionShell id="work" index="02" label="HOW I BUILD" title="Complex processes. Clear experiences."><ProcessStories /></SectionShell>
    <SectionShell id="journey" index="03" label="EXPERIENCE" title="A connected journey."><ExperienceExplorer /></SectionShell>
    <SectionShell id="about" index="04" label="ABOUT"><AboutPanel /></SectionShell>
    <SectionShell id="contact" index="05" label="LET’S CONNECT" title="Let’s make work flow." dark><ContactPanel /></SectionShell>
  </div>;
}
