import { isDesktop } from '@shared-utils';
import { Magentic } from './magentic';
import { ReactNode } from 'react';
import gsap from 'gsap';

type ButtonProps = {
  href: string;
  params: string;
  children: ReactNode;
};

export const Button = ({ href, children, params }: ButtonProps) => {
  return (
    <Magentic
      href={href}
      scrambleParams={{
        text: params,
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
      className="mask group mt-4 inline-flex max-h-max w-fit items-center justify-center rounded-full bg-colorDark px-6 py-3 text-[0.8rem] md:text-[0.7rem]"
    >
      <p className="shapka !flex items-center gap-3 text-colorLight">
        <span className="scrambleText whitespace-nowrap">{children}</span>
        <svg
          className="w-[0.7em] -rotate-45 text-colorLight"
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
  );
};
