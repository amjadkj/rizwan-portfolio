import { SiteHeader } from "@/components/layout/site-header";
import { HeroScroll } from "@/components/sections/HeroScroll";
import { ProjectsSection } from "@/components/sections/projects";
import { TechnologiesSection } from "@/components/sections/technologies";
import { ProcessSection } from "@/components/sections/process";
import { JourneySection } from "@/components/sections/journey";
import { CertificationsSection } from "@/components/sections/certifications";
import { ContactSection } from "@/components/sections/contact";
import { SiteFooter } from "@/components/sections/site-footer";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Level 3 Glass Floating Pill Header with Scroll-Spy */}
      <SiteHeader />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* Scroll-Driven Canvas Hero Sequence */}
        {/* Hero Section */}
        <Hero />

        <HeroScroll />

        {/* Selected Projects (Slider with Impact Metrics) */}
        <ProjectsSection />

        {/* Technologies & Tools (Infinite Marquee & Skill Matrix) */}
        <TechnologiesSection />

        {/* Strategic Execution Roadmap (5-Phase Framework) */}
        <ProcessSection />

        {/* Professional Career Journey (Experience & Education Timeline) */}
        <JourneySection />

        {/* Verified Accreditations (CBAP, AWS, Power BI, Tableau, PMI-PBA) */}
        <CertificationsSection />

        {/* Contact & Executive Advisory Inquiry */}
        <ContactSection />
      </main>

      {/* Atmospheric Designed Footer */}
      <SiteFooter />
    </div>
  );
}
