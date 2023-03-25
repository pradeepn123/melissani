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
            const currentLines = cart.lines ? flattenConnection(cart.lines) : [];

            const bundleIds = Array.from(new Set(currentLines.map(line => {
            const bundleAttr = line.attributes.find((attribute) => attribute.key == "Bundle Id" )
              if (bundleAttr) {
                return bundleAttr.value
              }
            }).filter((bundleId) => bundleId)))

            const filterClubLineItems = bundleIds.map((bundleId) => {
              return currentLines.filter((line) => {
                return line.attributes.find((attribute) => attribute.key == "Bundle Id" && attribute.value == bundleId)
              })
            })

            const oneTimeLineItems = currentLines.filter(line => {
              return !line.attributes.find((attribute) => attribute.key == "Bundle Id" )
            })

            return isCartDrawer ? 
              <span>{filterClubLineItems.length + oneTimeLineItems.length}</span> :
              <Badge
                openCart={openCart}
                count={filterClubLineItems.length + oneTimeLineItems.length || 0}
              />
          }}
        </Await>
      </Suspense>
    );
  }