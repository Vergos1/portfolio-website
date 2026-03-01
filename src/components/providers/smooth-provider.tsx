'use client';
import { smoothConfig } from '@shared-config';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase, ScrollSmoother, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CustomEase, useGSAP);

export const SmoothProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    useGSAP(() => {
        ScrollSmoother.create(smoothConfig);
    });

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">
                {children}
            </div>
        </div>
    );
};
