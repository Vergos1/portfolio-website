"use client"
import { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppDispatch } from '@shared-hooks';
import { setActiveSlide, setHeaderBackground, Anchor } from '@shared-store/states';

const anchors: Anchor[] = ['first', 'second', 'third', 'fourth'];

export const useSectionObserver = (scope: RefObject<HTMLElement | null>) => {
    const dispatch = useAppDispatch();

    useGSAP(() => {
        anchors.forEach((anchor) => {
            ScrollTrigger.create({
                trigger: `.${anchor}`,
                start: 'top top',
                end: 'bottom top',
                onEnter: () => {
                    dispatch(setActiveSlide([anchor, 'down']));
                    dispatch(setHeaderBackground(anchor));
                    document.body.classList.toggle('darkGradient', anchor === 'second' || anchor === 'fourth');
                },
                onEnterBack: () => {
                    dispatch(setActiveSlide([anchor, 'up']));
                    dispatch(setHeaderBackground(anchor));
                    document.body.classList.toggle('darkGradient', anchor === 'second' || anchor === 'fourth');
                },
            });
        });
    }, { scope, dependencies: [dispatch] });
};