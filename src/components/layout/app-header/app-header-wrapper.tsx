'use client';
import { links } from '@shared-config';
import { useAppDispatch, useAppSelector } from '@shared-hooks';
import { cn } from '@shared-lib';
import { toggleMenu } from '@shared-store/states';
import '@styles/header.css';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef } from 'react';
import { Magentic } from '@components-ui';
import { SvgLogo } from './svg-logo';

type AppHeaderWrapperProps = {
  className?: string;
  mode?: 'hamburger' | 'cross';
};

export const AppHeaderWrapper = ({ className, mode = 'hamburger' }: AppHeaderWrapperProps) => {
  const dispatch = useAppDispatch();
  const color = useAppSelector(state => state.fullPage.selectedBackground);
  const headerRef = useRef<HTMLElement>(null);
  const logoAnimationTl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    logoAnimationTl.current = gsap
      .timeline({ paused: true })
      .fromTo(
        '.logo__animation',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=1',
      )
  }, { scope: headerRef });

  useEffect(() => {
    if (!headerRef.current) return;
    const targetColor = color === 'Light' ? '#ffffff' : '#0e0d0c';
    headerRef.current.style.setProperty('--header-color', targetColor);
  }, [color]);

  return (
    <header ref={headerRef} className={cn('nav__container anime px-paddingX', className)}>
      <nav className="nav__bar">
        <div className="max-w-maxWidth">
          <Magentic
            href={links.home}
            strength={50}
            className="nav__item text-xl font-bold text-[--header-color] before:bg-[--header-color]"
            onMouseEnter={() => logoAnimationTl.current?.play()}
            onMouseLeave={() => logoAnimationTl.current?.reverse()}
          >
            <SvgLogo />
          </Magentic>
          <Magentic
            strength={50}
            className="mask nav__item h-8 w-8 cursor-pointer items-center text-[--header-color] before:bg-[--header-color]"
            onClick={() => {
              dispatch(toggleMenu(
                mode === 'cross'
                  ? { isMenuOpen: false }
                  : { isMenuOpen: true, color }
              ));
            }}
          >
            <div className={cn('flex h-[0.9rem] w-full flex-col justify-between', {
              'scale-[.90] justify-center': mode === 'cross',
            })}>
              <div className={cn('h-[0.15rem] w-full bg-[--header-color]', {
                'absolute rotate-45': mode === 'cross',
              })} />
              <div className={cn('h-[0.15rem] w-full bg-[--header-color]', {
                'absolute -rotate-45': mode === 'cross',
              })} />
            </div>
          </Magentic>
        </div>
      </nav>
    </header>
  );
};