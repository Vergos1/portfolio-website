import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

export const ease = CustomEase.create('custom', 'M0,0 C0.52,0.01 0.16,1 1,1 ');

export const createEase = (path: string) => CustomEase.create('custom', path);

export function animateText(selector: string, direction: 'down' | 'up') {
  const fromY = direction === 'down' ? '30vh' : '-30vh';
  const stagger = direction === 'down' ? 0.03 : -0.03;

  return gsap.timeline().from(`${selector} .anime`, { duration: 0.3 }).fromTo(
    `${selector} .anime`,
    { y: fromY },
    {
      y: '0vh',
      duration: 1.1,
      stagger,
      ease,
    },
  );
}

export function animateRounded(selector: string, direction: 'down' | 'up') {
  const flex = screen.width > 540 ? 17 : 5;
  const suffix = direction === 'down' ? 'down' : 'up';

  return gsap
    .timeline()
    .from(`${selector} .rounded__div__${suffix}`, { duration: 0.1 })
    .fromTo(
      `${selector} .rounded__div__${suffix}`,
      { height: `${flex}vh` },
      {
        height: '0vh',
        duration: 1.2,
        ease,
      },
    );
}
