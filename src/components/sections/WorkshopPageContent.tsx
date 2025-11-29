'use client';

import React from 'react';
import { HeroSectionWorkshop } from '@/components/sections/HeroSectionWorkshop';
import { FirstEditionSuccessBanner } from '@/components/sections/FirstEditionSuccessBanner';
import { EventDetailsSection } from '@/components/sections/EventDetailsSection';
import { WhoIsItForWorkshopSection } from '@/components/sections/WhoIsItForWorkshopSection';
import { ColdCallQuizSection } from '@/components/sections/ColdCallQuizSection';
import { WhyYouStuckSection } from '@/components/sections/WhyYouStuckSection';
import { TestimonialsVideoSection } from '@/components/sections/TestimonialsVideoSection';
import { WhatYouWillLearnSection } from '@/components/sections/WhatYouWillLearnSection';
import { WhyDifferentWorkshopSection } from '@/components/sections/WhyDifferentWorkshopSection';
import { NicheApplicationSection } from '@/components/sections/NicheApplicationSection';
import { LiveCallsSection } from '@/components/sections/LiveCallsSection';
import { AboutRomuloWorkshopSection } from '@/components/sections/AboutRomuloWorkshopSection';
import { AfterWorkshopSection } from '@/components/sections/AfterWorkshopSection';
import { TestimonialsScrollSection } from '@/components/sections/TestimonialsScrollSection';
import { FinalCTAWorkshopSection } from '@/components/sections/FinalCTAWorkshopSection';
import { LogoSeparator } from '@/components/sections/LogoSeparator';
import { WorkshopFAQSection } from '@/components/sections/WorkshopFAQSection';
import { Footer } from '@/components/sections/Footer';
import { SubtleHelpModal } from '@/components/ui/SubtleHelpModal';
import { ModalProvider } from '@/contexts/ModalContext';
import { FloatingWhatsAppButton } from '@/components/FloatingWhatsAppButton';

export const WorkshopPageContent: React.FC = () => {
  return (
    <ModalProvider>
      <main className="min-h-screen bg-gray-900">
        <HeroSectionWorkshop />
        <FirstEditionSuccessBanner />
        <LiveCallsSection />
        <EventDetailsSection />
        <WhoIsItForWorkshopSection />
        <ColdCallQuizSection />
        <WhyYouStuckSection />
        <TestimonialsVideoSection />
        <WhatYouWillLearnSection />
        <LogoSeparator />
        <AboutRomuloWorkshopSection />
        <WhyDifferentWorkshopSection />
        <NicheApplicationSection />
        <LogoSeparator />
        <AfterWorkshopSection />
        <TestimonialsScrollSection />
        <WorkshopFAQSection />
        <FinalCTAWorkshopSection />
        <Footer />
        <SubtleHelpModal />
        <FloatingWhatsAppButton />
      </main>
    </ModalProvider>
  );
};

