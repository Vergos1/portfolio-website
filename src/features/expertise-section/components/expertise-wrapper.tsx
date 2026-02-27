import { Typography, Magentic } from '@components-ui';
import Image from 'next/image';
import ShapeIcon from '@public/svg/titles-shape.svg';
import 'swiper/css';
import { Activity, useState } from 'react';
import { Plus } from 'lucide-react';

const expertiseList = [
  {
    id: 1,
    title: 'Architecture & Development',
    description:
      'Experience in designing and implementing architecture, developing large products from scratch. I take on the entire cycle — from requirements to release — and ensure stability, predictable delivery, and maintainable code.',
  },
  {
    id: 2,
    title: 'UI/UX Engineering',
    description:
      'I create user-friendly and adaptive interfaces that not only look modern but also solve business problems. I use best UI/UX practices to make the product intuitive and engaging.',
  },
  {
    id: 3,
    title: 'Performance & Optimization',
    description:
      'I optimise performance: SSR, code splitting, lazy loading, virtualisation. I improve Lighthouse scores, speed up loading times, and eliminate bottlenecks to ensure that the product runs quickly and stably.',
  },
  {
    id: 4,
    title: 'Collaboration & Growth',
    description:
      'I work closely with PM, designers, and QA, implement analytics (Sentry, Mixpanel, GA, Pixel), and support code reviews. I help the team grow through mentoring and quality standards so that the product develops confidently.',
  },
];

export const ExpertiseWrapper = () => {
  const [openId, setOpenId] = useState<number | null>(0);

  const toggleAccordion = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="flex h-full w-full max-w-maxWidth grow flex-col justify-center text-[5.8vw] text-colorLight md:text-[clamp(20px,_1vw_+_14px,_32px)]">
      <div className="anime flex flex-col gap-4 lg:grid lg:grid-cols-7 lg:gap-28">
        <div className="col-span-4">
          <Typography
            as="h2"
            variant="h2"
            className="mb-4"
            shape={
              <Image
                src={ShapeIcon}
                alt="Shape"
                className="float-start mr-2 mt-1 h-max w-6 md:w-10"
              />
            }
          >
            My Approach to Building Digital Products
          </Typography>
          <Typography
            as="p"
            variant="body"
            className="text-colorSecondaryLight"
          >
            I build digital products in a structured, transparent, and
            result-oriented way. From architecture planning to final deployment,
            every stage is clearly defined and executed step by step. My goal is
            not just to deliver a website, but to create a scalable,
            maintainable, and high-performing product that truly represents your
            brand and supports long-term growth.
          </Typography>
        </div>
        <ol className="scrollable col-span-3 flex max-h-[calc(94px*2.5)] flex-col border-border lg:max-h-none">
          {expertiseList.map(({ id, title, description }) => {
            return (
              <li
                key={id}
                className="border-b border-border px-3 py-8 last:border-b-0 md:px-4 md:py-8"
              >
                <button
                  className="flex w-full items-center justify-between gap-6"
                  onClick={() => toggleAccordion(id)}
                >
                  <Typography
                    as="span"
                    variant="h3"
                    className="tracking-[0.1em]"
                  >
                    0{id}
                  </Typography>
                  <div className="flex flex-1 items-center justify-between">
                    <Typography as="h3" variant="h3">
                      {title}
                    </Typography>
                    <Plus width={20} />
                  </div>
                </button>
                <Activity mode={openId === id ? 'visible' : 'hidden'}>
                  <Typography
                    as="p"
                    variant="body"
                    className="mt-4 text-colorSecondaryLight"
                  >
                    {description}
                  </Typography>
                </Activity>
              </li>
            );
          })}
        </ol>
        {/* <div className="grid max-h-full grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-2 sm:grid-rows-2 sm:gap-16">
          {expertiseList.map(({ id, title, description }) => (
            <Magentic key={id} className="flex flex-col gap-1">
              <Typography as="h3" variant="h3">
                {title}
              </Typography>
              <Typography
                as="p"
                variant="body"
                className="text-colorSecondaryLight"
              >
                {description}
              </Typography>
            </Magentic>
          ))}
        </div> */}
      </div>
    </div>
  );
};
