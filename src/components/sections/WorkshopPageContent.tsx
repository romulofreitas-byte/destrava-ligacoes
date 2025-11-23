'use client';

import React from 'react';
import { HeroSectionWorkshop } from '@/components/sections/HeroSectionWorkshop';
import { EventDetailsSection } from '@/components/sections/EventDetailsSection';
import { WhoIsItForWorkshopSection } from '@/components/sections/WhoIsItForWorkshopSection';
import { WhyYouStuckSection } from '@/components/sections/WhyYouStuckSection';
import { TestimonialsVideoSection } from '@/components/sections/TestimonialsVideoSection';
import { WhatYouWillLearnSection } from '@/components/sections/WhatYouWillLearnSection';
import { LiveCallsSection } from '@/components/sections/LiveCallsSection';
import { AboutRomuloWorkshopSection } from '@/components/sections/AboutRomuloWorkshopSection';
import { WhyItWorksSection } from '@/components/sections/WhyItWorksSection';
import { AfterWorkshopSection } from '@/components/sections/AfterWorkshopSection';
import { TestimonialsScrollSection } from '@/components/sections/TestimonialsScrollSection';
import { FinalCTAWorkshopSection } from '@/components/sections/FinalCTAWorkshopSection';
import { Footer } from '@/components/sections/Footer';
import { SubtleHelpModal } from '@/components/ui/SubtleHelpModal';
import { ModalProvider } from '@/contexts/ModalContext';

export const WorkshopPageContent: React.FC = () => {
  return (
    <ModalProvider>
      <main className="min-h-screen bg-gray-900">
        <HeroSectionWorkshop />
        <EventDetailsSection />
        <WhoIsItForWorkshopSection />
        <WhyYouStuckSection />
        <TestimonialsVideoSection />
        <WhatYouWillLearnSection />
        <LiveCallsSection />
        <AboutRomuloWorkshopSection />
        <WhyItWorksSection />
        <AfterWorkshopSection />
        <TestimonialsScrollSection />
        <FinalCTAWorkshopSection />
        <Footer />
        <SubtleHelpModal />
      </main>
    </ModalProvider>
  );
};

