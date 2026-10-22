import { HeroSection } from '@/components/sections/HeroSection';
import { ExpertiseExplorer } from '@/components/sections/ExpertiseExplorer';
import { LowerSections } from '@/components/sections/lower/LowerSections';

export default function Home() {
  return <main id="main-content" className="refined-landing">
    <HeroSection />
    <section className="expertise-section landing-section" id="expertise" tabIndex={-1} data-nav-section="expertise" data-header-theme="dark">
      <div className="container"><ExpertiseExplorer /></div>
    </section>
    <LowerSections />
  </main>;
}
