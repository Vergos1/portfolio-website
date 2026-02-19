import { getRandomValues, shuffle } from '@shared-utils';
import { createEase } from '@shared-lib';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { BgImage } from './bg-image';

const bgImagesData = [
  {
    id: 1,
    imgLink: '/svg/logos/node-js-logo.svg',
    title: '',
    subtitle: '',
  },
  {
    id: 2,
    imgLink: '/svg/logos/attributes-logo.svg',
    title: '',
    subtitle: '',
  },
  {
    id: 3,
    imgLink: '/svg/logos/client-first-logo.svg',
    title: '',
    subtitle: '',
  },
  {
    id: 4,
    imgLink: '/svg/logos/figma-logo.svg',
    title: '',
    subtitle: '',
  },
  {
    id: 5,
    imgLink: '/svg/logos/framer-logo.svg',
    title: '',
    subtitle: '',
  },
  {
    id: 6,
    imgLink: '/svg/logos/gsap-logo.svg',
    title: '',
    subtitle: '',
  },
  {
    id: 7,
    imgLink: '/svg/logos/material-ui-logo.svg',
    title: '',
    subtitle: '',
  },
  {
    id: 8,
    imgLink: '/svg/logos/nextjs-logo.svg',
    title: '',
    subtitle: '',
  },
  {
    id: 9,
    imgLink: '/svg/logos/photoshop-logo.svg',
    title: '',
    subtitle: '',
  },
  {
    id: 10,
    imgLink: '/svg/logos/react-logo.svg',
    title: '',
    subtitle: '',
  },
  {
    id: 11,
    imgLink: '/svg/logos/git-logo.svg',
    title: '',
    subtitle: '',
  },
  {
    id: 12,
    imgLink: '/svg/logos/tailwind-logo.svg',
    title: '',
    subtitle: '',
  },
  {
    id: 13,
    imgLink: '/svg/logos/typescript-logo.svg',
    title: '',
    subtitle: '',
  },
];

function getRandDistrubutedTop(index: number, targets: any[]) {
  const mid = Math.floor(targets.length / 2);
  if (index === 0) {
    return 65;
  }

  if (index === targets.length - 1) {
    return 35;
  }

  if (index === mid) {
    return 50;
  }

  if (index < mid) {
    return getRandomValues(30, 60);
  }
  if (index > mid) {
    return getRandomValues(40, 70);
  }

  return getRandomValues(30, 70);
}

export const BgImagesContainer = ({
  bgImagesSharedRef,
}: {
  bgImagesSharedRef: { current: gsap.core.Tween | null };
}) => {
  shuffle(bgImagesData);

  const bgImagesTween = useRef<gsap.core.Tween | null>(null);
  const GAP = 6;
  useEffect(() => {
    bgImagesTween.current = gsap.fromTo(
      '.bgImages',
      {
        y: '200%',
        x: '0%',
        left: '50%',
        rotate: 0,
        top: '50%',

        // filter: "blur(20px)",
      },
      {
        y: '-50%',
        x: '0%',
        left: function (index, target, targets) {
          return 90 + index * -GAP + '%';
        },
        top: function (index, target, targets) {
          return getRandDistrubutedTop(index, targets) + '%';
        },
        rotate: function (index, target, targets) {
          return getRandomValues(-30, 30);
        },

        delay: 0.8,
        stagger: 0.08,
        duration: 1,
        ease: createEase('M0,0,C0.5,0,0,1,1,1'),
      },
    );

    bgImagesSharedRef.current = gsap.fromTo(
      '.footer__img_wrapper',
      {
        minWidth: '100%',
        minHeight: '100%',
      },
      {
        minWidth: '110%',
        minHeight: '150%',
        paused: true,
        delay: 0.1,
        duration: 0.6,
        ease: createEase('M0,0,C0.5,0,0,1,1,1'),
      },
    );

    return () => {
      bgImagesTween.current?.kill();
      bgImagesSharedRef.current?.kill();
    };
  });

  return (
    <div className="footer__img_wrapper bg-transparent-foreground !absolute flex h-[100%] w-[100%] items-center justify-center overflow-hidden">
      {bgImagesData.map((item, i) => (
        <BgImage key={item.id} total={bgImagesData.length} item={item} i={i} />
      ))}
    </div>
  );
};
