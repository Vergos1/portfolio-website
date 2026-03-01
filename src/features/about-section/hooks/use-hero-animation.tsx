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
            color: "#faeade",
            ease: "power1.in",
            stagger: 1,
            scrollTrigger: {
                trigger: ".message-content",
                start: "top center",
                end: "30% center",
                scrub: true,
            },
        });
        gsap.to(secMsgSplit.words, {
            color: "#faeade",
            ease: "power1.in",
            stagger: 1,
            scrollTrigger: {
                trigger: ".second-message",
                start: "top center",
                end: "bottom center",
                scrub: true,
            },
        });

        const revealTl = gsap.timeline({
            delay: 1,
            scrollTrigger: {
                trigger: ".msg-text-scroll",
                start: "top 60%",
            },
        });
        revealTl.to(".msg-text-scroll", {
            duration: 1,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "circ.inOut",
        });

        const paragraphTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".message-content p",
                start: "top center",
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
}