type CircleProps = React.SVGProps<SVGSVGElement>

export const Circle = (props: CircleProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 6 6"
    {...props}
  >
    <rect width="6" height="6" fill="currentColor" rx="3"></rect>
  </svg>
)
