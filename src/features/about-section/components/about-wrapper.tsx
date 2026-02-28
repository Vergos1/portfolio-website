import { Button, Magentic, Typography } from '@components-ui';
import { links } from '@shared-config';
import { isDesktop } from '@shared-utils';
import { gsap } from 'gsap';
import 'swiper/css';

export const AboutWrapper = () => {
  const principles = [
    'Work should fit into our lives, not the other way around.',
    'The transformative power of a global workforce is undeniable.',
    '21st‑century skills and knowledge work are essential for progress.',
    'Everyone should have equal access to opportunity.',
    'It should be easier to be an entrepreneur.',
    'Remote work and freelancing should build prosperity.',
  ];

  return (
    <main className="flex h-full w-full max-w-maxWidth grow flex-col justify-center text-[5.8vw] md:text-[clamp(20px,_1vw_+_14px,_32px)]">
      {/* НОВЫЙ БЛОК: левый текст + правый нумерованный список в стиле примера */}
      <section className="anime grid w-full gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] md:gap-16">
        {/* Левая колонка */}
        <div className="flex flex-col gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-colorSecondaryDark">
            About my work
          </p>
          <h3 className="text-[clamp(32px,_3vw_+_8px,_52px)] font-semibold leading-[1.05] text-colorDark">
            Our Global Work Principles
          </h3>
          <p className="text-sm leading-relaxed text-colorSecondaryDark md:text-[0.9rem]">
            I care a lot about how digital products feel in real life: how they
            load, adapt to different screens and support real teams and
            businesses. These principles guide how I structure collaborations
            and ship work for clients and agencies.
          </p>
          <Button params="View all Work" href={links.work}>
            View all Work
          </Button>
        </div>

        <ol className="flex flex-col divide-y divide-borderLight/40 border-y border-borderLight/40 text-colorLight">
          {principles.map((item, index) => {
            const strokeNumber = `0${index + 1}`;
            return (
              <li
                key={item}
                className="flex items-center justify-between gap-6 px-4 py-4 first:rounded-t-2xl last:rounded-b-2xl md:px-6 md:py-5"
              >
                <Typography
                  as="span"
                  variant="h3"
                  className="tracking-[0.1em] text-colorSecondaryDark"
                >
                  {strokeNumber}
                </Typography>
                <Typography as="p" className="flex-1 text-colorSecondaryDark">
                  {item}
                </Typography>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
};