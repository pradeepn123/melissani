export function CartLoading() {
  return (
    <div className="flex w-full h-screen-no-nav justify-center items-center">
      {/* @todo better spinner? */}
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="294px" height="294px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <path d="M31 50A19 19 0 0 0 69 50A19 20.7 0 0 1 31 50" fill="#1b2943" stroke="none">
          <animateTransform attributeName="transform" type="rotate" dur="1.3157894736842106s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50.85;360 50 50.85"></animateTransform>
        </path>
      </svg>
    </div>
  );
}
