import clsx from 'clsx';

function Icon({children, className, fill = 'currentColor', stroke, ...props}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      {...props}
      fill={fill}
      stroke={stroke}
      className={clsx('w-5 h-5', className)}
    >
      {children}
    </svg>
  );
}

export function IconMenu(props) {
  return (
    <span>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1601 24.5298C8.82218 23.8609 7.23527 23.9218 5.95264 24.6914C5.04831 25.234 4.01351 25.5206 2.95888 25.5206H1.12185C0.723131 25.5206 0.399902 25.1974 0.399902 24.7987C0.399902 24.3999 0.723131 24.0767 1.12185 24.0767H2.95888C3.75181 24.0767 4.52983 23.8612 5.20976 23.4533C6.91571 22.4297 9.02636 22.3486 10.8058 23.2383L11.7471 23.709C13.4763 24.5736 15.5072 24.5952 17.2544 23.7676L17.8494 23.4858C20.0568 22.4401 22.6142 22.4274 24.8319 23.451C25.7252 23.8632 26.6972 24.0767 27.681 24.0767H29.278C29.6767 24.0767 29.9999 24.3999 29.9999 24.7987C29.9999 25.1974 29.6767 25.5206 29.278 25.5206H27.681C26.4883 25.5206 25.3098 25.2618 24.2269 24.762C22.3976 23.9177 20.2882 23.9282 18.4675 24.7907L17.8726 25.0725C15.7243 26.0901 13.2275 26.0635 11.1013 25.0004L10.1601 24.5298Z" fill="#1B2943"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1601 15.5054C8.82218 14.8365 7.23527 14.8974 5.95264 15.667C5.04831 16.2096 4.01351 16.4962 2.95888 16.4962H1.12185C0.723131 16.4962 0.399902 16.173 0.399902 15.7742C0.399902 15.3755 0.723131 15.0523 1.12185 15.0523H2.95888C3.75181 15.0523 4.52983 14.8368 5.20976 14.4288C6.91571 13.4053 9.02636 13.3242 10.8058 14.2139L11.7471 14.6846C13.4763 15.5492 15.5072 15.5708 17.2544 14.7431L17.8494 14.4613C20.0568 13.4157 22.6142 13.403 24.8319 14.4265C25.7252 14.8388 26.6972 15.0523 27.681 15.0523H29.278C29.6767 15.0523 29.9999 15.3755 29.9999 15.7742C29.9999 16.173 29.6767 16.4962 29.278 16.4962H27.681C26.4883 16.4962 25.3098 16.2374 24.2269 15.7376C22.3976 14.8933 20.2882 14.9038 18.4675 15.7663L17.8726 16.0481C15.7243 17.0657 13.2275 17.0391 11.1013 15.976L10.1601 15.5054Z" fill="#1B2943"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1601 6.8423C8.82218 6.17337 7.23527 6.23431 5.95264 7.00389C5.04831 7.54649 4.01351 7.83311 2.95888 7.83311H1.12185C0.723131 7.83311 0.399902 7.50988 0.399902 7.11116C0.399902 6.71244 0.723131 6.38921 1.12185 6.38921H2.95888C3.75181 6.38921 4.52983 6.17371 5.20976 5.76575C6.91571 4.74218 9.02636 4.66112 10.8058 5.55084L11.7471 6.02147C13.4763 6.88612 15.5072 6.90772 17.2544 6.08006L17.8494 5.79826C20.0568 4.75264 22.6142 4.7399 24.8319 5.76346C25.7252 6.17571 26.6972 6.38921 27.681 6.38921H29.278C29.6767 6.38921 29.9999 6.71244 29.9999 7.11116C29.9999 7.50988 29.6767 7.83311 29.278 7.83311H27.681C26.4883 7.83311 25.3098 7.57427 24.2269 7.07447C22.3976 6.23021 20.2882 6.24072 18.4675 7.10317L17.8726 7.38496C15.7243 8.40257 13.2275 8.37601 11.1013 7.31294L10.1601 6.8423Z" fill="#1B2943"/>
      </svg>
    </span>
  );
}

