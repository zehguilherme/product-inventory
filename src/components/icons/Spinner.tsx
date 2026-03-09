type SpinnerProps = React.SVGProps<SVGSVGElement>

export const Spinner = (props: SpinnerProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25"></circle>
    <path d="M22 12a10 10 0 0 1-10 10"></path>
  </svg>
)
