import { useGlobalContext } from "@context/global"
import classNames from "classnames"
import Image from "next/image"

import { LogowallData } from "@models/blocks"

export const LogowallBlock = ({ heading, border, gallery }: LogowallData) => {
  const { images } = useGlobalContext()

  const _logos = gallery.map(({ imageId }) => (
    <div key={imageId} className="relative h-14 w-[155px] ">
      <Image
        src={images![imageId].src}
        alt={images![imageId].alt}
        layout="fill"
        objectFit="contain"
      />
    </div>
  ))

  return (
    <section className="section-padding bg-light-beige">
      <div
        className={classNames("flex flex-col items-center", {
          "border-b border-normal-beige ": border === "border",
        })}
      >
        <h3 className="app-h3 mb-10 px-5 text-center text-dark-blue lg:mb-[70px]">{heading}</h3>
        <div className="mb-[65px] flex max-w-[1440px] flex-wrap justify-center gap-y-10 gap-x-10 px-[50px] lg:gap-x-20 lg:px-[100px] xl:px-[180px] 2xl:px-[200px]">
          {_logos}
        </div>
      </div>
    </section>
  )
}
