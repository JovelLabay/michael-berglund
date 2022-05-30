import Image from "next/image"

import image1 from "@/public/images/Centralized _Network.svg"
import image2 from "@/public/images/Detective.svg"
import image3 from "@/public/images/Earth_Care.svg"
import { AppLink } from "@components/shared/AppLink"
import { ArrowRight } from "@icons/ArrowRight"

const MOCKDATA = [
  {
    imageSrc: image1,
    title: "Well developed networks",
  },
  {
    imageSrc: image2,
    title: "Deep market understanding",
  },
  {
    imageSrc: image3,
    title: "Global presence",
  },
]

export const StatsBlock = () => {
  // TODO: Connect backend and remove mock data.
  const _stats = MOCKDATA.map(stat => (
    <div key={stat.title} className="flex w-[427px] flex-col items-center">
      <div className="relative mb-[28px] aspect-square h-[96px] w-[96px]">
        <Image src={stat.imageSrc} alt="" layout="fill" objectFit="cover" />
      </div>
      <h4 className="app-h4 text-dark-green">{stat.title}</h4>
    </div>
  ))

  return (
    <section className="flex flex-col items-center bg-light-beige px-[48px] pt-[100px] pb-[120px]">
      <h3 className="app-h3 mb-12">About MB Group</h3>
      {/* TODO: add wysiwig comp instead of p */}
      <p className="mb-[88px] max-w-[771px] text-center text-body-l">
        Adipiscing orci, fermentum augue commodo at proin lectus adipiscing ultrices. Morbi mauris
        vestibulum tortor mi quis eu. Adipiscing dolor justo sed blandit. Tristique nulla pharetra
        tincidunt convallis netus.
      </p>

      <div className="mb-20 flex w-full justify-between space-x-8">{_stats}</div>
      <div className="flex items-center space-x-[10px]">
        <AppLink className="link-m">More about us</AppLink>
        <ArrowRight />
      </div>
    </section>
  )
}
