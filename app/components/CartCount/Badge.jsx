import {Link} from '~/components';
import { useMemo } from 'react';
import { useIsHydrated } from '~/hooks/useIsHydrated';

import cart from '../../../public/cart.svg';

export function Badge({ openCart, dark, count }) {
    const isHydrated = useIsHydrated();
  
    const BadgeCounter = useMemo(
      () => (
        <>
          <img src={cart} />
          <div
            className={'text-contrast bg-primary absolute -top-1.5 -right-1 text-[0.625rem] font-medium subpixel-antialiased min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-4 h-4 px-[0.175rem] pb-px'}
          >
            <span>{count || 0}</span>
          </div>
        </>
      ),
      [count, dark],
    );
  
    return isHydrated ? (
      <button
        onClick={openCart}
        className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5 ml-4"
      >
        {BadgeCounter}
      </button>
    ) : (
      <Link
        to="/cart"
        className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5 ml-4"
      >
        {BadgeCounter}
      </Link>
    );
  }