import { Bulge } from '@components-ui';
import React, { useRef } from 'react';
import { AppHeaderWrapper } from '@components-layout';
import { AboutWrapper } from './about-wrapper';

export const AboutSection = () => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="section section__2 second lightGradient items-center justify-center px-paddingX pb-10 pt-paddingY text-colorDark"
    >
      <Bulge type="Dark" />
      <AboutWrapper />
    </section>
  );
};
