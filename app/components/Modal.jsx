import {IconClose, Link} from '~/components';

export function Modal({children, cancelLink}) {
  return (
    <div
      className="relative z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      id="modal-bg"
    >
      <div className="fixed inset-0 transition-opacity bg-opacity-75 bg-primary/40"></div>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div
            className="relative flex-1 lg:px-14 lg:py-12 overflow-hidden text-left transition-all transform rounded shadow-xl bg-contrast sm:my-12 sm:flex-none sm:w-full sm:max-w-sm px-8 py-8 md:max-w-full lg:max-w-3xl"
            role="button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onKeyPress={(e) => {
              e.stopPropagation();
            }}
            tabIndex={0}
          >
            <div className="absolute top-0 right-0 lg:py-12 lg:pr-14 modal-close px-8 pt-8 pb-0">
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
