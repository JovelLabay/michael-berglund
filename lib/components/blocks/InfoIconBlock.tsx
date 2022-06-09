import { useGlobalContext } from "@context/global"
import Image from "next/image"

import { InfoIconData } from "@models/blocks"

export const InfoIconBlock = ({ heading, gallery }: InfoIconData) => {
  const { images } = useGlobalContext()

  const _infoIcon = gallery.map(({ imageId, description }) => (
    <div key={imageId}  className="m-auto max-w-sm">
      <div className="relative h-11 w-full">
        <Image
          src={images![imageId].src}
          alt={images![imageId].alt}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <br />
      <p className="pt-3 ">{description}</p>
    </div>
  ))

  return (
    <section className="bg-light-beige  pb-[120px] section-padding">
      <h3 className="app-h3 mb-[60px] text-center">{heading}</h3>
      <div className="container m-auto grid grid-cols-1 gap-6 text-center sm:grid-cols-2 sm:gap-8 ">
        {_infoIcon}
      </div>
    </section>
  )
}
