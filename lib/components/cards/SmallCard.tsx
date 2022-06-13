import classNames from "classnames"
import Image from "next/image"
import React, { ReactNode } from "react"

import cardHeadBg from "@/public/bg/smallcard.png"

import { CardLink } from "./CardLink"

export interface SmallCardProps {
  head: ReactNode
  body: ReactNode
  link?: string
  className?: string
}

export const SmallCard = ({ head, body, link, className }: SmallCardProps) => {
  const card = (
    <div className={classNames("item flex h-full", className)}>
      <div className="relative aspect-square w-[28.05%] shrink-0">
        <Image
          src={cardHeadBg.src}
          alt="Completed Assignments BG"
          layout="fill"
          objectFit="cover"
        />
        {head}
      </div>
      <div className="flex w-full flex-col justify-center bg-light-beige p-8">{body}</div>
    </div>
  )

  return link ? <CardLink link={link} card={card} /> : card
}
