import { useGlobalContext } from "@context/global"
import Image from "next/image"

import mockImage from "@/public/images/mock_image_1.png"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { DescWithImageData } from "@models/blocks"

export const DescWithImgBlock = ({ heading, description, imageId }: DescWithImageData) => {
  const { images } = useGlobalContext()

  return (
    <section className="flex w-full items-center justify-between bg-white px-12 pt-[100px] pb-[120px]">
      <div className="w-1/2 pr-[147px]">
        <h3 className="app-h3 mb-[60px] text-dark-blue">{heading}</h3>
        <Wysiwyg className="text-body-l" content={description} />
      </div>
      <div className="relative aspect-square w-1/2">
        <Image {...images![imageId]} alt="" layout="fill" objectFit="cover" />
      </div>
    </section>
  )
}
