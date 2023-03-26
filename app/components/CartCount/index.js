import { Await, useMatches } from '@remix-run/react';
import { flattenConnection } from '@shopify/hydrogen';

import { Suspense } from 'react';
import {Badge} from './Badge';

export function CartCount({ isHome, openCart, isCartDrawer }) {
    const [root] = useMatches();

    return (
      <Suspense fallback={isCartDrawer ? <span>0</span> : <Badge count={0} dark={isHome} openCart={openCart} />}>
        <Await resolve={root.data?.cart}>
          {(cart) => {
            const currentLines = cart?.lines ? flattenConnection(cart.lines) : [];
            const filterClubLineItems = currentLines.filter((line) => {
              return line.attributes.find((attribute) => attribute.key == "Bundle" && attribute.value == "Filter Club")
            })

            const oneTimeLineItems = currentLines.filter(line => {
              return !line.attributes.find((attribute) => attribute.key == "Bundle" && attribute.value == "Filter Club")
            })

            let quantity = oneTimeLineItems.reduce((acc, lineItem) => {
              return acc + lineItem.quantity
            }, 0)

            if (filterClubLineItems.length > 0) {
              quantity += filterClubLineItems[0].quantity
            }

            return isCartDrawer ? 
              <span>{quantity}</span> :
              <Badge
                openCart={openCart}
                count={quantity}
              />
          }}
        </Await>
      </Suspense>
    );
  }