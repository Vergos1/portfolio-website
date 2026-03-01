import { Bulge } from '@components-ui';
import { useRef } from 'react';
import { AboutWrapper } from './about-wrapper';

export const AboutSection = () => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="section section__2 second darkGradient items-center justify-center px-paddingX pb-10 pt-paddingY text-colorDark"
    >
      <Bulge type="Light" />
      <AboutWrapper />
    </section>
  );
};
