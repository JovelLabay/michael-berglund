import { logoProps } from "./"

export const EmailLogo = ({ className }: logoProps) => {
  return (
    <svg
      className={className}
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 0C1.43 0 0.139766 1.21 0.00976562 2.75L10 8.14453L19.9902 2.75C19.8602 1.21 18.57 0 17 0H3ZM0 4.44531V13C0 14.655 1.345 16 3 16H17C18.655 16 20 14.655 20 13V4.44531L10.3555 9.66016C10.2455 9.72016 10.125 9.75 10 9.75C9.875 9.75 9.75453 9.72016 9.64453 9.66016L0 4.44531Z"
        fill="#3E5C58"
      />
    </svg>
  )
}
