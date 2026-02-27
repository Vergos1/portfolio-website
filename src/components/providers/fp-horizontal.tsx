'use client';

import React from 'react';

/**
 * Wrap card slides inside an FpSection type="horizontal" with this component.
 * The provider queries [data-fp-track] to animate horizontal position.
 *
 * Usage:
 *   <FpSection type="horizontal" anchor="expertise">
 *     <FpHorizontalTrack>
 *       <div data-fp-card>Slide 1</div>
 *       <div data-fp-card>Slide 2</div>
 *       <div data-fp-card>Slide 3</div>
 *     </FpHorizontalTrack>
 *   </FpSection>
 */
export function FpHorizontalTrack({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-fp-track
      className={`fp-track flex h-full will-change-transform ${className}`}
      style={{ width: `${React.Children.count(children) * 100}vw` }}
    >
      {children}
    </div>
  );
}

/**
 * Single card inside FpHorizontalTrack.
 * Receives data-fp-card so the provider knows how many slides exist.
 */
export function FpCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-fp-card
      className={`fp-card h-full w-screen flex-shrink-0 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
