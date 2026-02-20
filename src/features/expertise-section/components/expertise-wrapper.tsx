import { Typography } from '@components-ui';
import { Magentic } from '@components-ui';
import { links } from '@shared-config';
import { isDesktop } from '@shared-utils';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ShapeIcon from '@public/svg/titles-shape.svg';
import 'swiper/css';

const expertiseList = [
  {
    id: 1,
    title: 'Architecture & Development',
    description:
      'Experience in designing and implementing architecture, developing large products from scratch. I take on the entire cycle — from requirements to release — and ensure stability, predictable delivery, and maintainable code.',
  },
  {
    id: 2,
    title: 'UI/UX Engineering',
    description:
      'I create user-friendly and adaptive interfaces that not only look modern but also solve business problems. I use best UI/UX practices to make the product intuitive and engaging.',
  },
  {
    id: 3,
    title: 'Performance & Optimization',
    description:
      'I optimise performance: SSR, code splitting, lazy loading, virtualisation. I improve Lighthouse scores, speed up loading times, and eliminate bottlenecks to ensure that the product runs quickly and stably.',
  },
  {
    id: 4,
    title: 'Collaboration & Growth',
    description:
      'I work closely with PM, designers, and QA, implement analytics (Sentry, Mixpanel, GA, Pixel), and support code reviews. I help the team grow through mentoring and quality standards so that the product develops confidently.',
  },
];

export const ExpertiseWrapper = () => {
  const [text, setText] = useState({
    main: 'Featured Work',
    para: `Building high-end, pixel-perfect websites for agencies and individuals while creating high quality rebuilds in my free time.`,
  });
  useEffect(() => {
    if (!isDesktop()) {
      setText({
        main: 'Recent Work',
        para: `Building high-end websites with agencies and individuals while creating rebuilds in my free time.`,
      });
    }
  }, []);

  return (
    <div className="flex h-full w-full max-w-maxWidth grow flex-col justify-center text-[5.8vw] text-colorLight md:text-[clamp(20px,_1vw_+_14px,_32px)]">
      <div className="anime flex flex-col gap-12">
        <Typography
          as="h2"
          variant="h2"
          shape={<Image src={ShapeIcon} alt="Shape" width={60} />}
        >
          Expertise
        </Typography>
        <div className="grid max-h-full grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-2 sm:grid-rows-2 sm:gap-16">
          {expertiseList.map(({ id, title, description }) => (
            <Magentic key={id} className="flex flex-col">
              <Typography as="h3" variant="h3">
                {title}
              </Typography>
              <Typography as="p" variant="body">
                {description}
              </Typography>
            </Magentic>
          ))}
        </div>
      </div>
    </div>
  );
};
