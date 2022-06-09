import React from "react"

import { IconProps } from "./"

export const ClockIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM13.75 11.5H9.75C9.35 11.5 9 11.15 9 10.75V4.75C9 4.35 9.35 4 9.75 4C10.15 4 10.5 4.35 10.5 4.75V10H13.75C14.15 10 14.5 10.35 14.5 10.75C14.5 11.15 14.15 11.5 13.75 11.5Z"
        fill="#D4CECB"
      />
    </svg>
  )
}
