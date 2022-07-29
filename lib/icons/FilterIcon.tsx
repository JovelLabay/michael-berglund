import React from "react"
import { IconProps } from "."

export default function FilterIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.5 0.5V2.16667H1.33333L5.5 8.83333V15.5H10.5V8.83333L14.6667 2.16667H15.5V0.5H14.6667H1.33333H0.5ZM3.29948 2.16667H12.7021L8.83333 8.35482V13.8333H7.16667V8.35482L3.29948 2.16667Z"
        fill="#3E5C58"
      />
    </svg>
  )
}
