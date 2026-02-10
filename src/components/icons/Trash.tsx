type TrashProps = React.SVGProps<SVGSVGElement>

export const Trash = (props: TrashProps) => (
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
      d="M2 4h12M12.667 4v9.333c0 .667-.667 1.334-1.334 1.334H4.667c-.667 0-1.334-.667-1.334-1.334V4M5.333 4V2.667C5.333 2 6 1.333 6.667 1.333h2.666c.667 0 1.334.667 1.334 1.334V4M6.667 7.333v4M9.333 7.333v4"
    ></path>
  </svg>
)
