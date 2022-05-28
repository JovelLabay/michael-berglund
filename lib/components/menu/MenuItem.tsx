import classNames from "classnames"
import Image from "next/image"
import { useState } from "react"

import { AppLink } from "@components/shared/AppLink"
import { WPMedia } from "@models/common"

export interface MenuItemProps {
  text: string
  link: string
  image: WPMedia
}

export const MenuItem = ({ text, link, image }: MenuItemProps) => {
  const [isShowImage, setIsShowImage] = useState(false)
  return (
    <div className="flex">
      <div
        onMouseEnter={() => setIsShowImage(true)}
        onMouseLeave={() => setIsShowImage(false)}
        className="w-2/4"
      >
        <AppLink
          href={link}
          className="transition-colors duration-500 ease-in-out hover:text-light-green"
        >
          {text}
        </AppLink>
      </div>
      <div
        className={classNames(
          "absolute right-0 top-2/4 w-2/4 -translate-y-2/4 opacity-0 transition-opacity duration-500 ease-in-out",
          { "opacity-100": isShowImage }
        )}
      >
        <div className="relative aspect-[656/512] w-full ">
          <Image src={image.mediaItemUrl} alt={image.altText} objectFit="cover" layout="fill" />
        </div>
      </div>
    </div>
  )
}
