'use client';

import { gsap } from 'gsap';
import { Button, Magentic } from '@components-ui';
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
    const titleSplit = SplitText.create(".hero-title", { type: "chars" });

    // Вхідна анімація
    const tl = gsap.timeline({ delay: 1, onComplete: () => { fingerTl.play(); } });
    tl.to(".hero-content", { opacity: 1, y: 0, ease: "power1.inOut" })
      .to(".hero-text-scroll", {
        duration: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "circ.out",
      }, "-=0.5")
      .from(titleSplit.chars, {
        yPercent: 200,
        stagger: 0.02,
        ease: "power2.out",
      }, "-=0.5");

    gsap.set(".hero-text-scroll", { rotation: -4 });
    // Анімація синхронізована з відео (loop 10с)
    const fingerTl = gsap.timeline({ repeat: -1, repeatDelay: 0 });

    fingerTl
      // 1с — палець наближається
      .to(".hero-text-scroll", {
        x: 8,
        duration: 1,
        ease: "power1.inOut",
      }, 1)

      // 2с — палець тикає → різкий glitch імпакт
      .to(".hero-text-scroll", {
        scale: 1.06,
        x: 14,
        skewX: -3,
        duration: 0.07,
        ease: "power4.out",
      }, 2)
      .to(".hero-subtitle", {
        filter: "brightness(2) contrast(1.3)",
        duration: 0.07,
      }, 2)

      // відскок після тику
      .to(".hero-text-scroll", {
        scale: 1,
        x: 8,
        skewX: 0,
        duration: 0.5,
        ease: "elastic.out(1.2, 0.4)",
      }, 2.07)
      .to(".hero-subtitle", {
        filter: "brightness(1) contrast(1)",
        duration: 0.3,
      }, 2.07)

      // 2.5-6с — палець тримає → DEVELOPER легко "дихає"
      .to(".hero-text-scroll", {
        y: -5,
        duration: 1.75,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      }, 2.5)

      // 6с — палець піднімається
      .to(".hero-text-scroll", {
        y: -20,
        rotation: -3,
        x: 10,
        duration: 0.5,
        ease: "power2.out",
      }, 6)

      // 7с — смикає на себе
      .to(".hero-text-scroll", {
        y: -30,
        x: 16,
        rotation: -5,
        duration: 0.15,
        ease: "power4.out",
      }, 7)
      .to(".hero-subtitle", {
        filter: "brightness(1.6) contrast(1.2)",
        duration: 0.1,
      }, 7)

      // elastic відскок
      .to(".hero-text-scroll", {
        y: -8,
        x: 4,
        rotation: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.45)",
      }, 7.15)
      .to(".hero-subtitle", {
        filter: "brightness(1) contrast(1)",
        duration: 0.4,
      }, 7.15)

      // 7.75с — плавний перехід перед поверненням
      .to(".hero-text-scroll", {
        y: -3,
        x: 1,
        rotation: 0,
        duration: 0.25,
        ease: "power1.inOut",
      }, 7.75)

      // 8с — рука забирається → плавно до нуля
      .to(".hero-text-scroll", {
        y: 0,
        x: 0,
        rotation: -4,
        duration: 1.5,
        ease: "power3.inOut",
      }, 8)

      // 9с — тонкий glow і повний reset
      .to(".hero-subtitle", {
        filter: "brightness(1.1)",
        duration: 0.3,
      }, 9)
      .to(".hero-subtitle", {
        filter: "brightness(1)",
        duration: 0.5,
      }, 9.3)

      // буфер до наступного loop
      .to({}, { duration: 0.2 }, 9.8);

    // ScrollTrigger
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
      scale: 1.05,
      yPercent: 30,
      filter: "blur(8px)",
      opacity: 0.3,
      ease: "power1.inOut",
    });
  });

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
        <div className="absolute inset-0">
          <video
            src="/video/video-5.mp4"
            autoPlay
            muted
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

          <div className="absolute inset-0 grain-overlay" />
        </div>
      )}
      <div className="hero-content opacity-0">
        <div className="overflow-hidden">
          <h1 className="hero-title">frontend & fullstack</h1>
        </div>
        <Magentic>
          <div
            style={{
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            }}
            className="hero-text-scroll"
          >

            <div className="hero-subtitle">
              <h2>developer</h2>
            </div>
          </div>
        </Magentic>
        <h2 className='hero-description'>
          I build fast, clean, and memorable digital experiences — from pixel-perfect interfaces to scalable fullstack solutions.
        </h2>

        <Button textColor='colorDark' className="md:mt-16 mt-10 bg-colorLight" params="View all Work" href="#" >
          View all Work
        </Button>
      </div>
    </div>
  );
};
