import { useGlobalContext } from "@context/global"
import Image from "next/image"

import { Wysiwyg } from "@components/shared/Wysiwyg"
import { DescWithImageData } from "@models/blocks"

export const DescWithImgBlock = ({ heading,
  description,
  imageId,
  dataList
}: DescWithImageData) => {
  const { images } = useGlobalContext()

  return (
    <section className=" flex w-full flex-col items-center justify-between bg-white py-10 md:py-20 lg:h-auto lg:flex-row">
      <div className="mb-10 w-full pt-[60px] pl-5 pr-12 lg:mb-5 lg:w-1/2 lg:pt-5 lg:pl-12 lg:pr-[100px] xl:pr-[147px]">
        <h3 className="app-h3 mb-8 text-dark-blue lg:mb-[60px]">{heading}</h3>
        {dataList.map((data) => {
          return (
            <span key={data.dataKey}>
              <h5 className="pt-3 text-[14px] font-bold tracking-[0.15em]">
                  {data.title}
              </h5>
              <h5 className="my-5 text-[16px] font-normal leading-[24px] text-dark-beige">
                {data.description}
              </h5>
            </span>
          )
        })}
      </div>
      <div className="relative mr-3 aspect-square w-[90%] md:mr-12 md:w-1/2">
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
