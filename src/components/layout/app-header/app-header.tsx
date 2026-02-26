'use client';
import { links } from '@shared-config';
import { useAppDispatch, useAppSelector } from '@shared-hooks';
import { isDesktop } from '@shared-utils';
import { toggleMenu } from '@shared-store/states';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { useTransitionRouter } from 'next-transition-router';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { AppFooter } from '@components-layout';
import { AppHeaderWrapper } from './app-header-wrapper';

export const AppHeader = () => {
  const dispatch = useAppDispatch();
  const router = useTransitionRouter();
  const pathname = usePathname();
  const { isMenuOpen, color } = useAppSelector(state => state.menu);

  const ease = CustomEase.create('custom', 'M0,0 C0.52,0.01 0.16,1 1,1 ');

  const headerAnimation = useRef<gsap.core.Timeline | null>(null);

  const handleNavClick = (path: string) => {
    dispatch(toggleMenu({ isMenuOpen: false }));
    if (path === pathname) {
      return;
    }
    router.push(path);
  };

  useEffect(() => {
    const flexHeight = isDesktop() ? '20vh' : '7vh';
    headerAnimation.current = gsap
      .timeline()
      .set('#headerNavigation', {
        display: 'flex',
      })
      .to('#headerNavigation', {
        duration: 1,
        y: '0%',
        ease,
      })
      .fromTo(
        '#headerNavigation .rounded__div__up',
        {
          height: flexHeight,
        },
        {
          height: '0vh',
          duration: 1,
          ease,
        },
        '-=0.9',
      )
      .fromTo(
        '.headerAnimate',
        {
          y: '-20vh',
        },
        {
          y: '0vh',
          duration: 1,
          stagger: -0.08,
          ease,
        },
        '-=1.2',
      );

    return () => {
      headerAnimation.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      headerAnimation.current?.play();
    } else {
      headerAnimation.current?.reverse();
    }
  }, [isMenuOpen]);

  const headerData = [
    {
      name: 'Home',
      href: links.home,
    },

    {
      name: 'Work',
      href: links.work,
    },
    {
      name: 'Contact',
      href: links.email,
    },
  ];
  return (
    <div
      id="headerNavigation"
      className="fixed left-0 top-0 z-[6000] hidden h-full w-full -translate-y-full flex-col items-center justify-center p-paddingX"
    >
      <AppHeaderWrapper
        mode="cross"
        className="headerAnimate"
        color={color == 'Light' ? 'Dark' : 'Light'}
      />
      <nav>
        <ul className="mask flex flex-col items-center justify-center px-8 py-[10vh]">
          {headerData.map(data => (
            <li className="headerAnimate" key={data.name}>
              <button
                className={`text-[clamp(32px,_3.3vw_+_32px,_88px)] font-bold text-color${
                  color == 'Light' ? 'Dark' : 'Light'
                }`}
                onClick={() => handleNavClick(data.href)}
              >
                <span className="scrambleText">{data.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute left-0 top-0 -z-40 flex h-full w-full flex-col">
        <div
          className={`${
            color == 'Light' ? 'lightGradient' : 'darkGradient'
          } h-full w-full grow`}
        ></div>
        <div className="rounded__div__up !relative z-50">
          <div
            className={`round__bg__up ${
              color == 'Light' ? 'lightGradient' : 'darkGradient'
            }`}
          ></div>
        </div>
      </div>
      <AppFooter className="headerAnimate bottom-2 z-10 w-full" />
    </div>
  );
};
