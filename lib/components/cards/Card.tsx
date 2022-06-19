import classNames from "classnames"
import Image from "next/image"
import React, { ReactNode } from "react"

import { WPMedia } from "@models/common"

import { CardLink } from "./CardLink"

export interface CardProps {
  body: ReactNode
  image?: WPMedia
  link?: string
  className?: string
}

export const Card = ({ image, body, link, className }: CardProps) => {
  const card = (
    <div className={classNames("h-full bg-light-beige", className)}>
      {image && (
        <div className="relative aspect-video w-full">
          <Image src={image.mediaItemUrl} alt={image.altText} layout="fill" objectFit="cover" />
        </div>
      )}
      <div>{body}</div>
    </div>
  )

  return link ? <CardLink link={link} card={card} /> : card
}
