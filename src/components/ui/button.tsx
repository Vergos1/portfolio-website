import { isDesktop } from '@shared-utils';
import { Magentic } from './magentic';
import { ReactNode } from 'react';
import { cn } from '@shared-lib';

type ButtonProps = {
  href: string;
  params: string;
  children: ReactNode;
  className?: string;
  textColor: "colorDark" | "colorLight";
};

export const Button = ({ href, children, params, className, textColor }: ButtonProps) => {
  const handleMouseEnter = () => {
    if (!isDesktop()) return;
    document.body.classList.add('inverted');
  };

  const handleMouseLeave = () => {
    if (!isDesktop()) return;
    document.body.classList.remove('inverted');
  };

  return (
    <Magentic
      href={href}
      scrambleParams={{ text: params }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'mask group inline-flex max-h-max w-fit items-center justify-center rounded-full m-4 md:p-5 p-3 md:px-16 px-10 font-medium text-lg',
        className,
      )}
    >
      <p className={`shapka !flex items-center gap-3 text-`}>
        <span className={`"scrambleText whitespace-nowrap text-${textColor}`}>{children}</span>
        <svg
          className={`w-[0.7em] -rotate-45 text-${textColor}`}
          viewBox="0 0 14 14"
          xmlns="http://www.w3.org/2000/svg"
        >
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