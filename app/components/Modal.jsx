import {IconClose, Link} from '~/components';

export function Modal({children, cancelLink, classname}) {
  return (
    <div
      className={`relative z-50`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      id="modal-bg"
    >
      <div className="fixed inset-0 transition-opacity bg-opacity-75 bg-primary/40"></div>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className={`${classname ? `p-0` : `p-4 sm:p-0`} flex items-center justify-center min-h-full text-center`}>
          <div
            className={`${classname ? `lg:p-0 p-0` : `lg:px-14 lg:py-12 px-8 py-8 sm:w-full sm:max-w-sm  md:max-w-full lg:max-w-3xl`} relative flex-1 overflow-hidden text-left transition-all transform rounded shadow-xl bg-contrast sm:my-12 sm:flex-none ${classname}`}
            role="button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onKeyPress={(e) => {
              e.stopPropagation();
            }}
            tabIndex={0}
          >
            <div className={`${classname ? `p-2` : `px-8 pt-8 pb-0 lg:py-12 lg:pr-14`} absolute top-0 right-0  modal-close`}>
              <Link
                to={cancelLink}
                className="transition text-primary hover:text-primary/50"
              >
                <IconClose aria-label="Close panel" />
              </Link>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
