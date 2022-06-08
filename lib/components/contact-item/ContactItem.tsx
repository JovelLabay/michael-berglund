import Image from "next/image"
import React from "react"

import { WPMedia } from "@models/common"

export interface ContactItemProps {
  image: WPMedia
  name: string
  position: string
  phone: string
  email: string
}

export const ContactItem = ({ image, name, position, phone, email }: ContactItemProps) => {
  return (
    <div className="flex flex-col items-center lg:flex-row lg:space-x-8">
      <div className="relative mb-5 aspect-square w-[197px] shrink-0 overflow-hidden rounded-full lg:mb-0">
        <Image src={image.mediaItemUrl} alt={image.altText} layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col items-center lg:items-start">
        <h5 className="app-h4">{name}</h5>
        <span className="pre-title mt-4 mb-5 font-[350] uppercase tracking-[0.15em]">
          {position}
        </span>
        <a href={`mailto:${email}`} className="mb-3 lg:mb-0">
          {email}
        </a>
        <a href={`tel:${phone}`} className="mb-1">
          {phone}
        </a>
      </div>
    </div>
  )
}
