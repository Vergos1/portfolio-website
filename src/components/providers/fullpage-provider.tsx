'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

const EASE_PATH = 'M0,0 C0.52,0.01 0.16,1 1,1';

/*
  animateText — animates .anime elements inside destination section
*/
function animateText(anchor: string, direction: 'down' | 'up') {
  const sel = `[data-fp-anchor="${anchor}"]`;
  const fromY = direction === 'down' ? '30vh' : '-30vh';
  const stagger = direction === 'down' ? 0.03 : -0.03;

  return gsap
    .timeline()
    .from(`${sel} .anime`, { duration: 0.3 })
    .fromTo(
      `${sel} .anime`,
      { y: fromY },
      {
        y: '0vh',
        duration: 1.1,
        stagger,
        ease: CustomEase.create('animText', EASE_PATH),
      },
    );
}

/*
  animateRounded — wave on LEAVING section.

  direction "down": wave rises from bottom  → .rounded__div__down
  direction "up":   wave falls from top     → .rounded__div__up

  The divs are rendered by FpSection OUTSIDE the inner .section wrapper,
  so they're clipped only by fp-section, not by .section's overflow:hidden.
*/
function animateRounded(anchor: string, direction: 'down' | 'up') {
  const sel = `[data-fp-anchor="${anchor}"]`;
  const flex =
    typeof globalThis !== 'undefined' && window.screen.width > 540 ? 17 : 5;
  const suffix = direction === 'down' ? 'down' : 'up';

  // Animate the window height: 0 → flex_vh
  // The giant circle inside stays in place — only its curved edge is revealed
  // This creates the wave/arc effect at the edge of the section
  return gsap
    .timeline()
    .fromTo(
      `${sel} .rounded__div__${suffix}`,
      { height: '0vh' },
      {
        height: `${flex}vh`,
        duration: 1.2,
        ease: CustomEase.create('animRounded', EASE_PATH),
      },
    )
    .to(`${sel} .rounded__div__${suffix}`, {
      height: '0vh',
      duration: 0.6,
      delay: 0.2,
    });
}

/* ── Types ── */
export type SectionType = 'fullpage' | 'horizontal' | 'free-scroll';

export interface FullPageConfig {
  transitionDuration?: number;
  transitionEase?: string;
  sectionCooldown?: number;
  freeScrollFriction?: number;
  freeScrollWheelMultiplier?: number;
  horizontalScrollThreshold?: number;
}

export interface FullPageContextValue {
  currentSection: number;
  goToSection: (index: number) => void;
  totalSections: number;
  hCurrentIndex: number;
  scrollHorizontal: (index: number) => void;
}

const FullPageContext = createContext<FullPageContextValue>({
  currentSection: 0,
  goToSection: () => {},
  totalSections: 0,
  hCurrentIndex: 0,
  scrollHorizontal: () => {},
});

export const useFullPage = () => useContext(FullPageContext);

const DEFAULTS: Required<FullPageConfig> = {
  transitionDuration: 1100,
  transitionEase: 'power3.inOut',
  sectionCooldown: 700,
  freeScrollFriction: 0.07,
  freeScrollWheelMultiplier: 1.2,
  horizontalScrollThreshold: 60,
};

