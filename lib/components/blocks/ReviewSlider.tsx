import { Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

import { ReviewSliderData } from "@models/blocks"

export const ReviewSlider = ({ reviews }: ReviewSliderData) => {
  const _slides = reviews.map(review => (
    <SwiperSlide key={review.reviewClient}>
      <div className="mx-auto flex max-w-[884px] flex-col items-center">
        <span className="quote-icon">"</span>
        <p className="quote-l mb-8 text-center">{review.reviewText}</p>
        <div className="mb-8">
          <span className="text-body-l font-normal">{review.reviewClient}, </span>
          <span className="text-body-l">{review.reviewCompany}</span>
        </div>
      </div>
    </SwiperSlide>
  ))

  return (
    <Swiper
      pagination={{ clickable: true, type: "bullets" }}
      modules={[Pagination]}
      className="bg-light-beige pt-[60px]"
    >
      {_slides}
    </Swiper>
  )
}
