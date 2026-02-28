import { Bulge } from '@components-ui';
import { useRef } from 'react';
import { ExpertiseWrapper } from './expertise-wrapper';

export const ExpertiseSection = () => {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="section section__3 third darkGradient items-center justify-center px-paddingX pb-10 pt-paddingY text-colorDark"
    >
      <Bulge type="Light" />
      <ExpertiseWrapper />
    </section>
  );
};
