import classNames from "classnames"
import Image from "next/image"
import { useState } from "react"

import { AppLink } from "@components/shared/AppLink"
import { BaseBlock, BlockName } from "@models/blocks"
import { WPMedia } from "@models/common"

export interface BaseBlockMenu {
  name: BlockName
  subDescription?: string[]
}

export interface MenuItemProps {
  text: string
  link: string
  image: WPMedia
  description: string
}

export const MenuItem = ({ text, link, image, description }: MenuItemProps) => {
  const [isShowImage, setIsShowImage] = useState(false)

  return (
    <div className="mt-[44px] flex md:mt-16">
      <div
        onMouseEnter={() => setIsShowImage(true)}
        onMouseLeave={() => setIsShowImage(false)}
        className="w-full md:w-1/2"
      >
        <AppLink
          href={link}
          className="text-[28px] leading-[32px] transition-colors duration-500 ease-in-out hover:text-light-green md:text-[48px]"
        >
          {text}
          <p className="mb-[22px] mt-[2px] block font-gotham text-[14px] leading-6 text-light-green md:hidden">
            {description}
          </p>
        </AppLink>
      </div>
      <div
        className={classNames(
          "absolute right-0 top-1/2 w-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 ease-in-out",
          { "opacity-100": isShowImage }
        )}
      >
        <div className="relative mt-16 hidden aspect-[656/512] w-full pt-[60px] md:block">
          <Image src={image.mediaItemUrl} alt={image.altText} objectFit="cover" layout="fill" />
        </div>
        <p className=" mt-6 hidden font-gotham text-[20px] leading-7 text-light-green md:block">
          {description}
        </p>
      </div>
    </div>
  )
}
