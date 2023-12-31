import { useGlobalContext } from "@context/global"
import Image from "next/image"
import React from "react"

import { AppLink } from "@components/shared/AppLink"
import { ArrowRight } from "@icons/ArrowRight"
import { RightLeftImageData } from "@models/blocks"

export const RightLeftImageBlock = ({
  heading,
  description,
  imageId,
  position,
  link,
}: RightLeftImageData) => {
  const { images } = useGlobalContext()

  return (
    <section className="section-padding flex flex-col items-center justify-center bg-light-beige pb-[60px] lg:flex-row lg:pb-[120px]">
      <div className="aspect-w-16 aspect-h-11 relative mb-10 w-full lg:aspect-h-5 lg:mr-[90px] lg:mb-0 lg:flex-1">
        <Image
          src={images![imageId].src}
          alt={images![imageId].alt}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="flex-1">
        <div className="max-w-prose">
          <h3 className="app-h3 mb-10 font-normal">{heading}</h3>
          <p className="body-m mb-8 font-[350]">{description}</p>
          <div className="flex items-center space-x-2 hover-text-green">
            <AppLink href={link} className="link-m font-normal text-dark-green ">
              Läs mer
            </AppLink>
            <ArrowRight className="fill-dark-green" />
          </div>
        </div>
      </div>
    </section>
  )
}
