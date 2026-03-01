'use client';

import { ContactsSection } from '@features/contacts-section';
import { AboutSection } from '@features/about-section';
import { HeroSection } from '@features/hero-section';
import { useRef } from 'react';
import { ExpertiseSection } from '@features/expertise-section';
import { useSectionObserver } from '@shared-hooks';

export function AppMain() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useSectionObserver(containerRef);

  return (
    <div ref={containerRef}>
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ContactsSection />
    </div>
  );
}
