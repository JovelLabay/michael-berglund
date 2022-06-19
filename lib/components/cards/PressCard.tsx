import classNames from "classnames"
import Image from "next/image"
import React, { ReactNode } from "react"

import { ExternalUrlIcon } from "@icons/ExternalUrlIcon"
import { NewsPaper } from "@icons/NewsPaper"

import { CardLink } from "./CardLink"

export interface PressCard {
  body: ReactNode
  link?: string
  className?: string
}

export const PressCard = ({ body, link, className }: PressCard) => {
  return (
    <div className="h-full pt-1 bg-light-beige">
      <div className="relative h-full">
        {/* Overlay */}
        <div className="absolute top-0 z-0 h-full w-full bg-darker-beige"></div>
        <div className="h-full w-full translate-x-0.5 -translate-y-0.5 transition ease-in-out hover:translate-x-1 hover:-translate-y-1">
          <div className={classNames("bg-light-beige ", className)}>
            <div  className="p-8"> 
              <NewsPaper />
              <div className="pt-[21px]">{body}</div>
                <a href={link} target="_blank"><span className="font-medium text-dark-green inline-flex">Go to article &nbsp; <ExternalUrlIcon className="relative top-1"/></span></a> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
