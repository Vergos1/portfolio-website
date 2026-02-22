'use client';
import { links } from '@shared-config';
import { useAppDispatch } from '@shared-hooks';
import { cn } from '@shared-lib';
import { toggleMenu } from '@shared-store/states';
import '@styles/header.css';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { useEffect, useRef } from 'react';
import { Magentic } from '@components-ui';
import { SvgLogo } from './svg-logo';

const ease = CustomEase.create('custom', 'M0,0 C0.52,0.01 0.16,1 1,1 ');

type AppHeaderWrapperProps = {
  color: 'Dark' | 'Light';
  className?: string;
  mode?: 'hamburger' | 'cross';
};

export const AppHeaderWrapper = ({
  color,
  className,
  mode = 'hamburger',
}: AppHeaderWrapperProps) => {
  const logoAnimationTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    logoAnimationTl.current = gsap
      .timeline({ paused: true })
      .fromTo(
        '.logo__animation path',
        { strokeDasharray: 500, strokeDashoffset: 500, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      )
      .fromTo(
        '.logo__animation',
        { filter: 'blur(8px)', opacity: 0 },
        { filter: 'blur(0px)', opacity: 1, duration: 0.6 },
        '-=1',
      )
      .fromTo(
        '.letter',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, ease: 'bounce.out' },
        '-=1',
      )
      .to(
        '.dev-text',
        { opacity: 0.3, duration: 0.6, repeat: 4, yoyo: true },
        '-=0.5',
      );

    return () => {
      logoAnimationTl.current?.kill();
    };
  }, []);

  const dispatch = useAppDispatch();
  return (
    <header className={cn('nav__container anime px-paddingX', className)}>
      <nav className="nav__bar">
        <div className="max-w-maxWidth">
          <Magentic
            href={links.home}
            strength={50}
            className={`nav__item text-xl font-bold text-color${color} before:bg-color${color}`}
            onMouseEnter={() => {
              console.log('hello');
              logoAnimationTl.current?.play();
            }}
            onMouseLeave={() => {
              logoAnimationTl.current?.reverse();
            }}
          >
            <SvgLogo />
          </Magentic>
          <Magentic
            strength={50}
            className={`mask nav__item h-8 w-8 cursor-pointer items-center text-color${color} before:bg-color${color}`}
            onClick={() => {
              if (mode === 'cross') {
                dispatch(toggleMenu({ isMenuOpen: false }));
              } else {
                dispatch(toggleMenu({ isMenuOpen: true, color: color }));
              }
            }}
          >
            <div
              className={cn('flex h-[0.9rem] w-full flex-col justify-between', {
                'scale-[.90] justify-center': mode === 'cross',
              })}
            >
              <div
                className={cn(`h-[0.15rem] w-full bg-color${color}`, {
                  'absolute rotate-45': mode === 'cross',
                })}
              ></div>
              <div
                className={cn(`h-[0.15rem] w-full bg-color${color}`, {
                  'absolute -rotate-45': mode === 'cross',
                })}
              ></div>
            </div>
          </Magentic>
        </div>
      </nav>
    </header>
  );
};
