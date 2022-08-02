import React, { ReactNode } from "react"

import { AppLink } from "@components/shared/AppLink"

export interface CardLinkProps {
  link: string
  card: ReactNode
}

export const CardLink = ({ link, card }: CardLinkProps) => {
  return (
    <AppLink href={link}>
      <div className="h-full pt-1">
        <div className="relative h-full">
          {/* Overlay */}
          <div className="absolute top-0 z-0 h-full w-full bg-darker-beige"></div>
          <div className="h-full w-full translate-x-0.5 -translate-y-0.5 bg-light-beige shadow-shadow-cus-2 transition ease-in-out hover:translate-x-1 hover:-translate-y-1">
            {card}
          </div>
        </div>
      </div>
    </AppLink>
  )
}
