import Image from "next/image"
import React from "react"

import { WPMedia } from "@models/common"

export interface ProfileItemProps {
  image: WPMedia
  name: string
  position: string
  phone: string
  email: string
  linkedin: string
  bio: string
}

export const ProfileCard = ({ image, name, position, phone, email, bio }: ProfileItemProps) => {

  return (
    <div className="relative">
      {/* <div className="flex flex-col items-center lg:items-start">
        <span className="pre-title mt-4 mb-5 font-[350] uppercase tracking-[0.15em]">
          {position}
        </span>
        <a href={`mailto:${email}`} className="app-hover mb-3 hover:opacity-50 lg:mb-0">
          {email}
        </a>
        <a href={`tel:${phone}`} className="app-hover mb-1 hover:opacity-50">
          {phone}
        </a>
      </div> */}
      <div className="card">
        <div className="content">
            <div className="front relative">
                 <div className="relative mb-5 aspect-square w-full h-[300px] shrink-0  lg:mb-0">
                    <Image src={image.mediaItemUrl} alt={image.altText} layout="fill" objectFit="cover" />
                </div>
                <h5 className="app-h4">{name}</h5>
            </div>
            <div className="back">
            Back!
            </div>
        </div>
        </div>



    </div>
  )
}
