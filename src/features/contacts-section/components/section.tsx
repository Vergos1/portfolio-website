'use client';
import { Bulge, Magentic } from '@components-ui';
import { links } from '@shared-config';
import { useAppSelector } from '@shared-hooks';
import { useRef } from 'react';
import { AppHeaderWrapper, AppFooter } from '@components-layout';
import { BgImagesContainer } from './bg-images-container';

export const ContactsSection = () => {
  const { subscribe } = useAppSelector(state => state.fullPage.third);
  const bgImagesSharedRef = useRef<gsap.core.Tween | null>(null);

  return (
    <section className="section section__5 third darkGradient">
      <Bulge type="Light" />
      <AppHeaderWrapper color="Light" />

      <Magentic
        href={links.email}
        className="footer__heading anime cursor-pointer"
        scrambleParams={{
          text: 'Contact',
        }}
        onMouseEnter={() => {
          bgImagesSharedRef.current?.restart(true);
        }}
        onMouseLeave={() => {
          bgImagesSharedRef.current?.reverse();
        }}
      >
        <span className="shapka mask">
          <span className="scrambleText inline-block text-left">Contact</span>
          <span className="yellow__it">.</span>
        </span>
      </Magentic>
      <BgImagesContainer bgImagesSharedRef={bgImagesSharedRef} />
      <AppFooter />
    </section>
  );
};
