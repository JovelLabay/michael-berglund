import { useGlobalContext } from "@context/global"
import classNames from "classnames"
import React, { useCallback, useMemo, useRef, useState } from "react"
import { Pagination } from "swiper"
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper as SwiperClass } from "swiper/types"

import { Card } from "@components/cards"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { SwiperArrowLeft } from "@icons/SwiperArrowLeft"
import { SwiperArrowRight } from "@icons/SwiperArrowRight"
import { RelatedArticleData } from "@models/blocks"

export const RelatedArticles = ({ title, postIds }: RelatedArticleData) => {
  const { postMap } = useGlobalContext()
  const [index, setIndex] = useState(0)
  const swiperRef = useRef<SwiperClass>(null!)

  const slidesPerView = 2.5
  const totalPages = Math.ceil(postIds.length / Math.floor(slidesPerView))

  // handlers
  const handleNext = useCallback(() => swiperRef.current.slideTo(index + 1), [index])
  const handlePrev = useCallback(() => swiperRef.current.slideTo(index - 1), [index])
  const handleSwiperInit = useCallback((swiper: SwiperClass) => {
    swiperRef.current = swiper
    swiper.on("transitionStart", () => setIndex(swiper.activeIndex))
  }, [])

  const slides = useMemo(
    () =>
      postIds.map(cardId => {
        const { id, featuredImage, title, excerpt, uri } = postMap![cardId]

        const cardBody = (
          <div className="p-8">
            <span className="pre-title font-[350] uppercase tracking-[0.15em]">
              Aktuellt · Artiklar
            </span>
            <h4 className="app-h4 my-5">{title}</h4>
            <Wysiwyg content={excerpt} />
          </div>
        )

        return (
          <SwiperSlide key={id}>
            <Card
              image={featuredImage.node}
              body={cardBody}
              link={`/post${uri}`}
              className="h-full"
            />
          </SwiperSlide>
        )
      }),
    [postIds, postMap]
  )

  return (
    <div className="bg-white pl-12 pt-[100px] pb-[120px]">
      <h3 className="app-h3 mb-[60px]">{title}</h3>
      <div className="relative">
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          spaceBetween={35}
          slidesPerView={slidesPerView}
          navigation={true}
          modules={[Pagination]}
          initialSlide={0}
          className="progress-bar-swiper !pb-14"
          onSwiper={handleSwiperInit}
        >
          {slides}
        </Swiper>

        <div className="absolute bottom-0 right-[4%] z-10 inline-flex translate-y-1/2 space-x-[15px]">
          <button
            onClick={handlePrev}
            className={classNames("p-1", {
              "pointer-events-none opacity-25": index === 0,
            })}
          >
            <SwiperArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className={classNames("p-1", {
              "pointer-events-none opacity-25": index === totalPages - 1,
            })}
          >
            <SwiperArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}
