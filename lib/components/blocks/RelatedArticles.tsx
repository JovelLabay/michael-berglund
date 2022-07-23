import { useGlobalContext } from "@context/global"
import React, { useMemo } from "react"
import { SwiperSlide } from "swiper/react"

import { Card } from "@components/cards"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ProgressSwiper } from "@components/swiper"
import { useResponsiveMD } from "@hooks/shared"
import { ArrowRight } from "@icons/ArrowRight"
import { SwiperArrowRight } from "@icons/SwiperArrowRight"
import { RelatedArticleData } from "@models/blocks"
import { Post } from "@models/common"

export const RelatedArticles = ({ title, postIds, urlLabel, url }: RelatedArticleData) => {
  const { postMap } = useGlobalContext()
  const responsiveMD = useResponsiveMD()

  const slidesPerView = responsiveMD ? 2.5 : 1
  const totalPages = Math.ceil(postIds.length / Math.floor(slidesPerView))

  const slides = useMemo(
    () =>
      postIds.map(cardId => {
        const { id, featuredImage, title, excerpt, uri } = postMap![cardId] as Post

        const cardBody = (
          <div className="px-4 py-6 lg:p-8">
            <span className="pre-title font-[350] uppercase tracking-[0.15em]">
              Aktuellt · Artiklar
            </span>
            <h4 className="app-h4 my-5">{title}</h4>
            <Wysiwyg
              content={excerpt}
              className="article-card h-[72px] overflow-y-hidden lg:h-auto lg:overflow-auto"
            />
          </div>
        )

        return (
          <SwiperSlide key={id} className="pt-1">
            <Card
              image={featuredImage.node}
              body={cardBody}
              link={`/articles${uri}`}
              className="h-full"
            />
          </SwiperSlide>
        )
      }),
    [postIds, postMap]
  )

  return (
    <section className="section-padding bg-white pb-[100px] md:pr-0">
      <div className="app-h3 mb-10 flex flex-row justify-between lg:mb-[60px]">
        <h3>{title}</h3>
        <a
          className=" text flex flex-row items-center pr-[48px] "
          target="_blank"
          rel="noopener noreferrer"
          href={url}
        >
          <span className="mr-2 font-gotham text-[16px] font-medium text-dark-green">{urlLabel}</span>
          <SwiperArrowRight className="w-5 text-[16px]" />
        </a>
      </div>
      <ProgressSwiper totalPages={totalPages} slidesPerView={slidesPerView} slides={slides} />
    </section>
  )
}
