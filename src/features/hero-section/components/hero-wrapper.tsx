'use client';

import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import SplitType from 'split-type';
import { HeroButton } from './hero-button';

export const HeroWrapper = () => {
  const containerRef = useRef<HTMLElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !subTextRef.current) return;

    gsap.set(containerRef.current, { autoAlpha: 1 });

    const titleChars = new SplitType('.hero-text-anim', { types: 'chars' })
      .chars;

    const subTextParagraph = subTextRef.current.querySelector('p');
    if (!subTextParagraph) return;
    const subTextWords = new SplitType(subTextParagraph, { types: 'words' })
      .words;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      titleChars,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.04, duration: 1.4, ease: 'power4.out' },
    );

    tl.fromTo(
      subTextRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'power2.out' },
      '<=0.8',
    );

    tl.fromTo(
      subTextWords,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
      '<+0.4',
    );

    // 4. Появление кнопки
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
    <main
      ref={containerRef}
      style={{ visibility: 'hidden' }}
      className="section1__wrapper max-w-maxWidth text-colorLight relative z-20 flex h-full w-full flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="hero-text-anim text-[clamp(2.5rem,12vw,7rem)] leading-none font-extrabold tracking-tight uppercase">
          Creative Developer
        </h1>

        <div
          ref={subTextRef}
          className="mt-4 w-max rounded-lg bg-black/40 px-6 py-3 shadow-[0_0_40px_rgba(255,255,255,0.08)] backdrop-blur-md"
        >
          <p className="text-lg text-white">
            Crafting digital experiences with code and passion.
          </p>
        </div>
      </div>

      <div className="hero-button-anim absolute right-0 bottom-10 left-0 w-full">
        <HeroButton />
      </div>
    </main>
  );
};
