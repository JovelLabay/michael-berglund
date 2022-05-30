import Image from "next/image"

import image1 from "@/public/images/Centralized _Network.svg"
import image2 from "@/public/images/Detective.svg"
import image3 from "@/public/images/Earth_Care.svg"
import { AppLink } from "@components/shared/AppLink"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ArrowRight } from "@icons/ArrowRight"
import { StatsData } from "@models/blocks"

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

export const StatsBlock = ({ heading, description, linkTitle, gallery }: StatsData) => {
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
      <h3 className="app-h3 mb-12">{heading}</h3>

      <Wysiwyg className="mb-[88px] max-w-[771px] text-center text-body-l" content={description} />

      <div className="mb-20 flex w-full justify-between space-x-8">{_stats}</div>
      <div className="flex items-center space-x-[10px]">
        <AppLink className="link-m">{linkTitle}</AppLink>
        <ArrowRight />
      </div>
    </section>
  )
}
