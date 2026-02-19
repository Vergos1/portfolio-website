type ProjectCardProps = {
  imgSrc: string;
};

export const ProjectCard = ({ imgSrc }: ProjectCardProps) => {
  return (
    <article className="relative aspect-video overflow-hidden rounded-3xl px-16 py-[1.5em] md:rounded-[0rem] md:p-[0.2em]">
      <img
        src={imgSrc}
        alt=""
        className="relative z-10 h-full w-full rounded-[0rem]"
      />
      <div className="mask bg-colorSecondaryLight absolute top-0 left-0 -z-10 h-full w-full opacity-80"></div>
    </article>
  );
};
