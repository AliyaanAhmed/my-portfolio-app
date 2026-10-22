import { SectionShell } from './SectionShell';
import { WorkExplorer } from './WorkExplorer';
import { AutomationStudio } from './AutomationStudio';
import { ExperienceExplorer } from './ExperienceExplorer';
import { AboutPanel } from './AboutPanel';
import { ContactPanel } from './ContactPanel';
import s from './LowerSections.module.css';

export function LowerSections() {
  return <div className={s.scope}>
    <SectionShell id="work" index="02" label="SELECTED EXPLORATIONS" title="Explore the thinking." note="Choose a concept. Try the interface."><WorkExplorer /></SectionShell>
    <SectionShell id="workflow" nav="work" index="03" label="WORKFLOW LAB" title="Connect the steps." note="Run it. Review it. Make the call." tint><AutomationStudio /></SectionShell>
    <SectionShell id="journey" index="04" label="EXPERIENCE" title="A connected journey." note="Select a chapter."><ExperienceExplorer /></SectionShell>
    <SectionShell id="about" index="05" label="ABOUT" title="A person behind the process." tint><AboutPanel /></SectionShell>
    <SectionShell id="contact" index="06" label="LET’S CONNECT" title="Let’s make work flow." dark><ContactPanel /></SectionShell>
  </div>;
}
