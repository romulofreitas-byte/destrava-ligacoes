import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/sections/HeroSection';
import { BenefitsMarquee } from '@/components/sections/BenefitsMarquee';
import { SoldOutBanner } from '@/components/sections/SoldOutBanner';

// Helper function to create dynamic imports with error handling
function createDynamicImport(
  importFn: () => Promise<{ [key: string]: React.ComponentType }>,
  exportName: string,
  fallbackComponent?: React.ComponentType
) {
  return dynamic(
    () =>
      importFn()
        .then((mod) => {
          const Component = mod[exportName];
          if (!Component) {
            throw new Error(`Export "${exportName}" not found in module`);
          }
          return { default: Component as React.ComponentType };
        })
        .catch((error) => {
          console.error(`Error loading ${exportName}:`, error);
          // Return a fallback component or empty component
          if (fallbackComponent) {
            return { default: fallbackComponent };
          }
          // Return empty component as last resort
          return {
            default: (() => {
              const ErrorFallback: React.ComponentType = () => {
                if (process.env.NODE_ENV === 'development') {
                  return (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
                      Error loading {exportName}: {error instanceof Error ? error.message : String(error)}
                    </div>
                  );
                }
                return null;
              };
              return ErrorFallback;
            })(),
          };
        }),
    {
      ssr: false,
      loading: () => (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Carregando...</div>
        </div>
      ),
    }
  );
}

// Lazy load below-fold sections with error handling
const WhoIsItForSection = createDynamicImport(
  () => import('@/components/sections/WhoIsItForSection'),
  'WhoIsItForSection'
);
const WhatsAppContactCard = createDynamicImport(
  () => import('@/components/sections/WhatsAppContactCard'),
  'WhatsAppContactCard'
);
const SocialProofSection = createDynamicImport(
  () => import('@/components/sections/SocialProofSection'),
  'SocialProofSection'
);
const ColdCallSection = createDynamicImport(
  () => import('@/components/sections/ColdCallSection'),
  'ColdCallSection'
);
const ProgramStructureSection = createDynamicImport(
  () => import('@/components/sections/ProgramStructureSection'),
  'ProgramStructureSection'
);
const MethodSection = createDynamicImport(
  () => import('@/components/sections/MethodSection'),
  'MethodSection'
);
const TechnologyToolsSection = createDynamicImport(
  () => import('@/components/sections/TechnologyToolsSection'),
  'TechnologyToolsSection'
);
const ComparisonSection = createDynamicImport(
  () => import('@/components/sections/ComparisonSection'),
  'ComparisonSection'
);
const BonusesSection = createDynamicImport(
  () => import('@/components/sections/BonusesSection'),
  'BonusesSection'
);
const PricingStrategicSection = createDynamicImport(
  () => import('@/components/sections/PricingStrategicSection'),
  'PricingStrategicSection'
);
const TimelineSection = createDynamicImport(
  () => import('@/components/sections/TimelineSection'),
  'TimelineSection'
);
const AboutMentorSection = createDynamicImport(
  () => import('@/components/sections/AboutMentorSection'),
  'AboutMentorSection'
);
const FAQSection = createDynamicImport(
  () => import('@/components/sections/FAQSection'),
  'FAQSection'
);
const CommunitySection = createDynamicImport(
  () => import('@/components/sections/CommunitySection'),
  'CommunitySection'
);
const FinalCTASection = createDynamicImport(
  () => import('@/components/sections/FinalCTASection'),
  'FinalCTASection'
);
const Footer = createDynamicImport(
  () => import('@/components/sections/Footer'),
  'Footer'
);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <SoldOutBanner />
      <HeroSection />
      <BenefitsMarquee />
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <WhoIsItForSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <WhatsAppContactCard />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <SocialProofSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <ColdCallSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <ProgramStructureSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <MethodSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <TechnologyToolsSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <ComparisonSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <BonusesSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <PricingStrategicSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <TimelineSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <AboutMentorSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <CommunitySection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <FinalCTASection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <Footer />
      </Suspense>
    </main>
  );
}
