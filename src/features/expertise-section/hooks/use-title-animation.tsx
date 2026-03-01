import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';

export const useTitleAnimation = () => {
    useGSAP(() => {
        const firstTextSplit = SplitText.create(".first-text-split h1", {
            type: "chars",
        });
        const secondTextSplit = SplitText.create(".second-text-split h1", {
            type: "chars",
        });

        gsap.from(firstTextSplit.chars, {
            yPercent: 200,
            stagger: 0.02,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".flavor-section",
                start: "top 100%",
            },
        });

        gsap.to(".flavor-text-scroll", {
            duration: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scrollTrigger: {
                trigger: ".flavor-section",
                start: "top 10%",
            },
        });

        gsap.from(secondTextSplit.chars, {
            yPercent: 200,
            stagger: 0.02,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: ".flavor-section",
                start: "top 1%",
            },
        });
    });
}