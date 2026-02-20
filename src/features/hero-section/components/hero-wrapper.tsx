'use client';

import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import SplitType from 'split-type';
import { HeroButton } from './hero-button';
import HeroImagePc from '../../../../public/image/hero-image-1.jpg';
import HeroImageCode from '../../../../public/image/hero-image-2.png';
import Image from 'next/image';

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

    const imageElements =
      containerRef.current.querySelectorAll<HTMLDivElement>('.hero-image-anim');

    tl.fromTo(
      titleChars,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.04, duration: 0.4, ease: 'power4.out' },
    );

    tl.fromTo(
      imageElements,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.04,
        duration: 0.2,
        ease: 'power4.out',
      },
    );

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
        <h1 className="font-syne hero-text-anim text-pretty text-[1rem] font-bold uppercase leading-none tracking-tight [word-spacing:1rem] sm:text-[5.2rem]">
          i am a
          <div className="hero-image-anim pointer-events-none ml-4 mr-4 h-16 w-32 overflow-hidden rounded-full bg-top">
            <Image
              src={HeroImagePc}
              alt="alt"
              className="-mt-10"
              width={163}
              height={64}
            />
          </div>
          software developer creating
          <div className="hero-image-anim pointer-events-none ml-4 mr-4 h-16 w-32 overflow-hidden rounded-full">
            <Image src={HeroImageCode.src} alt="alt" width={163} height={64} />
          </div>
          scalable <br /> & reliable solutions
        </h1>
      </div>

      {/* <div className="hero-button-anim absolute bottom-10 left-0 right-0 w-full">
        <HeroButton />
      </div> */}
    </div>
  );
};
