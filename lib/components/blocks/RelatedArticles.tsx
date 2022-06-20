import { useGlobalContext } from "@context/global"
import React, { useMemo } from "react"
import { SwiperSlide } from "swiper/react"

import { Card } from "@components/cards"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ProgressSwiper } from "@components/swiper"
import { useResponsiveMD } from "@hooks/shared"
import { RelatedArticleData } from "@models/blocks"
import { Post } from "@models/common"

export const RelatedArticles = ({ title, postIds }: RelatedArticleData) => {
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
    <section className="section-padding bg-white pb-[120px] md:pr-0">
      <h3 className="app-h3 mb-10 lg:mb-[60px]">{title}</h3>
      <ProgressSwiper totalPages={totalPages} slidesPerView={slidesPerView} slides={slides} />
    </section>
  )
}
