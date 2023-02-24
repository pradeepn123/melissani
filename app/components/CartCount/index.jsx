import { Await, useMatches } from '@remix-run/react';
import { Suspense } from 'react';
import {Badge} from './Badge';

export function CartCount({ isHome, openCart }) {
    const [root] = useMatches();
  
    return (
      <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
        <Await resolve={root.data?.cart}>
          {(cart) => (
            <Badge
              openCart={openCart}
              count={cart?.totalQuantity || 0}
            />
          )}
        </Await>
      </Suspense>
    );
  }