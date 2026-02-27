'use client';

import { ContactsSection } from '@features/contacts-section';
import { AboutSection } from '@features/about-section';
import { HeroSection } from '@features/hero-section';
import { ExpertiseSection } from '@features/expertise-section';
import {
  FullPageProvider,
  useFullPage,
  type FullPageConfig,
} from '@/components/providers';
import { FpSection } from '@/components/providers/fp-section';
import {
  FpCard,
  FpHorizontalTrack,
} from '@/components/providers/fp-horizontal';
import { FpFreeScrollInner } from '@/components/providers/fp-free-scroll';

const FP_CONFIG: FullPageConfig = {
  transitionDuration: 1100,
  transitionEase: 'power3.inOut',
  sectionCooldown: 700,
  freeScrollFriction: 0.07,
  freeScrollWheelMultiplier: 1.2,
  horizontalScrollThreshold: 60,
};

export function AppMain() {
  return (
    <FullPageProvider
      config={FP_CONFIG}
      onSectionChange={({ index, anchor, direction }) => {
        console.log('[fp]', index, anchor, direction);
      }}
    >
      {/* Hero (dark) → About (light): wave = light */}
      <FpSection type="fullpage" anchor="hero" waveVariant="light">
        <HeroSection />
      </FpSection>

      {/* About (light) → Expertise (dark): wave = dark */}
      <FpSection type="free-scroll" anchor="about" waveVariant="dark">
        <FpFreeScrollInner>
          <AboutSection />
        </FpFreeScrollInner>
      </FpSection>

      {/* Expertise (dark) → Contacts (dark): wave = dark */}
      <FpSection type="horizontal" anchor="expertise" waveVariant="dark">
        <FpHorizontalTrack>
          <FpCard>
            <ExpertiseSection />
          </FpCard>
          <FpCard>
            <ExpertiseSection />
          </FpCard>
          <FpCard>
            <ExpertiseSection />
          </FpCard>
        </FpHorizontalTrack>
        <HorizontalDots total={3} />
      </FpSection>

      {/* Contacts — last section, wave color doesn't matter */}
      <FpSection type="fullpage" anchor="contacts" waveVariant="light">
        <ContactsSection />
      </FpSection>
    </FullPageProvider>
  );
}

function HorizontalDots({ total }: { total: number }) {
  const { hCurrentIndex, scrollHorizontal } = useFullPage();
  return (
    <div className="absolute bottom-6 left-1/2 z-50 flex -translate-x-1/2 gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => scrollHorizontal(i)}
          className={`h-[3px] rounded-full transition-all duration-300 ${i === hCurrentIndex ? 'w-8 bg-white' : 'w-4 bg-white/30'}`}
          aria-label={`Slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

export function FpDotNav() {
  const { currentSection, goToSection, totalSections } = useFullPage();
  return (
    <nav className="fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3">
      {Array.from({ length: totalSections }).map((_, i) => (
        <button
          key={i}
          onClick={() => goToSection(i)}
          className={`h-2 w-2 rounded-full transition-all duration-300 ${i === currentSection ? 'scale-150 bg-white' : 'bg-white/30 hover:bg-white/60'}`}
          aria-label={`Section ${i + 1}`}
        />
      ))}
    </nav>
  );
}
