import { useGlobalContext } from "@context/global"
import React from "react"

import { SmallCard } from "@components/cards"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { CourseCardsData } from "@models/blocks"
import { CoursePost } from "@models/common"

export const CourseCards = ({ title }: CourseCardsData) => {
  const { postMap } = useGlobalContext()

  const courses = postMap![0] as CoursePost[]

  // today.toLocaleString('default', {month: "long"})
  // today.getDate()

  console.log(courses)

  return (
    <section className="section-padding relative bg-white pb-[120px]">
      <div className="absolute top-0 left-0 w-full px-12">
        <hr className="bg-darker-beige" />
      </div>
      <h3 className="app-h3">{title}</h3>
      <div className="mt-[60px] grid grid-cols-2 gap-8">
        {courses.map(({ id, uri, title, excerpt, acfCourse: { startDate } }) => {
          const date = new Date(startDate)

          const head = (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
              <span className="app-h1">{date.getDate()}</span>
              <span className="pre-title mt-2 font-[350] uppercase tracking-[0.15em] text-white">
                {date.toLocaleString("default", { month: "long" })}
              </span>
            </div>
          )

          const body = (
            <div>
              <span className="app-h4">{title}</span>
              <Wysiwyg content={excerpt} className="my-5" />
            </div>
          )
          return <SmallCard key={id} link={uri} head={head} body={body} />
        })}
      </div>
    </section>
  )
}
