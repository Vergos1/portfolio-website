import { cn } from '@shared-lib';
import { ReactNode } from 'react';

type TypographyTextProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

const TypographyH2 = ({ children, className }: TypographyTextProps) => {
  return (
    <h2
      className={cn(
        'scroll-m-20 pb-2 text-5xl font-semibold tracking-tight first:mt-0 md:text-7xl',
        className,
      )}
    >
      {children}
    </h2>
  );
};

const TypographyH3 = ({ children, className }: TypographyTextProps) => {
  return (
    <h3
      className={cn(
        'scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0 md:text-4xl',
        className,
      )}
    >
      {children}
    </h3>
  );
};

const TypographyDescription = ({
  children,
  className,
}: TypographyTextProps) => {
  return (
    <p
      className={cn(
        'scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0 md:text-2xl',
        className,
      )}
    >
      {children}
    </p>
  );
};

export { TypographyH2, TypographyH3, TypographyDescription };
