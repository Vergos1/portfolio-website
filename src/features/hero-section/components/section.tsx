import { useRef } from 'react';

import { Bulge } from '@components-ui';
import { HeroWrapper } from './hero-wrapper';
import '@styles/index.css';

export const HeroSection = () => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="section section__1 darkGradient first relative z-0 px-paddingX text-colorLight"
    >
      <Bulge type="Light" />
      <HeroWrapper />
    </section>
  );
};
