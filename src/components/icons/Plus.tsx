type PlusProps = React.SVGProps<SVGSVGElement>

export const Plus = (props: PlusProps) => (
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
      <path d="M3.333 8h9.334M8 3.333v9.334"></path>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="currentColor" d="M0 0h16v16H0z"></path>
      </clipPath>
    </defs>
  </svg>
)
