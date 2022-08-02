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
  isCourseFull: any
}

export const SmallCard = ({ head, body, link, className, isCourseFull }: SmallCardProps) => {
  const card = (
    <div className={classNames("item h-full", className)}>
      <div className="aspect-squar relative h-[156px] shrink-0">
        <Image
          src={cardHeadBg.src}
          alt="Completed Assignments BG"
          layout="fill"
          objectFit="cover"
        />
        {head}
      </div>
      <div className="flex w-full flex-col justify-center">
        <div className="mb-[32px] p-5 lg:p-5 xl:p-8">{body}</div>
        {isCourseFull && (
          <div className="pre-title absolute bottom-0 w-full bg-orange px-[25px] py-2 text-center font-[350] uppercase tracking-[0.15em] text-white">
            Väntelista
          </div>
        )}
      </div>
    </div>
  )

  return link ? <CardLink link={link} card={card} /> : card
}
