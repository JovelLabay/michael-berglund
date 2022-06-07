import classNames from "classnames"
import React, { useCallback, useRef, useState } from "react"
import { Pagination } from "swiper"
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import { Swiper } from "swiper/react"
import { Swiper as SwiperClass } from "swiper/types"

import { SwiperArrowLeft } from "@icons/SwiperArrowLeft"
import { SwiperArrowRight } from "@icons/SwiperArrowRight"

export interface ProgressSwiperProps {
  totalPages: number
  slidesPerView: number
  slides: JSX.Element[]
}

export const ProgressSwiper = ({ totalPages, slidesPerView, slides }: ProgressSwiperProps) => {
  const [index, setIndex] = useState(0)
  const swiperRef = useRef<SwiperClass>(null!)

  // handlers
  const handleNext = useCallback(() => swiperRef.current.slideTo(index + 1), [index])
  const handlePrev = useCallback(() => swiperRef.current.slideTo(index - 1), [index])
  const handleSwiperInit = useCallback((swiper: SwiperClass) => {
    swiperRef.current = swiper
    swiper.on("transitionStart", () => setIndex(swiper.activeIndex))
  }, [])

  return (
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
        className="progress-bar-swiper !pb-14 lg:pr-12"
        onSwiper={handleSwiperInit}
      >
        {slides}
      </Swiper>

      <div className="absolute -bottom-10 right-[4%] z-10 inline-flex translate-y-1/2 space-x-[15px] lg:bottom-0">
        <button
          onClick={handlePrev}
          className={classNames("p-1 outline-none", {
            "pointer-events-none opacity-25": index === 0,
          })}
        >
          <SwiperArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className={classNames("p-1 outline-none", {
            "pointer-events-none opacity-25":
              index === (slides.length % 2 === 0 ? totalPages : totalPages - 1),
          })}
        >
          <SwiperArrowRight />
        </button>
      </div>
    </div>
  )
}
