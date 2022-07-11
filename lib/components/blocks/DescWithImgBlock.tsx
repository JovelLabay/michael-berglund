import { useGlobalContext } from "@context/global"
import Image from "next/image"

import { Wysiwyg } from "@components/shared/Wysiwyg"
import { DescWithImageData } from "@models/blocks"

export const DescWithImgBlock = ({ heading, description, imageId }: DescWithImageData) => {
  const { images } = useGlobalContext()

  return (
    <section className=" flex w-full flex-col items-center justify-between bg-white lg:h-auto lg:flex-row">
      <div className="mb-10 w-full pt-[60px] pl-5 pr-12 lg:mb-5 lg:w-1/2 lg:pt-5 lg:pl-12 lg:pr-[100px] xl:pr-[147px]">
        <h3 className="app-h3 mb-8 text-dark-blue lg:mb-[60px]">{heading}</h3>
        <Wysiwyg className="image-desc" content={description} />
      </div>
      <div className="relative aspect-square w-full  md:w-1/2 ">
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
