import {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';

import { Money } from '@shopify/hydrogen';

import { IconClose, ClockIcon, IconLeftArrowClose } from '~/components';

/**
 * Drawer component that opens on user click.
 * @param heading - string. Shown at the top of the drawer.
 * @param open - boolean state. if true opens the drawer.
 * @param onClose - function should set the open state.
 * @param openFrom - bottom
 * @param children - react children node.
 */
export function DrawerFromBottom({open, onClose, openFrom = 'bottom', isFilterClubModalOpen=false, children, ...props}) {
  const offScreen = {
    right: 'translate-y-full',
    left: '-translate-y-full',
  };

  const headerClass = `${props.subHeading && props.subHeading != 'Savings Per Year' ? 'border-bottom' : ''} px-4 gap-x-4 sm:px-8 md:px-8 drawer-header sticky top-0 flex h-nav items-center relative justify-between`;

  let panelClasses = [
    "drawer-dialog-panel",
    "drawer-bottom-dialog-panel",
    "text-left",
    "align-middle",
    "transition-all",
    "transform",
    "shadow-xl",
    "h-screen-dynamic",
    "bg-contrast"
  ]

  if (props.isCartOpen) {
    panelClasses = panelClasses.concat(["w-screen", "max-w-md", "lg:max-w-lg", "xl:max-w-xl", "2xl:max-w-xl"])
  }

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
                <Dialog.Panel className={panelClasses.join(" ")}>
                  {props.heading == 'Filter Club' && props.subHeading == undefined && <div className="product-label-banner">
                        <span className='icon-with-text'>
                            <ClockIcon />
                            <p className='icon-text'>Zero upfront charges!</p>
                        </span>
                        <p className='product-label-banner-text'>You will only be charged when filters ship.</p>
                  </div>}
                  <header className={headerClass}>
                    {props.heading && <div className="filter-club-membership">
                      <div className="cart-heading">
                        {props.heading}
                      </div>
                      {props.subHeading && <p>
                        {props.subHeading}
                      </p>}
                    </div>}
                    {props.heading == 'Filter Club' && props.subHeading != undefined ?
                    <button
                      type="button"
                      className="filterClubCloseButton mt-4"
                      onClick={onClose}
                      data-test="close-cart"
                      >
                      <IconLeftArrowClose aria-label="Close panel" />
                    </button>
                    :
                    <button
                      type="button"
                      className="menu-cart-icon filterClubCloseButton m-4"
                      onClick={onClose}
                      data-test="close-cart"
                    >
                    <IconClose aria-label="Close panel" />
                    </button>
                    }
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
  const [items, setItems] = useState([]);

  function openDrawer(items) {
    if (items) {
      setItems(items)
    }

    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen((isOpen) => {
      return false
    });
  }

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    items,
    setItems
  };
}
