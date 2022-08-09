import React from "react"

import { Course } from "@models/common"
import ChevronRightIcon from "@icons/ChevronRightIcon"
import { AppLink } from "@components/shared/AppLink"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import CourseDetailedCard from "@components/cards/CourseDetailedCard"

export default function Courses({ course }: { course: Course[] }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-[88px] bg-dark-green" />
      <div className="grid grid-cols-1 pt-8 md:pt-14 lg:grid-cols-3">
        {course?.map((AngCourse, index) => {
          return (
            <>
              <div key={index} className="px-[20px] md:col-span-2 md:pl-12 xl:mr-60">
                {/* BREADCRUMBS */}
                <div className="flex flex-row items-center ">
                  <AppLink
                    href="/board-value"
                    className="text-[14px] font-[350] tracking-wider text-dark-green hover:text-dark-blue"
                  >
                    {"Board Value".toLocaleUpperCase()}
                  </AppLink>

                  <ChevronRightIcon className="mx-3" />
                  <p className="text-[14px] font-[350] tracking-wider text-light-green">
                    {AngCourse.node.title.toLocaleUpperCase()}
                  </p>
                </div>
                <div className="mt-8 mb-[60px] md:mb-[120px] md:mt-[60px]">
                  <h1 className="md:app-h2 app-h3"> {AngCourse.node.title}</h1>
                  <Wysiwyg className="mt-8 md:mt-14" content={AngCourse.node.excerpt} />
                  <Wysiwyg
                    className="pre-title my-5 font-lora leading-6 md:my-10"
                    content={AngCourse.node.content}
                  />
                </div>
              </div>

              <div className="">
                <CourseDetailedCard AngCourse={AngCourse} />
              </div>
            </>
          )
        })}
      </div>
      <div className="my-4 mx-[20px]  border-b md:mx-[60px] lg:my-12" />
    </div>
  )
}
