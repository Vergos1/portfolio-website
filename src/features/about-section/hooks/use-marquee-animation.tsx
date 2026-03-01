import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const useMarqueeAnimation = () => {
    useGSAP(() => {
        const track = document.querySelector(".marquee-track") as HTMLElement;
        if (track) {
            const totalWidth = track.scrollWidth / 2;
            gsap.to(track, {
                x: -totalWidth,
                duration: 60,
                ease: "none",
                repeat: -1,
            });
        }

        gsap.fromTo(".marquee-wrapper",
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".marquee-wrapper",
                    start: "top 80%",
                },
            }
        );
    });
};