'use client';

import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import SplitType from 'split-type';
import { HeroButton } from './hero-button';
import HeroImage from '@public/image/hero-image.jpg';
import Image from 'next/image';
import { Magentic, Typography } from '@components-ui';

export const HeroWrapper = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    gsap.set(containerRef.current, { autoAlpha: 1 });

    if (!containerRef.current) return;

    const titleChars = new SplitType('.hero-text-anim', {
      types: 'chars',
      tagName: 'span',
    }).chars;

    gsap.from(titleChars, {
      opacity: 0,
      scale: 0.5,
      rotation: 15,
      y: 30,
      stagger: 0.08,
      duration: 0.7,
      ease: 'back.out(1.7)',
    });

    tl.fromTo(
      '.hero-button-anim',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' },
      '<+0.2',
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ visibility: 'hidden' }}
      className="section1__wrapper relative z-20 flex h-full w-full flex-col items-center justify-center text-colorLight"
    >
      <div className="flex max-w-full flex-col items-center justify-center text-center">
        <span className="mb-4 flex items-center text-2xl font-light uppercase text-colorSecondaryLight md:text-6xl">
          Hey, I’m
          <Magentic>
            <Image
              src={HeroImage}
              alt="alt"
              className="ml-4 mr-4 h-10 w-10 overflow-hidden rounded-full bg-center md:h-12 md:w-12"
            />
          </Magentic>
          Igor
        </span>
        <Typography as="h1" variant="h1" className="hero-text-anim text-pretty">
          I create interactive <br /> web & mobile solutions.
        </Typography>
      </div>

      <div className="hero-button-anim absolute bottom-10 left-0 right-0 w-full">
        <HeroButton />
      </div>
    </div>
  );
};
