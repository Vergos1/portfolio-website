'use client';

import React from 'react';

/**
 * Wrap ALL content of an FpSection type="free-scroll" with this.
 * The provider queries [data-fp-inner] to apply translateY.
 *
 * Usage:
 *   <FpSection type="free-scroll" anchor="about">
 *     <FpFreeScrollInner>
 *       <AboutSection />
 *     </FpFreeScrollInner>
 *   </FpSection>
 */
export function FpFreeScrollInner({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-fp-inner
      className={`fp-free-inner will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
