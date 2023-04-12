import {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';

import { IconClose,Link} from '~/components';
import account from '../../public/account_drawer.svg';
import {CartCount} from '~/components/CartCount'

/**
 * Drawer component that opens on user click.
 * @param heading - string. Shown at the top of the drawer.
 * @param open - boolean state. if true opens the drawer.
 * @param onClose - function should set the open state.
 * @param openFrom - right, left
 * @param children - react children node.
 */
export function Drawer({isHome, isCartDrawer, openCart, open, onClose, openFrom = 'right', children, isFilterClubModal=false}) {
  const offScreen = {
    right: 'translate-x-full',
    left: '-translate-x-full',
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 left-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`fixed inset-y-0 flex max-w-full ${
                openFrom === 'right' ? 'right-0' : ''
              }`}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom={offScreen[openFrom]}
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo={offScreen[openFrom]}
              >
                <Dialog.Panel className={`drawer-dialog-panel w-screen max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-3xl text-left align-middle transition-all transform shadow-xl h-screen-dynamic bg-contrast ${isCartDrawer ? 'cart-drawer-dialog-panel' : ''}`}>
                  <header className={`menuDrawer-nav sticky top-0 flex px-4 h-nav gap-x-4 sm:px-8 md:px-8 items-center relative ${isCartDrawer || isFilterClubModal ? 'justify-between' : 'justify-end'}`}>
                    {isCartDrawer && <div className="cart-heading-wrapper">
                      <p className="font-primary cart-heading">Cart</p>
                      <p className="font-tertiary cart-count"><CartCount isCartDrawer={isCartDrawer} /> Items</p>  
                    </div>}
                    {!isCartDrawer && !isFilterClubModal && <>
                      <Link to="/account/login" 
                        className="menu-drawer-account relative items-center justify-center w-8 flex" onClick={onClose}>
                        <img src={account} />
                      </Link>
                      <span className="menu-drawer-cart" onClick={()=> openCart && onClose}>
                        <CartCount
                        className="menu-drawer-cart mr-4 absolute top-1/2" isHome={isHome} openCart={openCart}/>
                      </span>
                    </>}
                    {isFilterClubModal && <div className="filter-club-membership">
                      <div className="cart-heading">
                        Filter Club
                      </div>
                      <p>
                        Membership Benefits
                      </p>
                    </div>}
                    <button
                      type="button"
                      className="menu-cart-icon m-4"
                      onClick={onClose}
                      data-test="close-cart"
                    >
                      <IconClose aria-label="Close panel" />
                    </button>
                  </header>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

/* Use for associating arialabelledby with the title*/
Drawer.Title = Dialog.Title;

export function useDrawer(openDefault = false) {
  const [isOpen, setIsOpen] = useState(openDefault);

  function openDrawer() {
    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
}