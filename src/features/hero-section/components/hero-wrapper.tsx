'use client';

import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import SplitType from 'split-type';
import { HeroButton } from './hero-button';
import HeroImage from '@public/image/hero-image.jpg';
import Image from 'next/image';
import { Button, Magentic, Typography } from '@components-ui';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from "react-responsive";
import { SplitText } from "gsap/all";

export const HeroWrapper = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(".hero-title", {
      type: "chars",
    });

    const tl = gsap.timeline({
      delay: 1,
    });

    tl.to(".hero-content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    })
      .to(
        ".hero-text-scroll",
        {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.5"
      )
      .from(
        titleSplit.chars,
        {
          yPercent: 200,
          stagger: 0.02,
          ease: "power2.out",
        },
        "-=0.5"
      );

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "1% top",
        end: "bottom top",
        scrub: true,
      },
    });
    heroTl.to(".hero-container", {
      rotate: 7,
      scale: 0.9,
      yPercent: 30,
      ease: "power1.inOut",
    });
  });

  // useLayoutEffect(() => {
  //   const tl = gsap.timeline({ delay: 0.3 });
  //   gsap.set(containerRef.current, { autoAlpha: 1 });

  //   if (!containerRef.current) return;

  //   const titleChars = new SplitType('.hero-text-anim', {
  //     types: 'chars',
  //     tagName: 'span',
  //   }).chars;

  //   gsap.from(titleChars, {
  //     opacity: 0,
  //     scale: 0.5,
  //     rotation: 15,
  //     y: 30,
  //     stagger: 0.08,
  //     duration: 0.7,
  //     ease: 'back.out(1.7)',
  //   });

  //   tl.fromTo(
  //     '.hero-button-anim',
  //     { scale: 0.8, opacity: 0 },
  //     { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' },
  //     '<+0.2',
  //   );

  //   return () => {
  //     tl.kill();
  //   };
  // }, []);

  return (
    <div className="hero-container">
      {isTablet ? (
        <>
          {isMobile && (
            <img
              src="/images/hero-bg.png"
              alt='hero'
              className="absolute bottom-40 size-full object-cover"
            />
          )}
          <img
            src="/images/hero-img.png"
            alt='hero'
            className="absolute bottom-0 left-1/2 -translate-x-1/2 object-auto"
          />
        </>
      ) : (
        <video
          src="/videos/hero-bg.mp4"
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="hero-content opacity-0">
        <div className="overflow-hidden">
          <h1 className="hero-title">frontend & fullstack</h1>
        </div>
        <div
          style={{
            clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          }}
          className="hero-text-scroll"
        >
          <div className="hero-subtitle">
            <h1>developer</h1>
          </div>
        </div>

        <h2>
          I build fast, clean, and memorable digital experiences — from pixel-perfect interfaces to scalable fullstack solutions.
        </h2>

        <Button textColor='colorDark' className="md:mt-16 mt-10 bg-colorLight" params="View all Work" href="#" >
          View all Work
        </Button>
      </div>
    </div>
    // <div
    //   ref={containerRef}
    //   style={{ visibility: 'hidden' }}
    //   className="section1__wrapper relative z-20 flex h-full w-full flex-col items-center justify-center text-colorLight"
    // >
    //   <div className="flex max-w-full flex-col items-center justify-center text-center">
    //     <span className="mb-4 flex items-center text-2xl font-light uppercase text-colorSecondaryLight md:text-6xl">
    //       Hey, I’m
    //       <Magentic>
    //         <Image
    //           src={HeroImage}
    //           alt="alt"
    //           className="ml-4 mr-4 h-10 w-10 overflow-hidden rounded-full bg-center md:h-12 md:w-12"
    //         />
    //       </Magentic>
    //       Igor
    //     </span>
    //     <Typography as="h1" variant="h1" className="hero-text-anim text-pretty">
    //       I create interactive <br /> web & mobile solutions.
    //     </Typography>
    //   </div>


    // </div>
  );
};
