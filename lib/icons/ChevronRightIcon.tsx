import React from "react"
import { IconProps } from "."

export default function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.12885 12.954C1.24289 13.0681 1.39193 13.1249 1.54127 13.1249C1.6906 13.1249 1.83964 13.0681 1.95368 12.954L7.49535 7.41234C7.72314 7.18455 7.72314 6.8153 7.49535 6.58751L1.95368 1.04584C1.72589 0.818052 1.35664 0.818052 1.12885 1.04584C0.90106 1.27364 0.90106 1.64289 1.12885 1.87068L6.2581 6.99993L1.12885 12.1292C0.90106 12.357 0.90106 12.7262 1.12885 12.954Z"
        fill="#3E5C58"
      />
    </svg>
  )
}
