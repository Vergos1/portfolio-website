import { cn } from '@shared-lib';
import { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';

type Variant = 'h2' | 'h3' | 'body';

type TypographyProps<T extends ElementType> = {
  as?: T;
  variant: Variant;
  children: ReactNode;
  className?: string;
  shape?: ReactNode;
} & ComponentPropsWithoutRef<T>;

const variantStyles: Record<Variant, string> = {
  h2: 'flex gap-2 pb-2 text-5xl font-semibold first:mt-0 md:text-7xl',
  h3: 'pb-2 text-2xl font-medium first:mt-0 md:text-4xl',
  body: 'pb-2 text-lg font-normal first:mt-0 md:text-2xl text-colorSecondaryLight',
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
