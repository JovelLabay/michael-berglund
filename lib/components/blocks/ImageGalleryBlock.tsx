import { useGlobalContext } from "@context/global"
import classNames from "classnames"
import Image from "next/image"

import { ImageGalleryData } from "@models/blocks"

export const ImageGalleryBlock = ({ title, gallery }: ImageGalleryData) => {
  const { images } = useGlobalContext()
  const _logos = gallery.map(({ imageId, imageIdKey }) => (
    <div key={imageIdKey} className="relative aspect-w-[335] aspect-h-[188] md:aspect-w-[427] md:aspect-h-[342]">
      <Image
        src={images![imageId].src}
        alt={images![imageId].alt}
        layout="fill"
        objectFit="cover"
      />
    </div>
  ))

  return (
    <section className="section-padding pb-[120px]">
      <div>
      <h3 className="app-h3 mb-[60px] ">{title}</h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-3">
          {_logos}
        </div>
      </div>
    </section>
  )
}
