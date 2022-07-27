import { useGlobalContext } from "@context/global"
import React from "react"

import { SmallCard } from "@components/cards"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ClockIcon } from "@icons/ClockIcon"
import { GlobeIcon } from "@icons/GlobeIcon"
import { CourseCardsData } from "@models/blocks"
import { CoursePost } from "@models/common"

export const CourseCards = ({ title }: CourseCardsData) => {
  const { postMap } = useGlobalContext()

  const courses = postMap![0] as CoursePost[]

  return (
    <section className="section-padding relative bg-white pb-[120px]">
      <div className="absolute top-0 left-0 w-full px-12">
        <hr className="bg-darker-beige" />
      </div>
      <h3 className="app-h3">{title}</h3>
      <div className="mt-[60px] grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {courses.map(
          ({
            id,
            uri,
            title,
            excerpt,
            acfCourse: { startDate, duration, durationUnit, language, isCourseFull },
          }) => {
            const date = new Date(startDate)

            const head = (
              <div className="relative z-10 flex h-full flex-col items-center justify-center text-white">
                <span className="app-h1">{date.getDate()}</span>
                <span className="pre-title mt-2 font-[350] uppercase tracking-[0.15em] text-white">
                  {date.toLocaleString("default", { month: "long" })}
                </span>

                {isCourseFull && (
                  <div className="pre-title absolute bottom-0 w-full bg-orange px-[25px] py-2 text-center font-[350] uppercase tracking-[0.15em] text-white">
                    Väntelista
                  </div>
                )}
              </div>
            )

            const body = (
              <div>
                <span className="app-h4">{title}</span>
                <Wysiwyg content={excerpt} className="prose-p:body-m prose my-5 font-[350]" />
                <div className="body-m flex items-center space-x-[22px]">
                  <div className="flex items-center space-x-[10px]">
                    <ClockIcon />
                    <span className="font-[350]">{`${duration} ${durationUnit}`}</span>
                  </div>
                  <div className="flex items-center space-x-[10px]">
                    <GlobeIcon />
                    <span className="font-[350]">{language}</span>
                  </div>
                </div>
              </div>
            )
            return <SmallCard key={id} link={uri} head={head} body={body} />
          }
        )}
      </div>
    </section>
  )
}
