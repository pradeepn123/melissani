import {forwardRef} from 'react';
import {Link} from '@remix-run/react';
import clsx from 'clsx';

import {missingClass} from '~/lib/utils';

export const Button = forwardRef(
  (
    {
      as = 'button',
      className = '',
      variant = 'primary',
      width = 'auto',
      ...props
    },
    ref,
  ) => {
    const Component = props?.to ? Link : as;

    const baseButtonClasses =
      'inline-block rounded-full text-center py-3 px-9';

    const variants = {
      primary: `${baseButtonClasses} border border-primary bg-primary text-contrast rounded-full font-tertiary common-btn-line-height fs-17`,
      secondary: `${baseButtonClasses} border border-primary bg-contrast text-primary rounded-full font-tertiary common-btn-line-height fs-17`,
      inline: 'leading-none pb-1 underline font-tertiary font-base common-btn-line-height',
    };

    const widths = {
      auto: 'w-auto',
      full: 'w-full',
    };

    const styles = clsx(
      missingClass(className, 'bg-') && variants[variant],
      missingClass(className, 'w-') && widths[width],
      className,
    );

    return (
      <Component
        // @todo: not supported until react-router makes it into Remix.
        // preventScrollReset={true}
        className={styles}
        {...props}
        ref={ref}
      />
    );
  },
);
