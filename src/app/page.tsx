import { HeroSection } from '@/components/sections/HeroSection';
import { ExpertiseExplorer } from '@/components/sections/ExpertiseExplorer';
import { LowerSections } from '@/components/sections/lower/LowerSections';
import { StructuredData } from '@/components/StructuredData';
import { pageMetadata, profileStructuredData, seoDescription, seoTitle } from '@/lib/seo';

export const metadata = { ...pageMetadata({ title: seoTitle, description: seoDescription }), title: { absolute: seoTitle } };

export default function Home() {
  return <main id="main-content" className="refined-landing">
    <StructuredData data={profileStructuredData()} />
    <HeroSection />
    <section className="expertise-section landing-section" id="expertise" tabIndex={-1} data-nav-section="expertise" data-header-theme="dark">
      <div className="container"><ExpertiseExplorer /></div>
    </section>
    <LowerSections />
  </main>;
}
