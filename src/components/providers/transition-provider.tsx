'use client';

import { useAppSelector } from '@shared-hooks';
import { gsap } from 'gsap';
import { TransitionRouter } from 'next-transition-router';
import { useRef } from 'react';

export const TransitionProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { color } = useAppSelector(state => state.menu);
  const firstLayer = useRef<HTMLDivElement | null>(null);
  const secondLayer = useRef<HTMLDivElement | null>(null);

  return (
    <TransitionRouter
      auto={true}
      leave={(next, from, to) => {
        const tl = gsap
          .timeline({
            onComplete: next,
          })
          .fromTo(
            firstLayer.current,
            { y: '100%' },
            {
              y: 0,
              duration: 0.5, // Увеличена продолжительность
              ease: 'power2.inOut', // Более плавная функция сглаживания
            },
          )
          .fromTo(
            secondLayer.current,
            {
              y: '100%',
            },
            {
              y: 0,
              duration: 0.2, // Увеличена продолжительность
              ease: 'power2.inOut',
            },
            '<50%',
          );

        return () => {
          tl.kill();
        };
      }}
      enter={next => {
        const tl = gsap
          .timeline()
          .fromTo(
            secondLayer.current,
            { y: 0 },
            {
              y: '-100%',
              duration: 1, // Увеличена продолжительность
              ease: 'power2.inOut',
            },
          )
          .fromTo(
            firstLayer.current,
            { y: 0 },
            {
              y: '-100%',
              duration: 1, // Увеличена продолжительность
              ease: 'power2.inOut',
            },
            '<50%',
          )
          .call(next, undefined, '<50%');

        return () => {
          tl.kill();
        };
      }}
    >
      <main>{children}</main>

      <div
        ref={firstLayer}
        className={`fixed inset-0 z-50 translate-y-full ${
          color === 'Dark' ? 'bg-colorDark' : 'bg-colorLight'
        }`}
      />
      <div
        ref={secondLayer}
        className={`fixed inset-0 z-50 translate-y-full ${
          color === 'Dark' ? 'bg-colorLight' : 'bg-colorDark'
        }`}
      />
    </TransitionRouter>
  );
};
