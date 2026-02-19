type TestimonialCardProps = {
  clientName: string;
  testimonial: string;
  imgSrc: string;
};

export const TestimonialCard = ({
  clientName,
  testimonial,
  imgSrc,
}: TestimonialCardProps) => {
  return (
    <article className="swiper-slide mask rounded-3xl px-16 py-[1.5em] max-md:px-5 md:rounded-[3rem] md:py-[1.1em]">
      <div className="testimonialHeader flex items-center gap-[1em] md:block">
        <div
          // src={imgSrc}
          // alt=""
          className="bg-colorLight h-[60px] w-[60px] rounded-full md:mt-2.5 md:h-[106px] md:w-[106px]"
        ></div>
        <p className="bg-colorSecondaryDark max-w-fit justify-center rounded-[30px] px-4 py-2 text-sm leading-5 font-medium tracking-normal whitespace-nowrap text-stone-100 md:mt-5">
          {clientName}
        </p>
      </div>
      <p className="mt-[1em] text-[0.8em] tracking-tight max-md:max-w-full">
        “{testimonial}”
      </p>
      <div className="bg-colorSecondaryLight absolute top-0 left-0 -z-10 h-full w-full opacity-80"></div>
    </article>
  );
};