export function IconClose(props) {
  return (
    <span>
    <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2482 13.432L20.9375 22.1213L23.0588 20L14.3695 11.3107L23.0588 2.62132L20.9375 0.499999L12.2482 9.18934L3.05882 0L0.9375 2.12132L10.1268 11.3107L0.937501 20.5L3.05882 22.6213L12.2482 13.432Z" fill="#1376BC" />
    </svg>
  </span>
  );
}

export function IconArrow({direction = 'right'}) {
  let rotate;

  switch (direction) {
    case 'right':
      rotate = 'rotate-0';
      break;
    case 'left':
      rotate = 'rotate-180';
      break;
    case 'up':
      rotate = '-rotate-90';
      break;
    case 'down':
      rotate = 'rotate-90';
      break;
    default:
      rotate = 'rotate-0';
  }

  return (
    <Icon className={`w-5 h-5 ${rotate}`}>
      <title>Arrow</title>
      <path d="M7 3L14 10L7 17" strokeWidth="1.25" />
    </Icon>
  );
}

export function IconCaret({
  direction = 'down',
  stroke = 'currentColor',
  ...props
}) {
  let rotate;

  switch (direction) {
    case 'down':
      rotate = 'rotate-0';
      break;
    case 'up':
      rotate = 'rotate-180';
      break;
    case 'left':
      rotate = '-rotate-90';
      break;
    case 'right':
      rotate = 'rotate-90';
      break;
    default:
      rotate = 'rotate-0';
  }

  return (
    <Icon
      {...props}
      className={`w-5 h-5 transition ${rotate}`}
      fill="transparent"
      stroke={stroke}
    >
      <title>Caret</title>
      <path d="M14 8L10 12L6 8" strokeWidth="1.25" />
    </Icon>
  );
}

export function IconSelect(props) {
  return (
    <Icon {...props}>
      <title>Select</title>
      <path d="M7 8.5L10 6.5L13 8.5" strokeWidth="1.25" />
      <path d="M13 11.5L10 13.5L7 11.5" strokeWidth="1.25" />
    </Icon>
  );
}

export function IconBag(props) {
  return (
    <Icon {...props}>
      <title>Bag</title>
      <path
        fillRule="evenodd"
        d="M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z"
      />
    </Icon>
  );
}

export function IconHelp(props) {
  return (
    <Icon {...props}>
      <title>Help</title>
      <path d="M3.375 10a6.625 6.625 0 1 1 13.25 0 6.625 6.625 0 0 1-13.25 0ZM10 2.125a7.875 7.875 0 1 0 0 15.75 7.875 7.875 0 0 0 0-15.75Zm.699 10.507H9.236V14h1.463v-1.368ZM7.675 7.576A3.256 3.256 0 0 0 7.5 8.67h1.245c0-.496.105-.89.316-1.182.218-.299.553-.448 1.005-.448a1 1 0 0 1 .327.065c.124.044.24.113.35.208.108.095.2.223.272.383.08.154.12.34.12.558a1.3 1.3 0 0 1-.076.471c-.044.131-.11.252-.197.361-.08.102-.174.197-.283.285-.102.087-.212.182-.328.284a3.157 3.157 0 0 0-.382.383c-.102.124-.19.27-.262.438a2.476 2.476 0 0 0-.164.591 6.333 6.333 0 0 0-.043.81h1.179c0-.263.021-.485.065-.668a1.65 1.65 0 0 1 .207-.47c.088-.139.19-.263.306-.372.117-.11.244-.223.382-.34l.35-.306c.116-.11.218-.23.305-.361.095-.139.168-.3.219-.482.058-.19.087-.412.087-.667 0-.35-.062-.664-.186-.942a1.881 1.881 0 0 0-.513-.689 2.07 2.07 0 0 0-.753-.427A2.721 2.721 0 0 0 10.12 6c-.4 0-.764.066-1.092.197a2.36 2.36 0 0 0-.83.536c-.225.234-.4.515-.523.843Z" />
    </Icon>
  );
}

