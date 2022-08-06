import { ArrowRight } from "@icons/ArrowRight"
import CardRightIcon from "@icons/CardRightIcon"
import { Course } from "@models/common"
import React from "react"

export default function CourseDetailedCard({ AngCourse }: { AngCourse: Course }) {
  return (
    <div className="bg-light-beige md:sticky md:top-0 lg:mr-12">
      <div className="px-5 pt-10 md:px-8 md:pt-8">
        <h1 className="app-h4 mb-8">{AngCourse.node.acfCourse.category}</h1>
        <div>
          <p className="text-[14px] font-[350] tracking-wider">{"Längd".toLocaleUpperCase()}</p>
          <p>{AngCourse.node.acfCourse.duration} dagar</p>
        </div>
        <div className="my-5">
          <p className="text-[14px] font-[350] tracking-wider">{"Plats".toLocaleUpperCase()}</p>
          <p>{AngCourse.node.acfCourse.duration} dagar</p>
        </div>
        <div>
          <p className="text-[14px] font-[350] tracking-wider">{"Språk".toLocaleUpperCase()}</p>
          <p>{AngCourse.node.acfCourse.language}</p>
        </div>
        <div className="my-5">
          <p className="text-[14px] font-[350] tracking-wider">{"Deltagare".toLocaleUpperCase()}</p>
          <p>{AngCourse.node.acfCourse.duration} dagar</p>
        </div>
        <div>
          <p className="text-[14px] font-[350] tracking-wider">
            {"Kursavgift".toLocaleUpperCase()}
          </p>
          <p>{AngCourse.node.acfCourse.duration} dagar</p>
        </div>
        <div className="mt-5 mb-8">
          <p className="text-[14px] font-[350] tracking-wider">
            {"Kommande kurstillfällen".toLocaleUpperCase()}
          </p>
          <p>{AngCourse.node.acfCourse.duration} dagar</p>
        </div>
      </div>
      <div className=" flex flex-col items-center bg-dark-green py-5 px-8 md:items-start">
        <button className="text flex flex-row items-center text-white">
          Anmäl dig till kursen
          <CardRightIcon className="ml-3" />
        </button>
      </div>
    </div>
  )
}
