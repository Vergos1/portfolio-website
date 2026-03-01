import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RefObject } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useSliderAnimation = (sliderRef: RefObject<HTMLDivElement | null>) => {
    const isTablet = useMediaQuery({
        query: "(max-width: 1024px)",
    });

    useGSAP(() => {
        if (!sliderRef.current) return;
        const scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

        if (!isTablet) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".flavor-section",
                    start: "2% top",
                    end: `+=${scrollAmount + 1500}px`,
                    scrub: true,
                    pin: true,
                },
            });

            tl.to(".flavor-section", {
                x: `-${scrollAmount + 1500}px`,
                ease: "power1.inOut",
            });
        }

        const titleTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".flavor-section",
                start: "top top",
                end: "bottom 80%",
                scrub: true,
            },
        });

        titleTl
            .to(".first-text-split", {
                xPercent: -30,
                ease: "power1.inOut",
            })
            .to(
                ".flavor-text-scroll",
                {
                    xPercent: -22,
                    ease: "power1.inOut",
                },
                "<"
            )
            .to(
                ".second-text-split",
                {
                    xPercent: -10,
                    ease: "power1.inOut",
                },
                "<"
            );
    });
}