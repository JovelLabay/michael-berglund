import { useGlobalContext } from "@context/global"
import classNames from "classnames"
import Image from "next/image"

import { LogowallData } from "@models/blocks"

export const LogowallBlock = ({ heading, border, gallery }: LogowallData) => {
  const { images } = useGlobalContext()

  const _logos = gallery.map(({ imageId }) => (
    <div key={imageId} className="relative h-14 w-[158px] ">
      <Image
        src={images![imageId].src}
        alt={images![imageId].alt}
        layout="fill"
        objectFit="contain"
      />
    </div>
  ))

  return (
    <div className="bg-light-beige">
      <div
        className={classNames("mx-12 flex flex-col items-center  pt-[100px]", {
          "border-b border-normal-beige ": border === "border",
        })}
      >
        <h3 className="app-h3 mb-[70px] text-dark-blue">{heading}</h3>
        <div className="mb-[65px] flex flex-wrap justify-center gap-y-10 gap-x-20 px-[248px]">
          {_logos}
        </div>
      </div>
    </div>
  )
}
