import React from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/sections/HeroSection';
import { BenefitsMarquee } from '@/components/sections/BenefitsMarquee';
import { SoldOutBanner } from '@/components/sections/SoldOutBanner';

// Lazy load below-fold sections
const WhoIsItForSection = dynamic(() => import('@/components/sections/WhoIsItForSection').then(mod => ({ default: mod.WhoIsItForSection })), { ssr: false });
const WhatsAppContactCard = dynamic(() => import('@/components/sections/WhatsAppContactCard').then(mod => ({ default: mod.WhatsAppContactCard })), { ssr: false });
const SocialProofSection = dynamic(() => import('@/components/sections/SocialProofSection').then(mod => ({ default: mod.SocialProofSection })), { ssr: false });
const ColdCallSection = dynamic(() => import('@/components/sections/ColdCallSection').then(mod => ({ default: mod.ColdCallSection })), { ssr: false });
const ProgramStructureSection = dynamic(() => import('@/components/sections/ProgramStructureSection').then(mod => ({ default: mod.ProgramStructureSection })), { ssr: false });
const MethodSection = dynamic(() => import('@/components/sections/MethodSection').then(mod => ({ default: mod.MethodSection })), { ssr: false });
const TechnologyToolsSection = dynamic(() => import('@/components/sections/TechnologyToolsSection').then(mod => ({ default: mod.TechnologyToolsSection })), { ssr: false });
const ComparisonSection = dynamic(() => import('@/components/sections/ComparisonSection').then(mod => ({ default: mod.ComparisonSection })), { ssr: false });
const BonusesSection = dynamic(() => import('@/components/sections/BonusesSection').then(mod => ({ default: mod.BonusesSection })), { ssr: false });
const PricingStrategicSection = dynamic(() => import('@/components/sections/PricingStrategicSection').then(mod => ({ default: mod.PricingStrategicSection })), { ssr: false });
const TimelineSection = dynamic(() => import('@/components/sections/TimelineSection').then(mod => ({ default: mod.TimelineSection })), { ssr: false });
const AboutMentorSection = dynamic(() => import('@/components/sections/AboutMentorSection').then(mod => ({ default: mod.AboutMentorSection })), { ssr: false });
const FAQSection = dynamic(() => import('@/components/sections/FAQSection').then(mod => ({ default: mod.FAQSection })), { ssr: false });
const CommunitySection = dynamic(() => import('@/components/sections/CommunitySection').then(mod => ({ default: mod.CommunitySection })), { ssr: false });
const FinalCTASection = dynamic(() => import('@/components/sections/FinalCTASection').then(mod => ({ default: mod.FinalCTASection })), { ssr: false });
const Footer = dynamic(() => import('@/components/sections/Footer').then(mod => ({ default: mod.Footer })), { ssr: false });

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <SoldOutBanner />
      <HeroSection />
      <BenefitsMarquee />
      <WhoIsItForSection />
      <WhatsAppContactCard />
      <SocialProofSection />
      <ColdCallSection />
      <ProgramStructureSection />
      <MethodSection />
      <TechnologyToolsSection />
      <ComparisonSection />
      <BonusesSection />
      <PricingStrategicSection />
      <TimelineSection />
      <AboutMentorSection />
      <FAQSection />
      <CommunitySection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
