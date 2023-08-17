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
      <svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="1.375" x2="30" y2="1.375" stroke="#0C233F" strokeWidth="1.25"/>
        <line y1="12.625" x2="30" y2="12.625" stroke="#0C233F" strokeWidth="1.25"/>
        <line y1="23.875" x2="30" y2="23.875" stroke="#0C233F" strokeWidth="1.25"/>
      </svg>
    </span>
  );
}

export function IconClose(props) {
  return (
    <span>    
    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M15.5725 17.6938L27.9395 30.0608L30.0608 27.9395L17.6938 15.5725L29.4907 3.77568L27.3693 1.65436L15.5725 13.4512L3.06077 0.939453L0.939453 3.06077L13.4512 15.5725L1.19933 27.8244L3.32065 29.9457L15.5725 17.6938Z" fill="#1B2943"/>
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
      <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_1953_3830)">
        <path d="M15.5 19.56C20.16 19.56 24.33 21.69 27.08 25.03C29.21 22.44 30.5 19.12 30.5 15.5C30.5 7.22 23.78 0.5 15.5 0.5C7.22 0.5 0.5 7.22 0.5 15.5C0.5 19.12 1.78 22.44 3.92 25.03C6.67 21.69 10.84 19.56 15.5 19.56Z" stroke="#0B2340" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.4999 30.5001C20.1599 30.5001 24.3299 28.3701 27.0799 25.0301C24.3299 21.6901 20.1599 19.5601 15.4999 19.5601C10.8399 19.5601 6.66992 21.6901 3.91992 25.0301C6.66992 28.3701 10.8399 30.5001 15.4999 30.5001Z" stroke="#0B2340" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.23047 10.56C9.23047 14.02 12.0405 16.83 15.5005 16.83C18.9605 16.83 21.7705 14.02 21.7705 10.56C21.7705 7.10004 18.9605 4.29004 15.5005 4.29004C12.0405 4.29004 9.23047 7.10004 9.23047 10.56Z" stroke="#0B2340" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_1953_3830">
        <rect width="31" height="31" fill="white"/>
        </clipPath>
        </defs>
      </svg>
    </span>
  )
}

