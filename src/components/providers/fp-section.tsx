'use client';

import React from 'react';
import type { SectionType } from './fullpage-provider';

interface FpSectionProps {
  type?: SectionType;
  anchor?: string;
  className?: string;
  children: React.ReactNode;
  waveVariant?: 'dark' | 'light';
  waveColor?: string;
}

export function FpSection({
  type = 'fullpage',
  anchor,
  className = '',
  children,
  waveVariant = 'dark',
  waveColor,
}: Readonly<FpSectionProps>) {
  const bg = waveColor ?? (waveVariant === 'dark' ? '#111110' : '#ffffff');

  return (
    <div
      data-fp-section
      data-fp-type={type}
      {...(anchor ? { 'data-fp-anchor': anchor } : {})}
      data-fp-active="false"
      className={`fp-section ${className}`}
    >
      {children}

      {/*
        Wave masks — siblings of children, inside fp-section (overflow:hidden).
        NOT inside section.section (which also has overflow:hidden).

        Structure of each mask:
          .rounded__div__* — the visible window (height animates 0 → flex_vh)
            .round__bg__*  — giant circle (height:775%, width:150%)
                             anchored so only its curved edge is visible
      */}

      {/* UP mask: sits at bottom, circle anchors to bottom → curved top edge visible */}
      <div className="rounded__div__up" style={{ pointerEvents: 'none' }}>
        <div className="round__bg__up" style={{ backgroundColor: bg }} />
      </div>

      {/* DOWN mask: sits at top, circle anchors to top → curved bottom edge visible */}
      <div className="rounded__div__down" style={{ pointerEvents: 'none' }}>
        <div className="round__bg__down" style={{ backgroundColor: bg }} />
      </div>
    </div>
  );
}
