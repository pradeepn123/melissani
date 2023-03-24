import {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';

import { IconClose } from '~/components';

/**
 * Drawer component that opens on user click.
 * @param heading - string. Shown at the top of the drawer.
 * @param open - boolean state. if true opens the drawer.
 * @param onClose - function should set the open state.
 * @param openFrom - bottom
 * @param children - react children node.
 */
export function DrawerFromBottom({isHome, isCartDrawer, openCart, open, onClose, openFrom = 'bottom', children}) {
  const offScreen = {
    right: 'translate-y-full',
    left: '-translate-y-full',
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
              className={`fixed flex max-w-full right-0 bottom-0`}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom={offScreen[openFrom]}
                enterTo="translate-y-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-y-0"
                leaveTo={offScreen[openFrom]}
              >
                <Dialog.Panel className="drawer-dialog-panel drawer-bottom-dialog-panel w-screen max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-3xl text-left align-middle transition-all transform shadow-xl h-screen-dynamic bg-contrast">
                  <header className={`menuDrawer-nav sticky top-0 flex px-4 h-nav gap-x-4 sm:px-8 md:px-8 items-center relative ${isCartDrawer ? 'justify-between' : 'justify-end'}`}>
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
DrawerFromBottom.Title = Dialog.Title;

export function useDrawerFromBottom(openDefault = false) {
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