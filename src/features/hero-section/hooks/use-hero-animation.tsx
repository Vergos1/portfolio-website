import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';

export const useHeroAnimation = () => {
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
};