export function FullPageProvider({
  children,
  config = {},
  onSectionChange,
}: Readonly<{
  children: React.ReactNode;
  config?: FullPageConfig;
  onSectionChange?: (params: {
    index: number;
    anchor: string | undefined;
    direction: 'up' | 'down';
  }) => void;
}>) {
  const cfg = { ...DEFAULTS, ...config };

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const transitioningRef = useRef(false);
  const lastActionTimeRef = useRef(0);
  const hWheelAccumRef = useRef(0);
  const hWheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const freeScrollY = useRef(0);
  const freeScrollTargetY = useRef(0);
  const freeScrollMax = useRef(0);

  const [hCurrentIndex, setHCurrentIndex] = useState(0);
  const hCurrentIndexRef = useRef(0);
  const hTotalCards = useRef(0);

  const [currentSection, setCurrentSection] = useState(0);
  const currentSectionRef = useRef(0);
  const [totalSections, setTotalSections] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const els = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(
        ':scope > [data-fp-section]',
      ),
    );
    sectionsRef.current = els;
    setTotalSections(els.length);
    const hSection = els.find(s => s.dataset.fpType === 'horizontal');
    if (hSection)
      hTotalCards.current = hSection.querySelectorAll('[data-fp-card]').length;
    activateSection(0, 'down', true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* free scroll rAF */
  useEffect(() => {
    let rafId: number;
    const loop = () => {
      const section = sectionsRef.current[currentSectionRef.current];
      if (section?.dataset.fpType === 'free-scroll') {
        const diff = freeScrollTargetY.current - freeScrollY.current;
        freeScrollY.current += diff * cfg.freeScrollFriction;
        freeScrollY.current = Math.max(
          0,
          Math.min(freeScrollMax.current, freeScrollY.current),
        );
        const inner = section.querySelector<HTMLElement>('[data-fp-inner]');
        if (inner)
          inner.style.transform = `translateY(${-freeScrollY.current}px)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activateSection = useCallback(
    (index: number, direction: 'up' | 'down', instant = false) => {
      const sections = sectionsRef.current;
      if (index < 0 || index >= sections.length) return;
      if (transitioningRef.current && !instant) return;

      const prevIndex = currentSectionRef.current;
      const leavingEl = sections[prevIndex];
      const enteringEl = sections[index];

      // cleanup leaving free-scroll
      if (prevIndex !== index && leavingEl?.dataset.fpType === 'free-scroll') {
        freeScrollY.current = freeScrollTargetY.current = 0;
        const inner = leavingEl.querySelector<HTMLElement>('[data-fp-inner]');
        if (inner) inner.style.transform = 'translateY(0)';
      }

      transitioningRef.current = true;

      // Wave on LEAVING section (runs concurrently with strip move)
      if (!instant && leavingEl && prevIndex !== index) {
        const leavingAnchor = leavingEl.dataset.fpAnchor;

        console.log('wave from', leavingAnchor);
        if (leavingAnchor) animateRounded(leavingAnchor, direction);
      }

      // Move the strip
      gsap[instant ? 'set' : 'to'](containerRef.current, {
        y: `${-(index * 100)}vh`,
        ...(instant
          ? {}
          : {
              duration: cfg.transitionDuration / 1000,
              ease: cfg.transitionEase,
              overwrite: true,
            }),
      });

      sections.forEach((s, i) => {
        s.dataset.fpActive = String(i === index);
      });
      currentSectionRef.current = index;
      setCurrentSection(index);

      const anchor = enteringEl?.dataset.fpAnchor;
      onSectionChange?.({ index, anchor, direction });

      // Text animation on ENTERING section
      if (!instant && anchor) animateText(anchor, direction);

      // Init entering horizontal
      if (enteringEl?.dataset.fpType === 'horizontal') {
        hWheelAccumRef.current = 0;
        lastActionTimeRef.current = Date.now();
        const targetSlide = direction === 'up' ? hTotalCards.current - 1 : 0;
        hCurrentIndexRef.current = targetSlide;
        setHCurrentIndex(targetSlide);
        const track = enteringEl.querySelector<HTMLElement>('[data-fp-track]');
        if (track) gsap.set(track, { x: -(targetSlide * window.innerWidth) });
      }

      // Init entering free-scroll
      if (enteringEl?.dataset.fpType === 'free-scroll') {
        lastActionTimeRef.current = Date.now();
        requestAnimationFrame(() => {
          const inner =
            enteringEl.querySelector<HTMLElement>('[data-fp-inner]');
          if (inner) {
            freeScrollMax.current = Math.max(
              0,
              inner.scrollHeight - window.innerHeight,
            );
            const atBottom = direction === 'up';
            freeScrollY.current = freeScrollTargetY.current = atBottom
              ? freeScrollMax.current
              : 0;
            inner.style.transform = atBottom
              ? `translateY(${-freeScrollMax.current}px)`
              : 'translateY(0)';
          }
        });
      }

      setTimeout(
        () => {
          transitioningRef.current = false;
        },
        instant ? 0 : cfg.transitionDuration + 80,
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSectionChange],
  );

  const scrollHorizontal = useCallback((index: number) => {
    if (index < 0 || index >= hTotalCards.current) return;
    const section = sectionsRef.current.find(
      s => s.dataset.fpType === 'horizontal',
    );
    const track = section?.querySelector<HTMLElement>('[data-fp-track]');
    if (!track) return;
    hCurrentIndexRef.current = index;
    setHCurrentIndex(index);
    lastActionTimeRef.current = Date.now();
    gsap.to(track, {
      x: -(index * window.innerWidth),
      duration: 0.75,
      ease: 'power2.inOut',
      overwrite: true,
    });
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now(),
        delta = e.deltaY;
      const idx = currentSectionRef.current;
      const type = sectionsRef.current[idx]?.dataset.fpType as
        | SectionType
        | undefined;

      if (type === 'horizontal') {
        if (transitioningRef.current) return;
        if (now - lastActionTimeRef.current < cfg.sectionCooldown) return;
        hWheelAccumRef.current += delta;
        if (hWheelTimerRef.current) clearTimeout(hWheelTimerRef.current);
        hWheelTimerRef.current = setTimeout(() => {
          hWheelAccumRef.current = 0;
        }, 300);
        if (Math.abs(hWheelAccumRef.current) < cfg.horizontalScrollThreshold)
          return;
        const dir = hWheelAccumRef.current > 0 ? 1 : -1;
        hWheelAccumRef.current = 0;
        if (dir === 1 && hCurrentIndexRef.current < hTotalCards.current - 1)
          scrollHorizontal(hCurrentIndexRef.current + 1);
        else if (dir === -1 && hCurrentIndexRef.current > 0)
          scrollHorizontal(hCurrentIndexRef.current - 1);
        else if (dir === 1) {
          lastActionTimeRef.current = now;
          activateSection(idx + 1, 'down');
        } else {
          lastActionTimeRef.current = now;
          activateSection(idx - 1, 'up');
        }
        return;
      }

      if (type === 'free-scroll') {
        const nt =
          freeScrollTargetY.current + delta * cfg.freeScrollWheelMultiplier;
        if (
          delta > 0 &&
          freeScrollTargetY.current >= freeScrollMax.current - 10
        ) {
          if (now - lastActionTimeRef.current > cfg.sectionCooldown + 100) {
            lastActionTimeRef.current = now;
            activateSection(idx + 1, 'down');
          }
          return;
        }
        if (delta < 0 && freeScrollTargetY.current <= 10) {
          if (now - lastActionTimeRef.current > cfg.sectionCooldown + 100) {
            lastActionTimeRef.current = now;
            activateSection(idx - 1, 'up');
          }
          return;
        }
        freeScrollTargetY.current = Math.max(
          0,
          Math.min(freeScrollMax.current, nt),
        );
        return;
      }

      if (transitioningRef.current) return;
      if (now - lastActionTimeRef.current < cfg.sectionCooldown) return;
      lastActionTimeRef.current = now;
      if (delta > 0) activateSection(idx + 1, 'down');
      else activateSection(idx - 1, 'up');
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activateSection, scrollHorizontal]);

  useEffect(() => {
    let sy = 0,
      sx = 0;
    const onStart = (e: TouchEvent) => {
      sy = e.touches[0].clientY;
      sx = e.touches[0].clientX;
    };
    const onEnd = (e: TouchEvent) => {
      const dy = sy - e.changedTouches[0].clientY,
        dx = sx - e.changedTouches[0].clientX;
      const now = Date.now(),
        idx = currentSectionRef.current;
      const type = sectionsRef.current[idx]?.dataset.fpType as
        | SectionType
        | undefined;
      if (type === 'horizontal' && Math.abs(dx) > 50) {
        if (now - lastActionTimeRef.current < cfg.sectionCooldown) return;
        scrollHorizontal(hCurrentIndexRef.current + (dx > 0 ? 1 : -1));
        return;
      }
      if (Math.abs(dy) < 50) return;
      if (type === 'free-scroll') {
        const nt = freeScrollTargetY.current + dy * 2;
        if (
          dy > 0 &&
          nt > freeScrollMax.current &&
          now - lastActionTimeRef.current > cfg.sectionCooldown
        ) {
          lastActionTimeRef.current = now;
          activateSection(idx + 1, 'down');
          return;
        }
        if (
          dy < 0 &&
          nt < 0 &&
          now - lastActionTimeRef.current > cfg.sectionCooldown
        ) {
          lastActionTimeRef.current = now;
          activateSection(idx - 1, 'up');
          return;
        }
        freeScrollTargetY.current = Math.max(
          0,
          Math.min(freeScrollMax.current, nt),
        );
        return;
      }
      if (now - lastActionTimeRef.current < cfg.sectionCooldown) return;
      lastActionTimeRef.current = now;
      if (dy > 0) activateSection(idx + 1, 'down');
      else activateSection(idx - 1, 'up');
    };
    globalThis.addEventListener('touchstart', onStart, { passive: true });
    globalThis.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      globalThis.removeEventListener('touchstart', onStart);
      globalThis.removeEventListener('touchend', onEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activateSection, scrollHorizontal]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const idx = currentSectionRef.current;
      const type = sectionsRef.current[idx]?.dataset.fpType as
        | SectionType
        | undefined;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        type === 'horizontal' &&
        hCurrentIndexRef.current < hTotalCards.current - 1
          ? scrollHorizontal(hCurrentIndexRef.current + 1)
          : activateSection(idx + 1, 'down');
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        type === 'horizontal' && hCurrentIndexRef.current > 0
          ? scrollHorizontal(hCurrentIndexRef.current - 1)
          : activateSection(idx - 1, 'up');
      }
    };
    globalThis.addEventListener('keydown', onKey);
    return () => globalThis.removeEventListener('keydown', onKey);
  }, [activateSection, scrollHorizontal]);

  return (
    <FullPageContext.Provider
      value={{
        currentSection,
        goToSection: i =>
          activateSection(i, i > currentSectionRef.current ? 'down' : 'up'),
        totalSections,
        hCurrentIndex,
        scrollHorizontal,
      }}
    >
      <div className="fp-viewport">
        <div ref={containerRef} className="fp-container">
          {children}
        </div>
      </div>
    </FullPageContext.Provider>
  );
}
