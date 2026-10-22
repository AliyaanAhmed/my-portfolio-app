import { ArrowUpRight, Plus } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { WorkflowWorkbench } from '@/components/sections/WorkflowWorkbench';
import { ExpertiseExplorer } from '@/components/sections/ExpertiseExplorer';
import { CareerTimeline } from '@/components/sections/CareerTimeline';
import { AboutPortrait } from '@/components/sections/AboutPortrait';
import { ProjectChapter } from '@/components/work/ProjectChapter';
import { Reveal } from '@/components/motion/Reveal';
import { SectionLabel } from '@/components/ui';
import { education, profile } from '@/content/profile';
import { projects } from '@/content/projects';

export default function Home() {
  return <main id="main-content" className="refined-landing">
    <HeroSection />
    <section className="expertise-section landing-section" id="expertise" tabIndex={-1} data-nav-section="expertise" data-header-theme="dark">
      <div className="container"><Reveal><SectionLabel index="01" light>EXPERTISE</SectionLabel><div className="landing-heading"><h2>One toolkit.<br /><span>Connected thinking.</span></h2><span className="section-aside">Choose a capability to explore.</span></div></Reveal><ExpertiseExplorer /></div>
    </section>
    <section className="landing-section work-gallery" id="work" tabIndex={-1} data-nav-section="work" data-header-theme="light">
      <div className="container"><Reveal><SectionLabel index="02">SELECTED WORK</SectionLabel><div className="landing-heading"><h2>Ideas, made tangible.</h2><span className="section-aside">Concept studies · Synthetic data</span></div></Reveal><div className="work-grid">{projects.map((project, index) => <ProjectChapter key={project.slug} project={project} index={index} />)}</div></div>
    </section>
    <section className="landing-section workflow-section" id="workflow" data-nav-section="work" data-header-theme="light">
      <div className="container workflow-layout"><Reveal><SectionLabel index="03">AUTOMATION IN ACTION</SectionLabel><h2>Less busywork.<br /><span className="accent">Better flow.</span></h2><p className="section-summary">Power Automate connects the steps.<br />AI adds context. You make the call.</p><div className="workflow-stack"><span>Power Pages</span><span>Power Automate</span><span>AI</span></div></Reveal><Reveal direction="right" delay={0.1}><WorkflowWorkbench /></Reveal></div>
    </section>
    <section className="landing-section journey-section" id="journey" tabIndex={-1} data-nav-section="journey" data-header-theme="light">
      <div className="container"><Reveal><SectionLabel index="04">EXPERIENCE</SectionLabel><div className="landing-heading"><h2>Where I’ve built.</h2><span className="section-aside">A little context. Open for the details.</span></div></Reveal><CareerTimeline /></div>
    </section>
    <section className="landing-section about-section" id="about" tabIndex={-1} data-nav-section="about" data-header-theme="light">
      <div className="container about-simple"><Reveal direction="left" className="about-photo-reveal"><AboutPortrait /></Reveal><Reveal className="about-intro"><SectionLabel index="05">THE PERSON BEHIND THE WORK</SectionLabel><h2>Hi, I’m Aliyaan<span className="accent">.</span></h2><p>I build apps and automations that make work easier. Power Platform is my core; frontend engineering and thoughtful design connect the rest.</p><p className="about-location">Based in Karachi. Building for people.</p><details className="education-disclosure"><summary>Education <Plus size={17} /></summary>{education.map(item => <div key={item.school}><strong>{item.school}</strong><p>{item.course}</p><small>{item.dates}</small></div>)}</details><a className="text-link" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">My story on LinkedIn <ArrowUpRight size={17} /></a></Reveal></div>
    </section>
    <section className="contact-section landing-section" id="contact" tabIndex={-1} data-nav-section="contact" data-header-theme="dark"><div className="container"><Reveal><SectionLabel index="06" light>LET’S CONNECT</SectionLabel><a className="contact-invitation" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer"><h2>Let’s make<br /><span>work flow.</span></h2><span className="contact-arrow"><ArrowUpRight size={55} strokeWidth={1.2} /></span></a><div className="contact-caption"><span>Applications. Automation. AI.</span><span>Connect on LinkedIn ↗</span></div>{profile.links.email && <a className="text-link" href={`mailto:${profile.links.email}`}>Send an email <ArrowUpRight size={16} /></a>}{profile.links.resume && <a className="text-link" href={profile.links.resume}>View resume <ArrowUpRight size={16} /></a>}</Reveal></div></section>
  </main>;
}
