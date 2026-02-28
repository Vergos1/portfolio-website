import { isDesktop } from '@shared-utils';
import { Magentic } from './magentic';
import { ReactNode } from 'react';
import gsap from 'gsap';
import { cn } from '@shared-lib';

type ButtonProps = {
  href: string;
  params: string;
  children: ReactNode;
  className?: string;
  invertTarget?: string;
};

const COLORS_DEFAULT = {
  '--colorLight': '#fff',
  '--colorDark': '#0e0d0c',
  '--colorSecondaryDark': '#404040',
  '--colorSecondaryLight': '#bfbfbf',
  '--colorSecondaryHalfLight': '#f2f2f2',
  '--colorSecondaryHalfDark': '#1a1a1a',
  '--colorWhite': '#fff',
};

const COLORS_INVERTED = {
  '--colorLight': '#0e0d0c',
  '--colorDark': '#fff',
  '--colorSecondaryDark': '#bfbfbf',
  '--colorSecondaryLight': '#404040',
  '--colorSecondaryHalfLight': '#1a1a1a',
  '--colorSecondaryHalfDark': '#f2f2f2',
  '--colorWhite': '#000',
};

export const Button = ({ href, children, params, className, invertTarget = 'body' }: ButtonProps) => {
  return (
    <Magentic
      href={href}
      scrambleParams={{ text: params }}
      onMouseEnter={() => {
        if (isDesktop()) {
          gsap.to(invertTarget, COLORS_INVERTED);
        }
      }}
      onMouseLeave={() => {
        if (isDesktop()) {
          gsap.to(invertTarget, COLORS_DEFAULT);
        }
      }}
      className={cn(
        'mask group inline-flex max-h-max w-fit items-center justify-center rounded-full bg-colorDark m-4 md:p-5 p-3 md:px-16 px-10 font-medium text-lg',
        className,
      )}
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
          <g stroke="none" strokeWidth="2.5" fill="none" fillRule="evenodd">
            <g
              transform="translate(-1019.000000, -279.000000)"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <g transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)">
                <polyline points="2.76923077 0 12 0 12 9.23076923" />
                <line x1="12" y1="0" x2="0" y2="12" />
              </g>
            </g>
          </g>
        </svg>
      </p>
    </Magentic>
  );
};