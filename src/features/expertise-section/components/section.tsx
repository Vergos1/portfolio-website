import { Bulge } from '@components-ui';
import { ExpertiseWrapper } from './expertise-wrapper';

export const ExpertiseSection = () => {
  return (
    <section
      className="section__3 third lightGradient items-center justify-center px-paddingX pb-10 pt-paddingY text-colorDark"
    >
      <Bulge type="Dark" />
      <ExpertiseWrapper />
    </section>
  );
};
