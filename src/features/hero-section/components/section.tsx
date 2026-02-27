import { useRef } from 'react';

import { HeroWrapper } from './hero-wrapper';
import { AppHeaderWrapper } from '@components-layout';
import '@styles/index.css';

export const HeroSection = () => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="section section__1 darkGradient first relative z-0 px-paddingX text-colorLight"
    >
      <AppHeaderWrapper color="Light" />
      <HeroWrapper />
    </section>
  );
};