export function IconSearch(props) {
  return (
    <Icon {...props}>
      <title>Search</title>
      <path
        fillRule="evenodd"
        d="M13.3 8.52a4.77 4.77 0 1 1-9.55 0 4.77 4.77 0 0 1 9.55 0Zm-.98 4.68a6.02 6.02 0 1 1 .88-.88l4.3 4.3-.89.88-4.3-4.3Z"
      />
    </Icon>
  );
}

export function IconCheck({stroke = 'currentColor', ...props}) {
  return (
    <Icon {...props} fill="transparent" stroke={stroke}>
      <title>Check</title>
      <circle cx="10" cy="10" r="7.25" strokeWidth="1.25" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m7.04 10.37 2.42 2.41 3.5-5.56"
      />
    </Icon>
  );
}

export function IconXMark({stroke = 'currentColor', ...props}) {
  return (
    <Icon {...props} fill="transparent" stroke={stroke}>
      <title>Delete</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </Icon>
  );
}

export function IconRemove(props) {
  return (
    <Icon {...props} fill="transparent" stroke={props.stroke || 'currentColor'}>
      <title>Remove</title>
      <path
        d="M4 6H16"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.5 9V14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.5 9V14" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5.5 6L6 17H14L14.5 6"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6L8 5C8 4 8.75 3 10 3C11.25 3 12 4 12 5V6"
        strokeWidth="1.25"
      />
    </Icon>
  );
}

export function IconFilters(props) {
  return (
    <Icon {...props} fill="transparent" stroke={props.stroke || 'currentColor'}>
      <title>Filters</title>
      <circle cx="4.5" cy="6.5" r="2" />
      <line x1="6" y1="6.5" x2="14" y2="6.5" />
      <line x1="4.37114e-08" y1="6.5" x2="3" y2="6.5" />
      <line x1="4.37114e-08" y1="13.5" x2="8" y2="13.5" />
      <line x1="11" y1="13.5" x2="14" y2="13.5" />
      <circle cx="9.5" cy="13.5" r="2" />
    </Icon>
  );
}

export function AccountIcon() {
  return (
    <span>
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="#1376BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="#1376BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
  )
}

export function CartIcon() {
  return (
    <span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="#1376BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="#1376BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="#1376BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
  )
}

export function ForwardNav() {
  return (
    <span>
      <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.749966 24.25C0.749966 37.2287 11.2713 47.75 24.25 47.75C37.2287 47.75 47.75 37.2287 47.75 24.25C47.75 11.2713 37.2287 0.75 24.25 0.75C11.2713 0.75 0.749966 11.2713 0.749966 24.25Z" stroke="#1376BC" stroke-width="1.5" />
        <path d="M21.8266 16.9766L29.1016 24.2516L21.8266 31.5266" stroke="#1376BC" stroke-width="2.425" stroke-linecap="round" />
      </svg>
    </span>
  )
}

export function IconPlay(props) {
  return(
    <svg {...props} width="152" height="152" viewBox="0 0 152 152" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="76.1875" cy="75.8125" r="71.8125" stroke="white" strokeWidth="8"/>
      <path d="M64.7723 54.6599L100.534 75.3071L64.7723 95.9542L64.7723 54.6599Z" stroke="white" strokeWidth="8"/>
    </svg>
  )
}
export function AccountIcon() {
  return (
    <span>
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="#1376BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="#1376BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
  )
}

export function CartIcon() {
  return (
    <span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="#1376BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="#1376BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="#1376BC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
  )
}

export function ForwardNav() {
  return (
    <span>
      <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.749966 24.25C0.749966 37.2287 11.2713 47.75 24.25 47.75C37.2287 47.75 47.75 37.2287 47.75 24.25C47.75 11.2713 37.2287 0.75 24.25 0.75C11.2713 0.75 0.749966 11.2713 0.749966 24.25Z" stroke="#1376BC" stroke-width="1.5" />
        <path d="M21.8266 16.9766L29.1016 24.2516L21.8266 31.5266" stroke="#1376BC" stroke-width="2.425" stroke-linecap="round" />
      </svg>

    </span>
  )
}
