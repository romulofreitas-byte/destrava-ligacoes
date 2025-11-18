'use client';

import React from 'react';
import { HeroSectionWorkshop } from '@/components/sections/HeroSectionWorkshop';
import { EventDetailsSection } from '@/components/sections/EventDetailsSection';
import { WhoIsItForWorkshopSection } from '@/components/sections/WhoIsItForWorkshopSection';
import { WhyYouStuckSection } from '@/components/sections/WhyYouStuckSection';
import { WhatYouWillLearnSection } from '@/components/sections/WhatYouWillLearnSection';
import { LiveCallsSection } from '@/components/sections/LiveCallsSection';
import { AboutRomuloWorkshopSection } from '@/components/sections/AboutRomuloWorkshopSection';
import { WhyItWorksSection } from '@/components/sections/WhyItWorksSection';
import { AfterWorkshopSection } from '@/components/sections/AfterWorkshopSection';
import { FinalCTAWorkshopSection } from '@/components/sections/FinalCTAWorkshopSection';
import { Footer } from '@/components/sections/Footer';

export const WorkshopPageContent: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-900">
      <HeroSectionWorkshop />
      <EventDetailsSection />
      <WhoIsItForWorkshopSection />
      <WhyYouStuckSection />
      <WhatYouWillLearnSection />
      <LiveCallsSection />
      <AboutRomuloWorkshopSection />
      <WhyItWorksSection />
      <AfterWorkshopSection />
      <FinalCTAWorkshopSection />
      <Footer />
    </main>
  );
};

