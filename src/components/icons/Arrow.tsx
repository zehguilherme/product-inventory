type ArrowProps = React.SVGProps<SVGSVGElement>

export const Arrow = (props: ArrowProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.333"
      clipPath="url(#a)"
    >
      <path d="M8 12.667 3.333 8 8 3.333M12.667 8H3.333"></path>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z"></path>
      </clipPath>
    </defs>
  </svg>
)
