import {
  TypographyH2,
  TypographyH3,
  TypographyDescription,
} from '@components-ui';
import { Magentic } from '@components-ui';
import { links } from '@shared-config';
import { isDesktop } from '@shared-utils';
import { gsap } from 'gsap';
import { useEffect, useState } from 'react';
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
      <div className="flex flex-col gap-12">
        <TypographyH2>Expertise</TypographyH2>
        <div className="grid max-h-full grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-2 sm:grid-rows-2 sm:gap-16">
          {expertiseList.map(({ id, title, description }) => (
            <div key={id}>
              <TypographyH3>{title}</TypographyH3>
              <TypographyDescription>{description}</TypographyDescription>
            </div>
          ))}
        </div>
      </div>
      <div className="anime relative flex flex-col gap-[1em] md:flex-row-reverse md:gap-[2em]">
        <Magentic
          href={links.work}
          scrambleParams={{
            text: 'View all Work',
          }}
          onMouseEnter={() => {
            if (isDesktop()) {
              gsap.to('body', {
                '--colorLight': '#0e0d0c',
                '--colorDark': '#fff',
                '--colorSecondaryDark': '#bfbfbf',
                '--colorSecondaryLight': '#404040',
                '--colorSecondaryHalfLight': '#1a1a1a',
                '--colorSecondaryHalfDark': '#f2f2f2',
                '--colorWhite': '#000',
              });
            }
          }}
          onMouseLeave={() => {
            if (isDesktop()) {
              gsap.to('body', {
                '--colorLight': '#fff',
                '--colorDark': '#0e0d0c',
                '--colorSecondaryDark': '#404040',
                '--colorSecondaryLight': '#bfbfbf',
                '--colorSecondaryHalfLight': '#f2f2f2',
                '--colorSecondaryHalfDark': '#1a1a1a',
                '--colorWhite': '#fff',
              });
            }
          }}
          className="mask group h-full items-center justify-center rounded-2xl bg-colorDark p-3 md:relative md:min-h-full md:w-[33%] md:rounded-full"
        >
          <p className="shapka !flex text-[0.9em] text-colorLight md:text-[0.7em]">
            <span className="scrambleText whitespace-nowrap">
              View all Work
            </span>
            <svg
              className="ml-4 w-[0.7em] -rotate-45 text-colorLight"
              viewBox="0 0 14 14"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>arrow-up-right</title>
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="2.5"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Artboard"
                  transform="translate(-1019.000000, -279.000000)"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <g
                    id="arrow-up-right"
                    transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)"
                  >
                    <polyline
                      id="Path"
                      points="2.76923077 0 12 0 12 9.23076923"
                    ></polyline>
                    <line x1="12" y1="0" x2="0" y2="12" id="Path"></line>
                  </g>
                </g>
              </g>
            </svg>
          </p>
        </Magentic>
        <p
          id="my-text"
          className="text-left leading-[1.3] text-colorSecondaryDark md:w-[100%]"
        >
          {text.para}
        </p>
      </div>
    </div>
  );
};
