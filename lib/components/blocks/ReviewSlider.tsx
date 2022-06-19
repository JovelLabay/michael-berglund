import classNames from "classnames"
import { useCallback, useMemo, useRef, useState } from "react"
import { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper as SwiperClass } from "swiper/types"

import { QuoteIcon } from "@icons/QuoteIcon"
import { SwiperArrowLeft } from "@icons/SwiperArrowLeft"
import { SwiperArrowRight } from "@icons/SwiperArrowRight"
import { ReviewSliderData } from "@models/blocks"

export const ReviewSlider = ({ heading, backgroundColor, reviews }: ReviewSliderData) => {
  const [index, setIndex] = useState(0)
  const swiperRef = useRef<SwiperClass>(null!)

  //handlers
  const handleNext = useCallback(() => swiperRef.current.slideTo(index + 1), [index])
  const handlePrev = useCallback(() => swiperRef.current.slideTo(index - 1), [index])

  const handleSwiperInit = useCallback((swiper: SwiperClass) => {
    swiperRef.current = swiper
    swiper.on("transitionStart", () => setIndex(swiper.activeIndex))
  }, [])

  const _slides = useMemo(
    () =>
      reviews.map(review => (
        <SwiperSlide key={review.reviewClient}>
          <div className="mx-auto flex max-w-[884px] flex-col items-center">
            <QuoteIcon className="mb-8" />
            <p className="quote-l mb-5 text-center lg:mb-8">{review.reviewText}</p>
            <div className="mb-8">
              <span className="text-body-m font-normal lg:text-body-l">
                {review.reviewClient},{" "}
              </span>
              <span className="text-body-m lg:text-body-l">{review.reviewCompany}</span>
            </div>
          </div>
        </SwiperSlide>
      )),
    [reviews]
  )

  return (
    <>
      <section
        className={classNames(
          "section-padding relative flex flex-col bg-white pt-10 pb-[60px] lg:pb-[120px]",
          { "bg-light-beige": backgroundColor === "beige" }
        )}
      >
        {heading && <h3 className="app-h3 mb-[60px] text-center">{heading}</h3>}
        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          initialSlide={0}
          onSwiper={handleSwiperInit}
          className="review-slider mx-0 sm:mx-10 lg:mx-0 xl:mx-[100px] 2xl:mx-[164px]"
        >
          {_slides}

          <button
            className={classNames("swiper-nav-btn left-0 outline-none", {
              "pointer-events-none opacity-25": index === 0,
            })}
            onClick={handlePrev}
          >
            <SwiperArrowLeft />
          </button>
          <button
            className={classNames("swiper-nav-btn right-0 outline-none", {
              "pointer-events-none opacity-25": index === _slides.length - 1,
            })}
            onClick={handleNext}
          >
            <SwiperArrowRight />
          </button>
        </Swiper>
      </section>
      {backgroundColor === "white" && (
        <div className="h-[1px] w-full bg-white">
          <hr className="mx-auto w-[95%] bg-normal-beige" />
        </div>
      )}
    </>
  )
}
