import { ScrollSmoother } from 'gsap/ScrollSmoother';

export type TweenList = gsap.core.Tween[]
export type Tween = gsap.core.Tween

export type ScrollSmootherConfig = Parameters<typeof ScrollSmoother.create>[0];