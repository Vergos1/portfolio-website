'use client';

import { ContactsSection } from '@features/contacts-section';
import { AboutSection } from '@features/about-section';
import { HeroSection } from '@features/hero-section';
import { Fragment } from 'react';
import { ExpertiseSection } from '@features/expertise-section';

export function AppMain() {
  return (
    <Fragment>
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ContactsSection />
    </Fragment>
  );
}
