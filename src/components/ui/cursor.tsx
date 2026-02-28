'use client';
import { gsap } from 'gsap';
import { useEffect } from 'react';
import "@styles/cursor.css"

export const Cursor = () => {
  useEffect(() => {
    function handleMove(e: MouseEvent) {
      gsap.to('.cursor', {
        x: e.clientX,
        y: e.clientY,
        stagger: 0.02,
      });
    }

    document.addEventListener('mousemove', handleMove);

    return () => {
      document.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <>
      <div className="cursor cursor1"></div>
      <div className="cursor cursor2"></div>
    </>
  );
};
