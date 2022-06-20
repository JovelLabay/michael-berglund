import { useGlobalContext } from "@context/global"
import Image from "next/image"

import { InfoIconData } from "@models/blocks"

export const InfoIconBlock = ({ heading, gallery }: InfoIconData) => {
  const { images } = useGlobalContext()

  const _infoIcon = gallery.map(({ imageId, description }) => (
    <div key={imageId} className="m-auto max-w-[465px]">
      <div className="relative h-12 w-full lg:h-[60px]">
        <Image
          src={images![imageId].src}
          alt={images![imageId].alt}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <p className="pt-6 lg:pt-8">{description}</p>
    </div>
  ))

  return (
    <section className="section-padding bg-light-beige pb-[60px] lg:pb-[120px]">
      <h3 className="app-h3 mb-10 text-center lg:mb-[60px]">{heading}</h3>
      <div className="container m-auto grid grid-cols-1 gap-6 text-center sm:grid-cols-2 sm:gap-8 ">
        {_infoIcon}
      </div>
    </section>
  )
}
