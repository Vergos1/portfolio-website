import { Bulge } from '@components-ui';
import React from 'react';
import { AppHeaderWrapper } from '@components-layout';
import { AboutWrapper } from './about-wrapper';

export const AboutSection = () => {
  return (
    <section className="section section__2 second lightGradient px-paddingX pt-paddingY text-colorDark items-center justify-center pb-10">
      <Bulge type="Dark" />
      <AppHeaderWrapper color="Dark" />
      <AboutWrapper />
    </section>
  );
};
