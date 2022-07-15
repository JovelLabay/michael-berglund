import { useGlobalContext } from "@context/global"
import classNames from "classnames"
import Image from "next/image"

import { Wysiwyg } from "@components/shared/Wysiwyg"
import { DescWithImageData } from "@models/blocks"

export const DescWithImgBlock = ({
  heading,
  description,
  imageId,
  backgroundColor,
}: DescWithImageData) => {
  const { images } = useGlobalContext()

  return (
    <section
      className={classNames(
        "flex w-full flex-col items-center justify-between bg-white lg:h-auto lg:flex-row",
        { "bg-light-beige": backgroundColor === "beige" }
      )}
    >
      <div className="mb-10 w-full pt-[60px] pl-5 pr-12 lg:mb-8 lg:w-1/2 lg:pt-8 lg:pl-12  xl:pr-[147px]">
        <h3 className="app-h3 mb-8 text-dark-blue lg:mb-[60px]">{heading}</h3>
        <Wysiwyg className="image-desc" content={description} />
      </div>
      <div className="relative aspect-square w-full md:aspect-video lg:aspect-square lg:w-1/2 ">
        <Image
          src={images![imageId].src}
          alt={images![imageId].alt}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </section>
  )
}
