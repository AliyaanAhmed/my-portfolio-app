import { HeroSection } from '@/components/sections/HeroSection';
import { ExpertiseExplorer } from '@/components/sections/ExpertiseExplorer';
import { Reveal } from '@/components/motion/Reveal';
import { SectionLabel } from '@/components/ui';
import { LowerSections } from '@/components/sections/lower/LowerSections';

export default function Home() {
  return <main id="main-content" className="refined-landing">
    <HeroSection />
    <section className="expertise-section landing-section" id="expertise" tabIndex={-1} data-nav-section="expertise" data-header-theme="dark">
      <div className="container"><Reveal once direction="none"><SectionLabel index="01" light>EXPERTISE</SectionLabel><div className="landing-heading"><h2>One toolkit.<br /><span>Connected thinking.</span></h2><span className="section-aside">Choose a capability to explore.</span></div></Reveal><ExpertiseExplorer /></div>
    </section>
    <LowerSections />
  </main>;
}
