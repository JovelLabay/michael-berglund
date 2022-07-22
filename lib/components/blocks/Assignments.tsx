import Image from "next/image"
import React, { useEffect, useMemo, useState } from "react"
import { SwiperSlide } from "swiper/react"

import AssignmentBg from "@/public/bg/assignments.png"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ProgressSwiper } from "@components/swiper"
import { useResponsiveLG } from "@hooks/shared"
import { CheckMark } from "@icons/CheckMark"
import { AssignmentsData, AssignmentsDataPopUp } from "@models/blocks"
import { ArrowDown } from "@icons/ArrowDown"
import DismissIcon from "@icons/DismissIcon"
import { PlusIcon } from "@icons/PlusIcon"
import AssignmentCheck from "@icons/AssignmentCheck"

export const Assignments = ({ title, assignments }: AssignmentsData) => {
  const responsiveLG = useResponsiveLG()

  const slidesPerView = responsiveLG ? 2.02 : 1
  const totalPages = Math.ceil(assignments.length / Math.floor(slidesPerView))

  const [assignmentList, setAssignmentList] = useState<AssignmentsData["assignments"]>([])
  const [limiter, setLimiter] = useState(3)

  const [isShow, setIsShow] = useState(false)
  const [modelContent, setModelContent] = useState<AssignmentsDataPopUp>()

  useEffect(() => {
    const assignmentListItems = localStorage.getItem("assignments") || "3"

    if (localStorage.getItem("assignments") === null) {
      localStorage.setItem("assignments", JSON.stringify(3))
    }

    setAssignmentList(assignments.slice(0, JSON.parse(assignmentListItems)))
  }, [limiter])

  // const slides = useMemo(
  //   () =>
  //     assignments.map(({ title, description }, index) => (
  //       <SwiperSlide key={index}>
  //         <div className="item flex h-full flex-col lg:flex-row">
  //           <div className="relative h-[64px] w-[100%] shrink-0 lg:aspect-square lg:h-full lg:w-[28.05%]">
  //             <Image
  //               src={AssignmentBg.src}
  //               alt="Completed Assignments BG"
  //               layout="fill"
  //               objectFit="cover"
  //             />
  //             <CheckMark className="absolute left-12 top-8 h-5 w-[28px] -translate-x-1/2 -translate-y-1/2 fill-white lg:top-1/2 lg:left-1/2 lg:h-[32px] lg:w-[52px]" />
  //           </div>
  //           <div className="flex w-full flex-col justify-center bg-light-beige p-8">
  //             <h5 className="app-h4 mb-5">{title}</h5>
  //             <Wysiwyg content={description} />
  //           </div>
  //         </div>
  //       </SwiperSlide>
  //     )),
  //   [assignments]
  // )

  return (
    <section className="section-padding relative bg-white pb-[120px] lg:pl-12 lg:pr-0">
      <div className=" absolute top-0 left-0 w-full">
        <hr className="bg-darker-beige" />
      </div>
      <h3 className="app-h3 mb-10 lg:mb-[60px]">{title}</h3>
      {/* <ProgressSwiper totalPages={totalPages} slidesPerView={slidesPerView} slides={slides} /> */}

      {/* ASSIGNMENT CONTAINERS */}
      <div className="mr-0 grid grid-cols-1 gap-7 md:mr-14 md:grid-cols-3">
        {assignmentList.map((assignment, index) => {
          return (
            <div
              key={index}
              className="flex h-40 flex-col items-center justify-between bg-light-beige p-7 md:items-start "
            >
              <AssignmentCheck />
              <p className="font-lora text-[24px] font-medium text-dark-blue">{assignment.title}</p>
              <button
                className="flex flex-row items-center"
                onClick={() => {
                  setIsShow(true)
                  setModelContent(assignment)
                }}
              >
                Läs mer <PlusIcon className="ml-4" />
              </button>
            </div>
          )
        })}
      </div>

      {/* BUTTON */}

      <button
        className="mx-auto mt-10 flex flex-row items-center"
        onClick={() => {
          localStorage.setItem("assignments", JSON.stringify(limiter + 3))
          setLimiter(prev => prev + 3)
        }}
      >
        Läs mer <PlusIcon className="ml-4" />
      </button>

      {/* SHOW EACH ASSIGNEMNT */}
      {isShow && (
        <div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-[#0000007f]">
          <div className="col-span-1 mx-5 flex h-[380px] w-[656px] flex-col items-center justify-center gap-10 bg-white md:mx-0">
            <AssignmentCheck />
            <h3 className="app-h3 mx-2 text-dark-blue">{modelContent?.title}</h3>
            <p className="mx-4 text-dark-blue md:mx-14">{modelContent?.description}</p>
            <button onClick={() => setIsShow(false)} className="flex items-center">
              Stäng <DismissIcon className="ml-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