export function CartIcon() {
  return (
    <span>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.24953 18.0399H16.3395C21.2095 18.0399 25.4795 14.7799 26.7895 10.0499L28.4895 3.68994H5.51953" stroke="#0B2340" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24.6096 21.05C22.5496 21.05 20.8896 22.7201 20.8896 24.7701C20.8896 26.8201 22.5596 28.49 24.6096 28.49C26.6696 28.49 28.3296 26.8201 28.3296 24.7701C28.3296 22.7201 26.6696 21.05 24.6096 21.05Z" stroke="#0B2340" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.37039 21.05C7.31039 21.05 5.65039 22.7201 5.65039 24.7701C5.65039 26.8201 7.32039 28.49 9.37039 28.49C11.4304 28.49 13.0904 26.8201 13.0904 24.7701C13.0904 24.7501 13.0904 24.73 13.0904 24.71C13.0604 22.69 11.4004 21.05 9.37039 21.05Z" stroke="#0B2340" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.73977 21.1L5.10977 1.5H1.50977" stroke="#0B2340" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.0898 24.71H20.8898" stroke="#0B2340" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  )
}

export function ForwardNav() {
  return (
    <span>
      <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.749966 24.25C0.749966 37.2287 11.2713 47.75 24.25 47.75C37.2287 47.75 47.75 37.2287 47.75 24.25C47.75 11.2713 37.2287 0.75 24.25 0.75C11.2713 0.75 0.749966 11.2713 0.749966 24.25Z" stroke="#1376BC" strokeWidth="1.5" />
        <path d="M21.8266 16.9766L29.1016 24.2516L21.8266 31.5266" stroke="#1376BC" strokeWidth="2.425" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export function RightArrow() {
  return (
    <span>
      <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.749966 24.25C0.749966 37.2287 11.2713 47.75 24.25 47.75C37.2287 47.75 47.75 37.2287 47.75 24.25C47.75 11.2713 37.2287 0.75 24.25 0.75C11.2713 0.75 0.749966 11.2713 0.749966 24.25Z" stroke="white" strokeWidth="1.5"/>
        <path d="M21.8266 16.9766L29.1016 24.2516L21.8266 31.5266" stroke="white" strokeWidth="2.425" strokeLinecap="round"/>
      </svg>
    </span>
  )
}

export function IconPlay(props) {
  return(
    <svg {...props} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#1B2943"/>
      <path d="M40.019 32.3467L70.019 49.6672L40.019 66.9877L40.019 32.3467Z" fill="white" stroke="black"/>
    </svg>
  )
}

export function CartClubMembershipIcon(props) {
  return(
    <span {...props}>
      <span>
      <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_867_11302)">
        <path d="M15.4151 23.2629H7.31756C7.24631 23.2629 7.19287 23.3199 7.19287 23.3876V33.6049C7.19287 33.6761 7.24987 33.7296 7.31756 33.7296H7.86618C7.93743 33.7296 7.99087 33.6726 7.99087 33.6049V28.4286H14.3143C14.3856 28.4286 14.439 28.3716 14.439 28.3039V27.8265C14.439 27.7553 14.382 27.7018 14.3143 27.7018H7.99087V24.0075H15.4116C15.4828 24.0075 15.5362 23.9505 15.5362 23.8828V23.3912C15.5362 23.3199 15.4792 23.2665 15.4116 23.2665" fill="#0C233F"/>
        <path d="M50.8869 32.1374L50.4808 31.8203C50.4559 31.7989 50.4202 31.7882 50.3882 31.7954C50.3526 31.7989 50.324 31.8167 50.3027 31.8452C49.6187 32.7359 48.4252 33.2667 47.1107 33.2667C44.4637 33.2667 42.5471 31.261 42.5471 28.5001C42.5471 25.7391 44.4673 23.7334 47.1107 23.7334C48.2721 23.7334 49.437 24.2144 50.0747 24.9589C50.096 24.9839 50.1281 25.0017 50.1637 25.0017C50.1958 25.0017 50.2314 24.991 50.2564 24.9696L50.6482 24.6098C50.6981 24.5635 50.7017 24.4851 50.6589 24.4352C49.868 23.5304 48.5428 22.9924 47.1142 22.9924C43.9971 22.9924 41.7349 25.3081 41.7349 28.5036C41.7349 31.6992 43.9971 34.0148 47.1142 34.0148C48.6675 34.0148 50.0854 33.3807 50.9083 32.3191C50.951 32.2656 50.9404 32.1837 50.8869 32.1409" fill="#0C233F"/>
        <path d="M28.5 56.2768C13.1812 56.2768 0.723187 43.8152 0.723187 28.5C0.723187 13.1848 13.1812 0.723187 28.5 0.723187C43.8187 0.723187 56.2768 13.1848 56.2768 28.5C56.2768 43.8152 43.8152 56.2768 28.5 56.2768ZM28.5 0C12.7858 0 0 12.7858 0 28.5C0 44.2142 12.7858 57 28.5 57C44.2142 57 57 44.2142 57 28.5C57 12.7858 44.2142 0 28.5 0Z" fill="#0C233F"/>
        <path d="M34.9837 27.2995C34.1714 26.8542 33.2773 26.4445 31.6385 26.5799C29.8537 26.7259 28.9559 27.3743 28.0903 28.0013C27.2673 28.5963 26.4871 29.1591 24.9054 29.2874C23.5053 29.4014 22.7429 29.0772 22.0162 28.6853V25.0836C22.6218 25.3793 23.3201 25.6216 24.3496 25.6216C24.542 25.6216 24.7486 25.6144 24.9659 25.5966C26.7508 25.4506 27.6485 24.8022 28.5142 24.1752C29.3371 23.5803 30.1173 23.0174 31.6991 22.8891C33.2737 22.7609 34.0432 23.1884 34.859 23.6408C34.9018 23.6658 34.9445 23.6871 34.9837 23.7085V27.2995ZM34.9837 31.7134C34.175 31.2717 33.2773 30.8584 31.6385 30.9938C29.8537 31.1399 28.9559 31.7883 28.0903 32.4153C27.2673 33.0102 26.4871 33.5731 24.9054 33.7013C23.5053 33.8189 22.7429 33.4911 22.0162 33.0993V29.4976C22.6218 29.7933 23.3201 30.0319 24.3496 30.0319C24.542 30.0319 24.7451 30.0248 24.9624 30.007C26.7472 29.8609 27.6449 29.2126 28.5106 28.5856C29.3336 27.9906 30.1138 27.4278 31.6955 27.2995C33.2701 27.1677 34.0396 27.5988 34.8554 28.0512C34.8982 28.0726 34.941 28.0975 34.9801 28.1189V31.7099L34.9837 31.7134ZM34.9837 46.5584C34.9837 46.7899 34.7949 46.9788 34.5633 46.9788C34.5491 46.9788 34.5313 46.9788 34.517 46.9788H22.9175C22.6931 46.9788 22.5043 46.9788 22.4544 46.9788C22.2193 46.9752 22.0126 46.7971 22.0126 46.5584V33.9115C22.6183 34.2072 23.3165 34.4459 24.3461 34.4459C24.5384 34.4459 24.7415 34.4388 24.9588 34.4209C26.7436 34.2749 27.6414 33.6265 28.5071 32.9995C29.33 32.4046 30.1102 31.8417 31.6919 31.7134C33.2666 31.5816 34.0361 32.0127 34.8519 32.4651C34.8946 32.4901 34.9374 32.5114 34.9766 32.5328V46.5548L34.9837 46.5584ZM33.2879 49.9H30.7016L32.8961 47.7055H33.2879V49.9ZM23.7119 47.7055H26.0098L23.8259 49.8893C23.8259 49.8893 23.8224 49.8964 23.8188 49.9H23.7119V47.7055ZM29.6863 49.9H24.8341L27.0286 47.7055H31.8772L29.6934 49.8893C29.6934 49.8893 29.6898 49.8964 29.6863 49.9ZM22.2371 12.1233L24.5171 11.2789C24.5919 11.2504 24.6631 11.2041 24.7273 11.1578H32.2762C32.3439 11.2041 32.4116 11.2504 32.4864 11.2789L34.7664 12.1233C34.8519 12.1553 34.9374 12.2622 34.9694 12.3619H22.0304C22.0625 12.2622 22.148 12.1553 22.2335 12.1233M31.8202 10.4346H25.1797C25.1868 10.3848 25.2046 10.3349 25.2046 10.285V9.08088C25.2046 9.01319 25.2616 8.95619 25.3293 8.95619H31.6706C31.7383 8.95619 31.7953 9.01319 31.7953 9.08088V10.285C31.7953 10.3349 31.8131 10.3848 31.8202 10.4346ZM22.0162 13.0816H34.9873V22.8856C34.1786 22.4438 33.2844 22.0341 31.6421 22.1659C29.8573 22.312 28.9595 22.9604 28.0938 23.5874C27.2709 24.1823 26.4907 24.7452 24.9089 24.8734C23.5089 24.9874 22.7465 24.6633 22.0198 24.2714V13.078L22.0162 13.0816ZM22.7679 7.74138V7.30675C22.7679 7.036 22.9888 6.81513 23.2595 6.81513H33.7439C34.0147 6.81513 34.2356 7.036 34.2356 7.30675V7.74138C34.2356 8.01213 34.0147 8.233 33.7439 8.233H23.2595C22.9888 8.233 22.7679 8.01213 22.7679 7.74138ZM38.4322 24.4816C38.6317 24.4638 38.7778 24.2892 38.7635 24.0933C38.7457 23.8938 38.5676 23.7477 38.3752 23.7619C37.1176 23.8653 36.3766 23.6123 35.7104 23.2739V12.4368C35.7104 12.0164 35.4148 11.5889 35.0193 11.4428L32.7393 10.5985C32.6324 10.5593 32.5184 10.399 32.5184 10.2814V9.07732C32.5184 9.03457 32.5006 8.99538 32.4935 8.95263H33.7439C34.4137 8.95263 34.9588 8.40757 34.9588 7.73782V7.30319C34.9588 6.63344 34.4137 6.08838 33.7439 6.08838H23.2595C22.5898 6.08838 22.0447 6.63344 22.0447 7.30319V7.73782C22.0447 8.40757 22.5898 8.95263 23.2595 8.95263H24.5099C24.5028 8.99538 24.485 9.03457 24.485 9.07732V10.2814C24.485 10.3954 24.3746 10.5558 24.2641 10.5985L21.9841 11.4428C21.5923 11.5889 21.293 12.0164 21.293 12.4368V23.8795C20.5342 23.4841 19.6578 23.1528 18.1687 23.2774C17.9692 23.2953 17.8231 23.4698 17.8374 23.6658C17.8552 23.8653 18.0298 24.0113 18.2257 23.9971C19.7398 23.8724 20.5093 24.2643 21.293 24.6989V28.2934C20.5342 27.898 19.6578 27.5703 18.1687 27.6914C17.9692 27.7092 17.8231 27.8838 17.8374 28.0797C17.8552 28.2792 18.0298 28.4253 18.2257 28.411C19.7398 28.2828 20.5093 28.6782 21.293 29.1128V32.7074C20.5342 32.3119 19.6578 31.9806 18.1687 32.1053C17.9692 32.1231 17.8231 32.2977 17.8374 32.4936C17.8552 32.6931 18.0298 32.8392 18.2257 32.8249C19.7398 32.6967 20.5093 33.0921 21.293 33.5232V46.5548C21.293 47.1854 21.806 47.6948 22.433 47.6948V47.6841C22.5577 47.6984 22.718 47.6984 22.9175 47.6984H22.9888V50.2563C22.9888 50.4558 23.1491 50.6161 23.3486 50.6161H33.6478C33.8473 50.6161 34.0076 50.4558 34.0076 50.2563V47.6984H34.5633C34.5811 47.6984 34.5989 47.6984 34.6168 47.6948C35.2188 47.6663 35.7033 47.1676 35.7033 46.5548V32.8962C36.3766 33.1954 37.1889 33.4056 38.4251 33.3059C38.6246 33.2881 38.7706 33.1135 38.7564 32.9176C38.7386 32.7181 38.5676 32.572 38.3681 32.5863C37.1105 32.6896 36.3695 32.4366 35.7033 32.0982V28.4823C36.3766 28.7815 37.1889 28.9953 38.4251 28.8919C38.6246 28.8741 38.7706 28.6996 38.7564 28.5036C38.7386 28.3041 38.5604 28.1581 38.3681 28.1723C37.1141 28.2756 36.3695 28.0227 35.7033 27.6843V24.0683C36.3766 24.3676 37.1889 24.5778 38.4251 24.478" fill="#0C233F"/>
        </g>
        <defs>
        <clipPath id="clip0_867_11302">
        <rect width="57" height="57" fill="white"/>
        </clipPath>
        </defs>
      </svg>
      </span>
    </span>
  )
}

export function QuestionIcon(props) {
  return (
    <span {...props}>
      <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="13.3314" cy="13.3314" r="12.6419" stroke="#1B2943" strokeWidth="1.37911"/>
        <path d="M11.9656 15.5114L11.9672 15.6247H12.0805H13.5386H13.6535V15.5098V15.1453C13.6535 14.9468 13.6813 14.7793 13.7336 14.6404C13.7888 14.5049 13.884 14.3725 14.0242 14.2438C14.1711 14.1129 14.3793 13.9688 14.6518 13.8119L14.6519 13.8119L14.6538 13.8107C14.946 13.6346 15.1952 13.4399 15.4002 13.2262L15.401 13.2253C15.6076 13.0056 15.7643 12.7587 15.8704 12.4849C15.9812 12.2099 16.0356 11.9062 16.0356 11.5754V11.5628C16.0356 11.0809 15.9103 10.6497 15.6578 10.2732C15.4062 9.89795 15.0541 9.60639 14.6059 9.39744C14.1602 9.18346 13.6421 9.07843 13.0547 9.07843C12.4214 9.07843 11.8766 9.19177 11.4249 9.42407C10.9757 9.65097 10.6279 9.96706 10.3855 10.3725L10.3855 10.3725L10.385 10.3733C10.1483 10.7766 10.0201 11.233 9.99846 11.7402L9.99836 11.7402V11.7451V11.7576V11.8731L10.1138 11.8726L11.5845 11.8663L11.6113 11.8662L11.6354 11.8542L11.6479 11.8479L11.708 11.8178L11.7113 11.7507C11.7231 11.5116 11.7834 11.3092 11.889 11.1396L11.889 11.1396L11.8895 11.1386C11.9959 10.9639 12.1395 10.8297 12.3221 10.7346C12.5044 10.6396 12.7182 10.5904 12.9667 10.5904C13.2205 10.5904 13.4344 10.638 13.612 10.7287L13.612 10.7287L13.6129 10.7291C13.7974 10.8214 13.9358 10.9441 14.0324 11.0964L14.0323 11.0964L14.033 11.0975C14.1285 11.2444 14.1779 11.417 14.1779 11.6194V11.6319C14.1779 11.8249 14.1464 11.989 14.0868 12.1268L14.0867 12.1268L14.0857 12.1293C14.0309 12.2645 13.9339 12.3973 13.7889 12.5266L13.7889 12.5266L13.7878 12.5277C13.6444 12.6591 13.4459 12.8035 13.1898 12.9604C12.8984 13.1362 12.6553 13.3244 12.4625 13.526L12.4625 13.526C12.2708 13.7267 12.1336 13.9554 12.0527 14.2116C11.9723 14.4619 11.9423 14.7479 11.9593 15.0675L11.9656 15.5114ZM13.7176 18.3152L13.7186 18.3143C13.9334 18.109 14.0369 17.8361 14.0369 17.5084C14.0369 17.181 13.9336 16.9098 13.7181 16.7084C13.5037 16.5038 13.2195 16.4068 12.8787 16.4068C12.5412 16.4068 12.2577 16.5042 12.0397 16.708C11.8239 16.9094 11.7204 17.1808 11.7204 17.5084C11.7204 17.8361 11.824 18.109 12.0388 18.3143L12.0388 18.3143L12.0407 18.3161C12.2588 18.5152 12.5419 18.6101 12.8787 18.6101C13.2191 18.6101 13.503 18.5155 13.7176 18.3152L13.7176 18.3152Z" fill="#1B2943" stroke="#1B2943" strokeWidth="0.229852"/>
      </svg>
    </span>
  )
}

export function SpinnerLoading (props) {
  return <span {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={38}
      height={38}
      viewBox="0 0 38 38"
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stopColor="#1b2943" stopOpacity={0} offset="0%" />
          <stop stopColor="#1b2943" stopOpacity=".631" offset="63.146%" />
          <stop stopColor="#1b2943" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="#fff"
            strokeWidth={2}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill="#1b2943" cx={36} cy={18} r={1}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  </span>
}

export function SpinnerLoadingSecondary (props) {
  return <span {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={38}
      height={38}
      viewBox="0 0 38 38"
    >
      <defs>
        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
          <stop stopColor="#fff" stopOpacity={0} offset="0%" />
          <stop stopColor="#fff" stopOpacity=".631" offset="63.146%" />
          <stop stopColor="#fff" offset="100%" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)">
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            id="Oval-2"
            stroke="#1b2943"
            strokeWidth={3}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </path>
          <circle fill="#fff" cx={36} cy={18} r={1}>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.9s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  </span>
}

export function ArrowDownRef ({innerRef, ...props}) {
  return <span {...props} ref={innerRef}>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0.562462C6.57867 0.562462 0.5625 6.57864 0.5625 14C0.5625 21.4213 6.57867 27.4375 14 27.4375C21.4213 27.4375 27.4375 21.4213 27.4375 14C27.4375 6.57864 21.4213 0.562462 14 0.562462Z" stroke="#1B2943" strokeWidth="1.125"/>
      <path d="M18.1953 12.6008L13.9953 16.8008L9.79531 12.6008" stroke="#1B2943" strokeWidth="1.81875" strokeLinecap="round"/>
    </svg>
  </span>
}

export function ArrowDown (props) {
  return <span {...props}>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0.562462C6.57867 0.562462 0.5625 6.57864 0.5625 14C0.5625 21.4213 6.57867 27.4375 14 27.4375C21.4213 27.4375 27.4375 21.4213 27.4375 14C27.4375 6.57864 21.4213 0.562462 14 0.562462Z" stroke="#1B2943" strokeWidth="1.125"/>
      <path d="M18.1953 12.6008L13.9953 16.8008L9.79531 12.6008" stroke="#1B2943" strokeWidth="1.81875" strokeLinecap="round"/>
    </svg>
  </span>
}

export function PlusIcon ({innerRef, ...props}) {
  return <span {...props} ref={innerRef}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.819719 10.956H9.13572V19.272H10.8637V10.956H19.1797V9.228H10.8637V0.911999H9.13572V9.228H0.819719V10.956Z" fill="#1B2943"/>
    </svg>
  </span>
}

export function MinusIcon ({innerRef, ...props}) {
  return <span {...props} ref={innerRef}>   
    <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0H0V2H16V0Z" fill="#1B2943"/>
    </svg>
  </span>
}

export function CheckIcon({innerRef, ...props}) {
  return <span {...props} ref={innerRef}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Interface / Check">
      <path id="Vector" d="M6 12L10.2426 16.2426L18.727 7.75732" stroke="#1B2943" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>
  </span>
}

export function CompareYesIcon({innerRef, ...props}) {
  return <span {...props} ref={innerRef}>
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
      <path d="M2 6.5L5.5 10L13.5 2" stroke="#47933B" stroke-width="3"/>
    </svg>
  </span>
}

export function CompareNoIcon({innerRef, ...props}) {
  return <span {...props} ref={innerRef}>
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
      <path d="M2 10.5L11 1.5" stroke="#BA1323" stroke-width="3"/>
      <path d="M11 10.5L2 1.5" stroke="#BA1323" stroke-width="3"/>
    </svg>
  </span>
}

export function CompareSomeIcon({innerRef, ...props}) {
  return <span {...props} ref={innerRef}>
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="#F38928" stroke-width="2"/>
      <path d="M7 -3.0598e-07C7.91925 -3.46162e-07 8.8295 0.18106 9.67878 0.532843C10.5281 0.884626 11.2997 1.40024 11.9497 2.05025C12.5998 2.70026 13.1154 3.47194 13.4672 4.32122C13.8189 5.17049 14 6.08075 14 7C14 7.91925 13.8189 8.8295 13.4672 9.67878C13.1154 10.5281 12.5998 11.2997 11.9497 11.9497C11.2997 12.5998 10.5281 13.1154 9.67878 13.4672C8.8295 13.8189 7.91925 14 7 14L7 7L7 -3.0598e-07Z" fill="#F38928"/>
    </svg>
  </span>
}

export function ClockIcon({innerRef, ...props}) {
  return <span {...props} ref={innerRef}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 7V12H17M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#1B2943" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
}

export function FilterClubIcon({innerRef, ...props}) {
  return <span {...props} ref={innerRef}>
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="_Layer_" clip-path="url(#clip0_3659_5549)">
      <path id="Vector" d="M12.717 18.5596H6.43078C6.37547 18.5596 6.33398 18.6038 6.33398 18.6564V26.5882C6.33398 26.6435 6.37823 26.685 6.43078 26.685H6.85669C6.912 26.685 6.95348 26.6407 6.95348 26.5882V22.5697H11.8625C11.9178 22.5697 11.9593 22.5255 11.9593 22.4729V22.1023C11.9593 22.047 11.915 22.0055 11.8625 22.0055H6.95348V19.1376H12.7143C12.7696 19.1376 12.8111 19.0933 12.8111 19.0408V18.6591C12.8111 18.6038 12.7668 18.5623 12.7143 18.5623" fill="#0C233F"/>
      <path id="Vector_2" d="M40.2543 25.4487L39.939 25.2026C39.9197 25.186 39.892 25.1777 39.8671 25.1832C39.8395 25.186 39.8173 25.1998 39.8007 25.2219C39.2697 25.9133 38.3433 26.3254 37.3227 26.3254C35.2679 26.3254 33.78 24.7684 33.78 22.625C33.78 20.4817 35.2706 18.9246 37.3227 18.9246C38.2243 18.9246 39.1287 19.298 39.6237 19.876C39.6403 19.8953 39.6652 19.9092 39.6929 19.9092C39.7178 19.9092 39.7454 19.9009 39.7648 19.8843L40.069 19.605C40.1077 19.569 40.1105 19.5082 40.0773 19.4694C39.4633 18.767 38.4345 18.3494 37.3255 18.3494C34.9056 18.3494 33.1494 20.147 33.1494 22.6278C33.1494 25.1086 34.9056 26.9062 37.3255 26.9062C38.5313 26.9062 39.632 26.4139 40.2709 25.5898C40.3041 25.5483 40.2958 25.4847 40.2543 25.4515" fill="#0C233F"/>
      <path id="Vector_3" d="M22.875 44.1886C10.9828 44.1886 1.31142 34.5144 1.31142 22.625C1.31142 10.7356 10.9828 1.06142 22.875 1.06142C34.7672 1.06142 44.4386 10.7356 44.4386 22.625C44.4386 34.5144 34.7644 44.1886 22.875 44.1886ZM22.875 0.5C10.6758 0.5 0.75 10.4258 0.75 22.625C0.75 34.8242 10.6758 44.75 22.875 44.75C35.0742 44.75 45 34.8242 45 22.625C45 10.4258 35.0742 0.5 22.875 0.5Z" fill="#0C233F"/>
      <path id="Vector_4" d="M27.9084 21.693C27.2778 21.3473 26.5836 21.0292 25.3115 21.1343C23.9259 21.2477 23.2289 21.7511 22.5569 22.2378C21.918 22.6997 21.3124 23.1366 20.0844 23.2362C18.9975 23.3247 18.4057 23.073 17.8415 22.7688V19.9728C18.3117 20.2023 18.8537 20.3904 19.653 20.3904C19.8023 20.3904 19.9627 20.3848 20.1314 20.371C21.517 20.2576 22.214 19.7543 22.886 19.2675C23.5249 18.8057 24.1305 18.3687 25.3585 18.2691C26.5809 18.1696 27.1783 18.5014 27.8116 18.8527C27.8448 18.872 27.878 18.8886 27.9084 18.9052V21.693ZM27.9084 25.1196C27.2806 24.7766 26.5836 24.4558 25.3115 24.5609C23.9259 24.6743 23.2289 25.1777 22.5569 25.6644C21.918 26.1263 21.3124 26.5632 20.0844 26.6628C18.9975 26.7541 18.4057 26.4996 17.8415 26.1954V23.3994C18.3117 23.6289 18.8537 23.8142 19.653 23.8142C19.8023 23.8142 19.96 23.8087 20.1287 23.7948C21.5143 23.6815 22.2112 23.1781 22.8832 22.6914C23.5221 22.2295 24.1278 21.7925 25.3557 21.693C26.5781 21.5906 27.1755 21.9253 27.8088 22.2765C27.842 22.2931 27.8752 22.3125 27.9056 22.3291V25.1168L27.9084 25.1196ZM27.9084 36.6439C27.9084 36.8237 27.7618 36.9703 27.582 36.9703C27.571 36.9703 27.5571 36.9703 27.5461 36.9703H18.5412C18.367 36.9703 18.2204 36.9703 18.1817 36.9703C17.9991 36.9675 17.8387 36.8292 17.8387 36.6439V26.826C18.3089 27.0555 18.851 27.2408 19.6502 27.2408C19.7996 27.2408 19.9572 27.2353 20.1259 27.2215C21.5115 27.1081 22.2084 26.6047 22.8805 26.118C23.5193 25.6561 24.125 25.2191 25.3529 25.1196C26.5753 25.0173 27.1727 25.3519 27.8061 25.7031C27.8392 25.7225 27.8724 25.7391 27.9028 25.7557V36.6412L27.9084 36.6439ZM26.5919 39.2381H24.5841L26.2877 37.5345H26.5919V39.2381ZM19.1579 37.5345H20.9418L19.2464 39.2298C19.2464 39.2298 19.2437 39.2353 19.2409 39.2381H19.1579V37.5345ZM23.7959 39.2381H20.0291L21.7327 37.5345H25.4968L23.8014 39.2298C23.8014 39.2298 23.7987 39.2353 23.7959 39.2381ZM18.013 9.91141L19.783 9.25596C19.841 9.23383 19.8964 9.19788 19.9461 9.16192H25.8065C25.859 9.19788 25.9116 9.23383 25.9697 9.25596L27.7397 9.91141C27.806 9.9363 27.8724 10.0193 27.8973 10.0967H17.8526C17.8775 10.0193 17.9438 9.9363 18.0102 9.91141M25.4525 8.6005H20.2974C20.3029 8.56178 20.3167 8.52307 20.3167 8.48435V7.54957C20.3167 7.49702 20.361 7.45277 20.4135 7.45277H25.3363C25.3889 7.45277 25.4331 7.49702 25.4331 7.54957V8.48435C25.4331 8.52307 25.447 8.56178 25.4525 8.6005ZM17.8415 10.6554H27.9111V18.2664C27.2833 17.9234 26.5892 17.6054 25.3142 17.7077C23.9286 17.8211 23.2317 18.3244 22.5597 18.8112C21.9208 19.2731 21.3151 19.71 20.0872 19.8096C19.0003 19.8981 18.4085 19.6464 17.8443 19.3422V10.6526L17.8415 10.6554ZM18.425 6.50969V6.17228C18.425 5.9621 18.5965 5.79063 18.8067 5.79063H26.9459C27.1561 5.79063 27.3276 5.9621 27.3276 6.17228V6.50969C27.3276 6.71988 27.1561 6.89135 26.9459 6.89135H18.8067C18.5965 6.89135 18.425 6.71988 18.425 6.50969ZM30.5855 19.5054C30.7404 19.4915 30.8538 19.356 30.8427 19.2039C30.8289 19.049 30.6906 18.9356 30.5413 18.9467C29.565 19.0269 28.9897 18.8306 28.4726 18.5678V10.1548C28.4726 9.82844 28.243 9.49657 27.936 9.38317L26.166 8.72772C26.0831 8.6973 25.9946 8.57285 25.9946 8.48158V7.5468C25.9946 7.51361 25.9807 7.48319 25.9752 7.45H26.9459C27.4659 7.45 27.889 7.02686 27.889 6.50692V6.16952C27.889 5.64958 27.4659 5.22644 26.9459 5.22644H18.8067C18.2868 5.22644 17.8636 5.64958 17.8636 6.16952V6.50692C17.8636 7.02686 18.2868 7.45 18.8067 7.45H19.7774C19.7719 7.48319 19.7581 7.51361 19.7581 7.5468V8.48158C19.7581 8.57008 19.6723 8.69453 19.5866 8.72772L17.8166 9.38317C17.5124 9.49657 17.2801 9.82844 17.2801 10.1548V19.038C16.691 18.731 16.0107 18.4738 14.8546 18.5706C14.6998 18.5844 14.5864 18.7199 14.5974 18.872C14.6113 19.0269 14.7468 19.1403 14.8989 19.1292C16.0743 19.0324 16.6716 19.3367 17.2801 19.6741V22.4646C16.691 22.1576 16.0107 21.9032 14.8546 21.9972C14.6998 22.011 14.5864 22.1465 14.5974 22.2986C14.6113 22.4535 14.7468 22.5669 14.8989 22.5558C16.0743 22.4563 16.6716 22.7633 17.2801 23.1007V25.8912C16.691 25.5842 16.0107 25.327 14.8546 25.4238C14.6998 25.4376 14.5864 25.5731 14.5974 25.7253C14.6113 25.8801 14.7468 25.9935 14.8989 25.9825C16.0743 25.8829 16.6716 26.1899 17.2801 26.5245V36.6412C17.2801 37.1307 17.6783 37.5262 18.1651 37.5262V37.5179C18.2619 37.5289 18.3863 37.5289 18.5412 37.5289H18.5965V39.5147C18.5965 39.6695 18.721 39.794 18.8758 39.794H26.8713C27.0261 39.794 27.1506 39.6695 27.1506 39.5147V37.5289H27.582C27.5959 37.5289 27.6097 37.5289 27.6235 37.5262C28.0909 37.5041 28.467 37.1169 28.467 36.6412V26.0378C28.9897 26.2701 29.6203 26.4333 30.58 26.3558C30.7348 26.342 30.8482 26.2065 30.8372 26.0544C30.8233 25.8995 30.6906 25.7861 30.5357 25.7972C29.5595 25.8774 28.9842 25.681 28.467 25.4183V22.6112C28.9897 22.8435 29.6203 23.0094 30.58 22.9292C30.7348 22.9154 30.8482 22.7799 30.8372 22.6278C30.8233 22.4729 30.6851 22.3595 30.5357 22.3706C29.5622 22.4508 28.9842 22.2544 28.467 21.9917V19.1845C28.9897 19.4169 29.6203 19.58 30.58 19.5026" fill="#0C233F"/>
      </g>
      <defs>
      <clipPath id="clip0_3659_5549">
      <rect width="44.25" height="44.25" fill="white" transform="translate(0.75 0.5)"/>
      </clipPath>
      </defs>
    </svg>
  </span>
}

export function IconLeftArrowClose({innerRef, ...props}) {
  return <span {...props} ref={innerRef}>
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
      <circle cx="13.3314" cy="13.3314" r="12.6419" stroke="#1B2943" stroke-width="1.37911"/>
      <path d="M14.9404 9L11 12.9408L14.9404 16.8816" stroke="#1B2943" stroke-width="1.31354" stroke-linecap="round"/>
    </svg>
  </span>
}

export function FilterClubQuestionIcon({innerRef, ...props}) {
  return <span {...props} ref={innerRef}>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="8.48283" stroke="#1B2943" strokeWidth="1.03433"/>
        <path d="M8.06951 10.4734L8.07071 10.5584H8.15569H9.14007H9.22626V10.4722V10.2261C9.22626 10.0929 9.24488 9.98097 9.27973 9.88844C9.3164 9.79845 9.37978 9.71008 9.47367 9.62391C9.57221 9.53611 9.7122 9.43919 9.8959 9.33342L9.89591 9.33343L9.8974 9.33254C10.0952 9.21329 10.264 9.08143 10.403 8.93652L10.4036 8.93589C10.5438 8.78678 10.6502 8.61915 10.7223 8.43331C10.7975 8.24653 10.8344 8.0404 10.8344 7.8161V7.80762C10.8344 7.48071 10.7494 7.18794 10.5779 6.93223C10.4071 6.67745 10.1681 6.47965 9.8643 6.338C9.56204 6.19289 9.21093 6.12181 8.81336 6.12181C8.38484 6.12181 8.01563 6.1985 7.70922 6.35609C7.4046 6.50994 7.16854 6.72441 7.00399 6.99965L7.00399 6.99965L7.00364 7.00025C6.84308 7.27379 6.75621 7.58336 6.74152 7.92698L6.74144 7.92698V7.93066V7.93915V8.02571L6.82801 8.02534L7.82087 8.0211L7.84102 8.02101L7.85905 8.012L7.86753 8.00776L7.9126 7.98522L7.91507 7.9349C7.92295 7.77474 7.96335 7.6395 8.0337 7.52644L8.0337 7.52645L8.03414 7.52572C8.10513 7.4091 8.2009 7.31959 8.3228 7.2561C8.44441 7.19276 8.58733 7.15977 8.75396 7.15977C8.92423 7.15977 9.06724 7.19167 9.18573 7.25218L9.18573 7.25218L9.18638 7.25251C9.30966 7.31415 9.40183 7.39599 9.46612 7.49737L9.46611 7.49737L9.46664 7.49818C9.53011 7.59582 9.56303 7.71064 9.56303 7.8458V7.85429C9.56303 7.9836 9.54192 8.09318 9.50223 8.18498L9.50221 8.18497L9.50146 8.1868C9.46504 8.27664 9.40047 8.36523 9.30333 8.45187L9.30333 8.45186L9.30246 8.45266C9.2062 8.5409 9.07269 8.63801 8.90009 8.74381C8.70288 8.86275 8.53817 8.99029 8.40739 9.12701L8.40736 9.12704C8.27706 9.2634 8.18379 9.41897 8.12873 9.59321C8.07407 9.76335 8.05375 9.95747 8.06529 10.1739L8.06951 10.4734ZM9.26677 12.3724L9.26677 12.3725L9.26751 12.3718C9.41452 12.2313 9.48509 12.0447 9.48509 11.8215C9.48509 11.5985 9.41463 11.413 9.26714 11.2751C9.12047 11.1352 8.92634 11.0691 8.69455 11.0691C8.46501 11.0691 8.27139 11.1355 8.12234 11.2748C7.97459 11.4127 7.90402 11.5984 7.90402 11.8215C7.90402 12.0447 7.97459 12.2313 8.1216 12.3718L8.12159 12.3718L8.12303 12.3731C8.27215 12.5092 8.46553 12.5738 8.69455 12.5738C8.92599 12.5738 9.11998 12.5095 9.26677 12.3724Z" fill="#1B2943" stroke="#1B2943" strokeWidth="0.172389"/>
    </svg>
  </span>
}