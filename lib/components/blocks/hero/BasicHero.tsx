import { useGlobalContext } from "@context/global"
import Image from "next/image"
import React from "react"

import { AppLink } from "@components/shared/AppLink"
import { ArrowDown } from "@icons/ArrowDown"
import { HeroData } from "@models/blocks"

export const BasicHero = ({ page }: HeroData) => {
    const { pageData } = useGlobalContext()

    console.log(pageData)

    const { title, linkText, linkUrl, colorOverlay } = page!
    const image = pageData!.featuredImage.node

  return  <div className="w-full aspect-w-12 aspect-h-5 relative">
    <div className="w-full absolute ">

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
        <div className="z-30 text-white absolute bottom-0 w-full p-12 flex justify-between items-end">
            <h1 className="app-h1">{title}</h1>

            <AppLink href="#" className="flex items-center space-x-3">
                <span>{linkText}</span>
                <ArrowDown className=""/>
            </AppLink>
        </div>
    </div>
  </div>
}
