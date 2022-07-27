import { useGlobalContext } from "@context/global"
import Image from "next/image"

import { Wysiwyg } from "@components/shared/Wysiwyg"
import { DescWithImageData } from "@models/blocks"
import { useEffect, useState } from "react"

export const DescWithImgBlock = ({
  heading,
  description,
  imageId,
  dataList,
  descriptionOnly,
}: DescWithImageData) => {
  const { images } = useGlobalContext()

  return (
    <div className="bg-white">
      <section className=" flex w-full flex-col items-center justify-between bg-white py-0 md:py-20 lg:h-auto lg:flex-row">
        <div className="mb-[40px] w-full pt-[60px] pl-5 pr-5 md:mb-[120px] lg:mb-5 lg:w-1/2 lg:pt-5 lg:pl-12 lg:pr-[100px] xl:pr-[147px]">
          <h3 className="app-h3 mb-8 text-dark-blue lg:mb-[60px]">{heading}</h3>
          {descriptionOnly && <Wysiwyg content={description} />}
          {dataList.map(data => {
            return (
              <span key={data.dataKey}>
                <h5 className="pt-3 text-[14px] font-bold uppercase tracking-[0.15em] text-dark-blue">
                  {data.title}
                </h5>
                <p className="my-5 text-[16px] font-[400] leading-[24px] text-dark-beige">
                  {data.description}
                </p>
              </span>
            )
          })}
        </div>
        <div className="relative mr-3 mb-[60px] aspect-square w-[90%] md:mb-0 md:mr-12 md:w-1/2">
          <Image
            src={images![imageId].src}
            alt={images![imageId].alt}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </section>
      <div className="mx-5  border-b border-normal-beige" />
    </div>
  )
}
