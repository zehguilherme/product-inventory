type MagnifierProps = React.SVGProps<SVGSVGElement>

export const Magnifier = (props: MagnifierProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.333"
      d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667M14 14l-2.867-2.867"
    ></path>
  </svg>
)
