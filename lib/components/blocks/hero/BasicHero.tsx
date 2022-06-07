import { useGlobalContext } from "@context/global"
import Image from "next/image"
import React from "react"

import { AppLink } from "@components/shared/AppLink"
import { ArrowDown } from "@icons/ArrowDown"
import { HeroData } from "@models/blocks"

export const BasicHero = ({ page }: HeroData) => {
  const { pageData } = useGlobalContext()

  const { title, linkText, linkUrl, colorOverlay } = page!
  const image = pageData!.featuredImage.node

  return (
    <section className="aspect-w-12 aspect-h-5 relative w-full">
      <div className="absolute w-full ">
        {/* Image */}
        <div className="absolute inset-0 z-0">
          <Image src={image?.mediaItemUrl} alt={image?.altText} layout="fill" objectFit="cover" />
        </div>
        {/* Color Overlay */}
        <div
          className="absolute inset-0 z-10 opacity-50"
          style={{ backgroundColor: colorOverlay }}
        ></div>

        {/* Bottom Text */}
        <div className="absolute bottom-0 z-30 flex w-full items-end justify-between p-12 text-white">
          <h1 className="app-h1">{title}</h1>

          {linkText && (
            <AppLink href="#" className="hover-text-white group flex items-center space-x-3">
              <span>{linkText}</span>
              <ArrowDown className="app-hover fill-white group-hover:fill-medium-beige" />
            </AppLink>
          )}
        </div>
      </div>
    </section>
  )
}
