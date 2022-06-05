import Image from "next/image"
import React, { useMemo } from "react"
import { SwiperSlide } from "swiper/react"

import AssignmentBg from "@/public/bg/assignments.png"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ProgressSwiper } from "@components/swiper"
import { CheckMark } from "@icons/CheckMark"
import { AssignmentsData } from "@models/blocks"

export const Assignments = ({ title, assignments }: AssignmentsData) => {
  const slidesPerView = 2.02
  const totalPages = Math.ceil(assignments.length / Math.floor(slidesPerView))

  const slides = useMemo(
    () =>
      assignments.map(({ title, description }, index) => (
        <SwiperSlide key={index}>
          <div className="item flex h-full">
            <div className="relative aspect-square w-[28.05%] shrink-0">
              <Image
                src={AssignmentBg.src}
                alt="Completed Assignments BG"
                layout="fill"
                objectFit="cover"
              />
              <CheckMark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-white" />
            </div>
            <div className="flex w-full flex-col justify-center bg-light-beige p-8">
              <h5 className="app-h4 mb-5">{title}</h5>
              <Wysiwyg content={description} />
            </div>
          </div>
        </SwiperSlide>
      )),
    [assignments]
  )

  return (
    <section className="relative bg-white pl-12 pt-[100px] pb-[120px]">
      <div className="section-padding absolute top-0 left-0 w-full">
        <hr className="bg-darker-beige" />
      </div>
      <h3 className="app-h3 mb-[60px]">{title}</h3>

      <ProgressSwiper totalPages={totalPages} slidesPerView={slidesPerView} slides={slides} />
    </section>
  )
}
