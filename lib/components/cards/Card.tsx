import classNames from "classnames"
import Image from "next/image"
import React, { ReactNode } from "react"

import { AppLink } from "@components/shared/AppLink"
import { WPMedia } from "@models/common"

export interface CardProps {
  body: ReactNode
  image?: WPMedia
  link?: string
  className?: string
}

export const Card = ({ image, body, link, className }: CardProps) => {
  const card = (
    <div className={classNames("relative")}>
      {/* Overlay */}
      <div className="absolute top-0 z-0 h-full w-full bg-darker-beige"></div>

      <div
        className={classNames(
          "z-10 w-full translate-x-0.5 -translate-y-0.5 bg-light-beige transition ease-in-out hover:translate-x-1 hover:-translate-y-1",
          className
        )}
      >
        {image && (
          <div className="relative aspect-video w-full">
            <Image src={image.mediaItemUrl} alt={image.altText} layout="fill" objectFit="cover" />
          </div>
        )}
        <div>{body}</div>
      </div>
    </div>
  )

  return link ? <AppLink href={link}>{card}</AppLink> : card
}
