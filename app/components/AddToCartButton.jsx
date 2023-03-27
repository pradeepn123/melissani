import { useContext } from 'react';
import { useFetcher, useMatches } from '@remix-run/react';
import {
  Button,
  RequestContext
} from '~/components';
import {CartAction} from '~/lib/type';
import  { SpinnerLoading, SpinnerLoadingSecondary } from './Icon';


export function AddToCartButton({
  children,
  lines,
  className = '',
  variant = 'primary',
  width = 'full',
  analytics,
  isAddingToCart,
  ...props
}) {
  const [root] = useMatches();
  const selectedLocale = root?.data?.selectedLocale;
  const fetcher = useFetcher();
  const context = useContext(RequestContext)

  if (context.isAddingToCart) {
    props.disabled = true
  }

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value={CartAction.ADD_TO_CART} />
      <input type="hidden" name="countryCode" value={selectedLocale.country} />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      {analytics && <input type="hidden" name="analytics" value={JSON.stringify(analytics)} />}
      <Button
        as="button"
        type="submit"
        width={width}
        variant={variant}
        className={`${className} add-to-cart-generic`}
        {...props}
      >
        {isAddingToCart && className.includes("club-membership-add-btn") && <SpinnerLoadingSecondary
          className="add-to-cart-loading-spin"
        />}
        {isAddingToCart && !className.includes("club-membership-add-btn") && <SpinnerLoading
          className="add-to-cart-loading-spin"
        />}
        <span>
          {children}
        </span>
      </Button>
    </fetcher.Form>
  );
}
