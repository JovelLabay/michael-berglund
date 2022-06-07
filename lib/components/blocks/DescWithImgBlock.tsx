import { useGlobalContext } from "@context/global"
import Image from "next/image"

import { Wysiwyg } from "@components/shared/Wysiwyg"
import { DescWithImageData } from "@models/blocks"

export const DescWithImgBlock = ({ heading, description, imageId }: DescWithImageData) => {
  const { images } = useGlobalContext()

  return (
    <section className="section-padding flex w-full flex-col items-center justify-between bg-white pb-[60px] lg:flex-row lg:pb-[120px]">
      <div className="mb-10 w-full lg:mb-0 lg:w-1/2 lg:pr-[147px]">
        <h3 className="app-h3 mb-8 text-dark-blue lg:mb-[60px]">{heading}</h3>
        <Wysiwyg className="text-body-m lg:text-body-l" content={description} />
      </div>
      <div className="relative aspect-square w-full md:w-3/5 lg:w-1/2">
        <Image {...images![imageId]} alt="" layout="fill" objectFit="cover" />
      </div>
    </section>
  )
}
