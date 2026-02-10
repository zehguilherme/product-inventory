type PencilProps = React.SVGProps<SVGSVGElement>

export const Pencil = (props: PencilProps) => (
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
      d="M14.116 4.541a1.88 1.88 0 0 0-2.657-2.658l-8.898 8.9c-.154.154-.269.344-.333.553l-.88 2.901a.334.334 0 0 0 .415.415l2.902-.88c.208-.063.398-.177.553-.331zM10 3.333 12.667 6"
    ></path>
  </svg>
)
