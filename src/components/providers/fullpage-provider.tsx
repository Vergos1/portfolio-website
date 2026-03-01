'use client';

import type { fullpageOptions, Item } from '@fullpage/react-fullpage';
import ReactFullpage from '@fullpage/react-fullpage';
import React, { useEffect, useRef } from 'react';
import { CustomEase } from 'gsap/CustomEase';
import { animateRounded, animateText } from '@shared-lib';
import { gsap } from 'gsap';
import { useAppDispatch } from '@shared-hooks';
import { splineSceneVisibility, setActiveSlide, setHeaderBackground, Anchor, Direction } from '@shared-store/states';



const opts: fullpageOptions = {
  autoScrolling: true,
  scrollOverflow: false,
  normalScrollElements: '.scrollable',
  navigationPosition: 'left',
  scrollingSpeed: 1300,
  scrollHorizontally: false,
  navigation: false,
  easingcss3: 'cubic-bezier(.70,0,.30,1)',
  anchors: ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'],
  licenseKey: 'gplv3-license',
  credits: {
    enabled: false,
  },
};

export const FullPageProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const about = useRef<gsap.core.Timeline | null>(null);
  const textAnimSection2Down = useRef<gsap.core.Tween | null>(null);
  const videoElement = useRef<HTMLVideoElement | null>(null);

  const dispatch = useAppDispatch();

  const onLeave = (_: Item, destination: Item, direction: string) => {
    const anchor = destination.anchor as string;

    dispatch(setActiveSlide([anchor as Anchor, direction as Direction]));
    dispatch(setHeaderBackground(anchor as Anchor));

    // It will patch border that comes when we snap by include dark gradient class on body that has higher specfitcy than light gradient
    if (destination.anchor == 'second' || destination.anchor == 'fourth') {
      document.body.classList.add('darkGradient');
    } else {
      document.body.classList.remove('darkGradient');
    }

    if (destination.anchor == 'first') {
      dispatch(splineSceneVisibility(true));
    } else {
      dispatch(splineSceneVisibility(false));
    }

    if (destination.anchor == 'first') {
      if (direction == 'down') {
      } else {
        about.current?.seek(0.3);
        console.log('SeeKed');
      }
    }

    if (destination.anchor == 'second') {
      if (direction == 'down') {
        textAnimSection2Down.current?.restart(true);
      } else {
        textAnimSection2Down.current?.restart();
      }
      videoElement.current && (videoElement.current.currentTime = 1.6);
      videoElement.current?.play();
    }

    const dir = direction === 'down' ? 'down' : 'up';
    const selector = `.${destination.anchor}`;

    animateText(selector, dir);
    animateRounded(selector, dir);
  };

  useEffect(() => {
    const ease = CustomEase.create('custom', 'M0,0 C0.52,0.01 0.16,1 1,1 ');

    about.current = gsap
      .timeline({ defaults: { ease: 'none' }, repeat: -1 })
      .fromTo(
        '.left .animate__this1',
        {
          y: '0%',
          opacity: 1,
        },
        {
          y: '-140%',
          opacity: 0,
          duration: 0.9,
          delay: 1.7,
          ease,
        },
      )
      .fromTo(
        '.left .animate__this2',
        {
          y: '140%',
          opacity: 0,
        },
        {
          y: '0%',
          opacity: 1,
          duration: 0.9,
          ease,
        },
        '-=0.9',
      )
      .fromTo(
        '.left .animate__this2',
        {
          y: '0%',
          opacity: 1,
        },
        {
          y: '-140%',
          opacity: 0,
          delay: 1.7,
          duration: 0.9,
          ease,
        },
      )
      .fromTo(
        '.left .animate__this1',
        {
          y: '140%',
          opacity: 0,
        },
        {
          y: '0%',
          opacity: 1,
          duration: 0.9,
          ease,
        },
        '-=0.9',
      );

    videoElement.current = document.querySelector('#video') as HTMLVideoElement;

    return () => {
      about.current?.kill();
    };
  }, []);

  return (
    <ReactFullpage
      {...opts}
      onLeave={onLeave}
      render={() => {
        return <ReactFullpage.Wrapper>{children}</ReactFullpage.Wrapper>;
      }}
    />
  );
};
