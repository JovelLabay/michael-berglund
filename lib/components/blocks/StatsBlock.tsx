import { useGlobalContext } from "@context/global"
import Image from "next/image"

import { AppLink } from "@components/shared/AppLink"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ArrowRight } from "@icons/ArrowRight"
import { StatsData } from "@models/blocks"

export const StatsBlock = ({ heading, description, linkTitle, linkUri, gallery }: StatsData) => {
  const { images, pageMap } = useGlobalContext()

  const _stats = gallery.map(({ imageId, title }) => (
    <div key={title} className="flex w-[335px] flex-col items-center md:w-[427px]">
      <div className="relative mb-[28px] aspect-square h-[96px] w-[96px]">
        <Image {...images![imageId]} alt="" layout="fill" objectFit="cover" />
      </div>
      <h4 className="app-h4 text-dark-green">{title}</h4>
    </div>
  ))

  return (
    <section className="section-padding flex flex-col items-center bg-light-beige pb-[60px] lg:px-6 lg:pb-[120px] xl:px-[48px]">
      <h3 className="app-h3 mb-8 lg:mb-12">{heading}</h3>

      <Wysiwyg
        className="mb-[45px] max-w-[771px] text-center text-body-m lg:mb-[88px] lg:text-body-l"
        content={description}
      />

      <div className="mb-20 flex w-full flex-col items-center space-y-9 lg:flex-row lg:justify-between lg:space-y-0 xl:space-x-8">
        {_stats}
      </div>
      <div className="flex items-center space-x-[10px] transition-all hover:opacity-70">
        <AppLink href={pageMap![linkUri]!.uri} className="link-m font-normal text-dark-green">
          {linkTitle}
        </AppLink>
        <ArrowRight className="fill-[#3E5C58]" />
      </div>
    </section>
  )
}
