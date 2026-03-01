import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';

export const useAboutAnimation = () => {
    useGSAP(() => {
        const firstMsgSplit = SplitText.create(".first-message", {
            type: "words",
        });
        const secMsgSplit = SplitText.create(".second-message", {
            type: "words",
        });
        const paragraphSplit = SplitText.create(".message-content p", {
            type: "words, lines",
            linesClass: "paragraph-line",
        });

        gsap.to(firstMsgSplit.words, {
            color: "var(--colorLight)",
            ease: "power1.in",
            stagger: 1,
            scrollTrigger: {
                trigger: ".message-content",
                start: "top 90%",
                end: "20% center",
                scrub: true,
            },
        });

        gsap.to(secMsgSplit.words, {
            color: "var(--colorLight)",
            ease: "power1.in",
            stagger: 1,
            scrollTrigger: {
                trigger: ".second-message",
                start: "top 80%",
                end: "bottom center",
                scrub: true,
            },
        });

        const paragraphTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".message-content p",
                start: "top 115%",
            },
        });
        paragraphTl.from(paragraphSplit.words, {
            yPercent: 300,
            rotate: 3,
            ease: "power1.inOut",
            duration: 1,
            stagger: 0.01,
        });
    });
};