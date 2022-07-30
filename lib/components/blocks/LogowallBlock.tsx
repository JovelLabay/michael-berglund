import { useGlobalContext } from "@context/global"
import classNames from "classnames"
import Image from "next/image"

import { LogowallData } from "@models/blocks"

export const LogowallBlock = ({ heading, border, gallery }: LogowallData) => {
  const { images } = useGlobalContext()

  const _logos = gallery.map(({ imageId }, index: any) => (
    <div key={imageId + Math.random()} className="relative h-14 w-[140px] ">
      <Image
        src={images![imageId].src}
        alt={images![imageId].alt}
        layout="fill"
        objectFit="contain"
      />
    </div>
  ))

  return (
    <section className="section-padding bg-light-beige pb-5">
      <div
        className={classNames("flex flex-col items-center", {
          "border-b border-normal-beige ": border === "border",
        })}
      >
        <h3 className="app-h3 mb-10 px-5 text-center text-dark-blue lg:mb-[60px]">{heading}</h3>
        <div className="mb-[65px] grid grid-cols-2 gap-[50px] md:grid-cols-4 md:gap-[82px]">
          {_logos}
        </div>
      </div>
    </section>
  )
}
