import { Magentic } from '@components-ui';
import { links } from '@shared-config';
import { isDesktop } from '@shared-utils';
import { gsap } from 'gsap';
import { useEffect, useState } from 'react';
import 'swiper/css';

export const AboutWrapper = () => {
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
    <main className="max-w-maxWidth flex h-full w-full grow flex-col justify-center text-[5.8vw] md:text-[clamp(20px,_1vw_+_14px,_32px)]">
      <div className="anime relative flex h-[260px] w-full items-center justify-center md:h-[380px]">
        <div className="flex flex-col items-center justify-center">
          <div className="anime">
            <h2 className="work_heading mask">{text.main}</h2>
          </div>
        </div>
        <div className="section3__video overflow-hidden rounded-3xl bg-black md:rounded-[3rem]">
          <video
            className=""
            id="video"
            playsInline
            autoPlay
            muted
            loop
            src="/video/banner.mp4"
          />
        </div>
      </div>

      <div className="customBorder anime bg-colorSecondaryLight mx-auto my-[1.5em] h-[2px] w-[calc(100%_-_20px)] self-start rounded-full opacity-30"></div>

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
          className="mask group bg-colorDark h-full items-center justify-center rounded-2xl p-3 md:relative md:min-h-full md:w-[33%] md:rounded-full"
        >
          <p className="shapka text-colorLight !flex text-[0.9em] md:text-[0.7em]">
            <span className="scrambleText whitespace-nowrap">
              View all Work
            </span>
            <svg
              className="text-colorLight ml-4 w-[0.7em] -rotate-45"
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
          className="text-colorSecondaryDark text-left leading-[1.3] md:w-[100%]"
        >
          {text.para}
        </p>
      </div>
    </main>
  );
};
