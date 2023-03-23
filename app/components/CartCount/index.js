import { Await, useMatches } from '@remix-run/react';
import { Suspense } from 'react';
import {Badge} from './Badge';

export function CartCount({ isHome, openCart, isCartDrawer }) {
    const [root] = useMatches();
  
    return (
      <Suspense fallback={isCartDrawer ? <span>0</span> : <Badge count={0} dark={isHome} openCart={openCart} />}>
        <Await resolve={root.data?.cart}>
          {(cart) => (
            isCartDrawer ? 
            <span>{cart?.totalQuantity}</span> :
            <Badge
              openCart={openCart}
              count={cart?.totalQuantity || 0}
            />
          )}
        </Await>
      </Suspense>
    );
  }