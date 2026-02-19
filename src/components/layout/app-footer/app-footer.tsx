'use client';
import { CURRENT_YEAR, SHORT_DATE_TIME_FORMATS } from '@shared-constants';
import { links } from '@shared-config';
import { cn } from '@shared-lib';
import { getJoinedDate } from '@shared-utils';
import { useEffect, useState } from 'react';
import { AppFooterGroup } from './app-footer-group';

export const AppFooter = ({ className }: { className?: string }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentTime(getJoinedDate(SHORT_DATE_TIME_FORMATS));

    const interval = setInterval(() => {
      setCurrentTime(getJoinedDate(SHORT_DATE_TIME_FORMATS));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <footer
      className={cn(
        'footer__links px-paddingX absolute flex w-full flex-wrap gap-0 mix-blend-difference md:gap-12',
        className,
      )}
    >
      <AppFooterGroup
        title="LOCAL TIME"
        className="hidden md:block"
        links={[{ href: '', text: currentTime }]}
      />
      <AppFooterGroup
        className="hidden md:block"
        title="COPYRIGHT"
        links={[{ href: '', text: `Copyright © ${CURRENT_YEAR}.` }]}
      />
      <AppFooterGroup
        title="SOCIALS"
        className="md:ml-auto"
        isMagnetic={true}
        links={[
          { href: links.email, text: 'Email' },
          { href: links.github, text: 'Github' },
          { href: links.telegram, text: 'Telegram' },
        ]}
      />
    </footer>
  );
};
