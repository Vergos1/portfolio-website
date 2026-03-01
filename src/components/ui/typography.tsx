import { cn } from '@shared-lib';
import { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'body';

type TypographyProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  shape?: ReactNode;
} & ComponentPropsWithoutRef<T>;

const variantStyles: Record<Variant, string> = {
  h1: 'font-bold uppercase tracking-tight [word-spacing:1rem] text-2xl md:text-6xl',
  h2: 'text-2xl font-semibold first:mt-0 md:text-5xl',
  h3: 'text-lg font-medium first:mt-0 md:text-3xl',
  body: 'text-base font-normal first:mt-0 md:text-xl',
};

export const Typography = <T extends ElementType = 'p'>({
  as,
  variant = 'body',
  children,
  className,
  shape,
  ...props
}: TypographyProps<T>) => {
  const Component = as ?? 'p';

  return (
    <Component
      className={cn(
        'scroll-m-20 tracking-tight',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {shape}
      {children}
    </Component>
  );
};
