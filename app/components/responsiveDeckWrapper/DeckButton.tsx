export const DeckButton = (props: {
  size: number;
  className?: string;
  onClick: () => void;
}) => {
  const { size, className, onClick } = props;
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      //   width="397"
      //   height="333"
      viewBox="0 0 397 333"
      fill="none"
    >
      <path
        d="M0.198547 112.153L137.842 19.3605L275.353 223.338L137.71 316.13L0.198547 112.153Z"
        fill="#2E3974"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M135.68 30.4659L11.3039 114.314L139.871 305.024L264.248 221.176L135.68 30.4659ZM0.198547 112.153L137.71 316.13L275.353 223.338L137.842 19.3605L0.198547 112.153Z"
        fill="#F6D970"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M124.761 64.3594L45.9893 117.463L149.961 271.69L228.733 218.586L124.761 64.3594ZM41.8248 116.653L149.151 275.854L232.897 219.397L125.572 60.1949L41.8248 116.653Z"
        fill="#F6D970"
      />
      <path
        d="M108.903 0.512024L274.903 0.21627L275.341 246.216L109.341 246.512L108.903 0.512024Z"
        fill="#2E3974"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M266.917 8.23051L116.917 8.49776L117.327 238.497L267.327 238.23L266.917 8.23051ZM108.903 0.512024L109.341 246.512L275.341 246.216L274.903 0.21627L108.903 0.512024Z"
        fill="#F6D970"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M238.956 30.2803L143.956 30.4496L144.288 216.449L239.287 216.28L238.956 30.2803ZM140.951 27.455L141.293 219.455L242.293 219.275L241.951 27.275L140.951 27.455Z"
        fill="#F6D970"
      />
      <path
        d="M263.618 20.3605L396.509 119.838L249.09 316.774L116.199 217.296L263.618 20.3605Z"
        fill="#2E3974"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M385.311 121.449L265.228 31.5591L127.397 215.686L247.48 305.575L385.311 121.449ZM263.618 20.3605L116.199 217.296L249.09 316.774L396.509 119.838L263.618 20.3605Z"
        fill="#F6D970"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M349.711 122.281L273.659 65.3513L162.196 214.254L238.248 271.184L349.711 122.281ZM273.055 61.1519L157.996 214.858L238.852 275.383L353.911 121.678L273.055 61.1519Z"
        fill="#F6D970"
      />
      <path
        d="M296.308 227.679C296.411 285.392 249.708 332.262 191.994 332.365C134.28 332.467 87.411 285.765 87.3081 228.051C87.2053 170.337 133.908 123.468 191.622 123.365C249.335 123.262 296.205 169.965 296.308 227.679Z"
        fill="#2E3974"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M191.975 321.365C243.613 321.273 285.4 279.337 285.308 227.698C285.216 176.06 243.28 134.273 191.641 134.365C140.003 134.457 98.2161 176.393 98.3081 228.031C98.4001 279.67 140.336 321.457 191.975 321.365ZM191.994 332.365C249.708 332.262 296.411 285.392 296.308 227.679C296.205 169.965 249.335 123.262 191.622 123.365C133.908 123.468 87.2053 170.337 87.3081 228.051C87.411 285.765 134.28 332.467 191.994 332.365Z"
        fill="#F6D970"
      />
    </svg>
  );
};
