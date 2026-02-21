import { Typography, Magentic } from '@components-ui';
import Image from 'next/image';
import ShapeIcon from '@public/svg/titles-shape.svg';
import 'swiper/css';

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
  return (
    <div className="flex h-full w-full max-w-maxWidth grow flex-col justify-center text-[5.8vw] text-colorLight md:text-[clamp(20px,_1vw_+_14px,_32px)]">
      <div className="anime flex flex-col gap-12">
        <Typography
          as="h2"
          variant="h2"
          shape={<Image src={ShapeIcon} alt="Shape" className="w-6 md:w-10" />}
        >
          Expertise
        </Typography>
        <div className="grid max-h-full grid-cols-1 grid-rows-1 gap-4 sm:grid-cols-2 sm:grid-rows-2 sm:gap-16">
          {expertiseList.map(({ id, title, description }) => (
            <Magentic key={id} className="flex flex-col gap-1">
              <Typography as="h3" variant="h3">
                {title}
              </Typography>
              <Typography as="p" variant="body">
                {description}
              </Typography>
            </Magentic>
          ))}
        </div>
      </div>
    </div>
  );
};
