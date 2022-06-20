import Image from "next/image"
import React, { useMemo } from "react"
import { SwiperSlide } from "swiper/react"

import AssignmentBg from "@/public/bg/assignments.png"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ProgressSwiper } from "@components/swiper"
import { useResponsiveLG } from "@hooks/shared"
import { CheckMark } from "@icons/CheckMark"
import { AssignmentsData } from "@models/blocks"

export const Assignments = ({ title, assignments }: AssignmentsData) => {
  const responsiveLG = useResponsiveLG()

  const slidesPerView = responsiveLG ? 2.02 : 1
  const totalPages = Math.ceil(assignments.length / Math.floor(slidesPerView))

  const slides = useMemo(
    () =>
      assignments.map(({ title, description }, index) => (
        <SwiperSlide key={index}>
          <div className="item flex h-full flex-col lg:flex-row">
            <div className="relative h-[64px] w-[100%] shrink-0 lg:aspect-square lg:h-full lg:w-[28.05%]">
              <Image
                src={AssignmentBg.src}
                alt="Completed Assignments BG"
                layout="fill"
                objectFit="cover"
              />
              <CheckMark className="absolute left-12 top-8 h-5 w-[28px] -translate-x-1/2 -translate-y-1/2 fill-white lg:top-1/2 lg:left-1/2 lg:h-[32px] lg:w-[52px]" />
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
    <section className="section-padding relative bg-white pb-[120px] lg:pl-12 lg:pr-0">
      <div className=" absolute top-0 left-0 w-full">
        <hr className="bg-darker-beige" />
      </div>
      <h3 className="app-h3 mb-10 lg:mb-[60px]">{title}</h3>
      <ProgressSwiper totalPages={totalPages} slidesPerView={slidesPerView} slides={slides} />
    </section>
  )
}
