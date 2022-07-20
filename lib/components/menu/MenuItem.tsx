import classNames from "classnames"
import Image from "next/image"
import { useState } from "react"

import { AppLink } from "@components/shared/AppLink"
import { WPMedia } from "@models/common"
import { BaseBlock, BlockName } from "@models/blocks"

export interface BaseBlockMenu {
  name: BlockName
  subDescription?: string[]
}

export interface MenuItemProps {
  text: string
  link: string
  image: WPMedia
  blocks: BaseBlockMenu[]
}

export const MenuItem = ({ text, link, image, blocks }: MenuItemProps) => {
  const [isShowImage, setIsShowImage] = useState(false)

  // console.log(blocks[2].subDescription?.length)

  return (
    <div className="mt-0 flex md:mt-16">
      <div
        onMouseEnter={() => setIsShowImage(true)}
        onMouseLeave={() => setIsShowImage(false)}
        className="w-full md:w-1/2"
      >
        <AppLink
          href={link}
          className="transition-colors duration-500 ease-in-out hover:text-light-green"
        >
          {text}
          <p className="block font-gotham text-[14px] text-light-green md:hidden">
            {text === "Executive Search"
              ? blocks[2].subDescription?.[0]
              : text === "Interim Management"
              ? blocks[2].subDescription?.[1]
              : text === "Leadership Acceleration"
              ? blocks[2].subDescription?.[2]
              : text === "Board Value"
              ? blocks[2].subDescription?.[3]
              : "_"}
          </p>
        </AppLink>
      </div>
      <div
        className={classNames(
          "absolute right-0 top-1/2 w-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 ease-in-out",
          { "opacity-100": isShowImage }
        )}
      >
        <div className="relative mt-16 hidden aspect-[656/512] w-full md:block">
          <Image src={image.mediaItemUrl} alt={image.altText} objectFit="cover" layout="fill" />
        </div>
        <p className=" mt-6 hidden font-gotham text-[16px] leading-6 text-light-green md:block">
          {text === "Executive Search"
            ? blocks[2].subDescription?.[0]
            : text === "Interim Management"
            ? blocks[2].subDescription?.[1]
            : text === "Leadership Acceleration"
            ? blocks[2].subDescription?.[2]
            : text === "Board Value"
            ? blocks[2].subDescription?.[3]
            : "_"}
        </p>
      </div>
    </div>
  )
}
