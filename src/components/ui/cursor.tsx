'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import '@styles/cursor.css';

export const Cursor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursor1Ref = useRef<HTMLDivElement>(null);
  const cursor2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set([cursor1Ref.current, cursor2Ref.current], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    });

    function handleMove(e: MouseEvent) {
      const { clientX: x, clientY: y } = e;

      gsap.to(cursor1Ref.current, { x, y, opacity: 1, duration: 0.1, ease: 'power2.out' });
      gsap.to(cursor2Ref.current, { x, y, opacity: 1, duration: 0.25, ease: 'power2.out' });
    }

    document.addEventListener('mousemove', handleMove);

    return () => document.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div ref={containerRef} className='cursor-wrapper'>
      <div ref={cursor1Ref} className="cursor cursor1" />
      <div ref={cursor2Ref} className="cursor cursor2" />
    </div>
  );
};