import { useGlobalContext } from "@context/global"
import React, { useState } from "react"

import { SmallCard } from "@components/cards"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ClockIcon } from "@icons/ClockIcon"
import { GlobeIcon } from "@icons/GlobeIcon"
import { CourseCardsData } from "@models/blocks"
import { CoursePost } from "@models/common"

export const CourseCards = ({ title }: CourseCardsData) => {
  const { postMap } = useGlobalContext()

  const courses = postMap![0] as CoursePost[]

  const [currentFilter, setCurrentFilter] = useState("Alla")

  const FILTERS = ["Alla", "Ledning", "Styrelse"]

  return (
    <section className="min-h-[500px] bg-white pb-[60px] md:pb-[120px] ">
      <div className="mx-5 mb-[59px] border-b-[1px] md:mx-12 md:mb-[99px]" />

      <div className="mx-5 md:mx-12">
        {/* HEADER */}
        <div className="mb-[40px] flex flex-col items-start justify-between md:mb-[60px] md:flex-row md:items-center">
          <h3 className="app-h3 mb-[40px] text-dark-blue md:mb-0">{title}</h3>
          <div className="flex flex-row gap-[40px]">
            {FILTERS.map((filter, index) => {
              return (
                <button
                  key={index}
                  className={currentFilter === filter ? " text-dark-green" : " text-light-green"}
                  onClick={() => setCurrentFilter(filter)}
                >
                  {filter}
                  <p className={currentFilter === filter ? "text-dark-green" : "text-white"}>● ●</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* BODY */}
        <div className="  grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {courses
            .filter(
              ({
                id,
                uri,
                title,
                excerpt,
                acfCourse: { startDate, duration, durationUnit, language, isCourseFull, category },
              }) => {
                const data = {
                  id,
                  uri,
                  title,
                  excerpt,
                  acfCourse: {
                    startDate,
                    duration,
                    durationUnit,
                    language,
                    isCourseFull,
                    category,
                  },
                }

                if (currentFilter === "Alla") {
                  return data
                }
                if (currentFilter === "Ledning") {
                  return category === "Ledning"
                }
                if (currentFilter === "Styrelse") {
                  return category === "Styrelse"
                }

                return data
              }
            )
            .map(
              ({
                id,
                uri,
                title,
                excerpt,
                acfCourse: { startDate, duration, durationUnit, language, isCourseFull, category },
              }) => {
                const date = new Date(startDate)

                const head = (
                  <div className="relative z-10 flex h-full flex-col items-center justify-center text-white">
                    <span className="app-h1">{date.getDate()}</span>
                    <span className="pre-title mt-2 font-[350] uppercase tracking-[0.15em] text-white">
                      {date.toLocaleString("default", { month: "long" })}
                    </span>
                  </div>
                )

                const body = (
                  <div>
                    <span className="app-h4">{title}</span>
                    <p className="mb-[20px] mt-[16px] font-gotham text-[14px] font-[350] tracking-wider text-dark-beige">
                      {category ? `${category.toLocaleUpperCase()}` : "."}
                    </p>
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
                return (
                  <SmallCard
                    key={id}
                    link={uri}
                    head={head}
                    body={body}
                    isCourseFull={isCourseFull}
                  />
                )
              }
            )}
        </div>
      </div>
    </section>
  )
}
