import { ArrowRight } from "@icons/ArrowRight"
import CardRightIcon from "@icons/CardRightIcon"
import { Course } from "@models/common"
import Link from "next/link"
import React, { useState } from "react"

export default function CourseDetailedCard({ AngCourse }: { AngCourse: Course }) {
  const [isOpen, setIsOpen] = useState(false)

  const handler = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="bg-light-beige md:sticky md:top-0 lg:mr-12">
      <div className="px-5 pt-10 md:px-8 md:pt-8">
        <h1 className="app-h4 mb-8">{AngCourse.node.title}</h1>
        <div>
          <p className="text-[14px]  font-[350] tracking-wider">{"Längd".toLocaleUpperCase()}</p>
          <p className="text-[16px]">{AngCourse.node.acfCourse.duration} dagar</p>
        </div>
        <div className="my-6">
          <p className="text-[14px] font-[350] tracking-wider">{"Plats".toLocaleUpperCase()}</p>
          <p className="text-[16px]">{AngCourse.node.acfCourse.place}</p>
        </div>
        <div>
          <p className="text-[14px] font-[350] tracking-wider">{"Språk".toLocaleUpperCase()}</p>
          <p className="text-[16px]">{AngCourse.node.acfCourse.language}</p>
        </div>
        <div className="my-6">
          <p className="text-[14px] font-[350] tracking-wider">{"Deltagare".toLocaleUpperCase()}</p>
          <p className="text-[16px]"> Max. {AngCourse.node.acfCourse.delegates.length} personer</p>
        </div>
        <div>
          <p className="text-[14px] font-[350] tracking-wider">
            {"Kursavgift".toLocaleUpperCase()}
          </p>
          <p className="text-[16px]">
            67 500 kr ex moms. I priset ingår kursmaterial, lunch och middagar.
          </p>
        </div>
        <div className="relative mt-6 mb-8 select-none">
          <p className="text-[14px] font-[350] tracking-wider">
            {"Kommande kurstillfällen".toLocaleUpperCase()}
          </p>
          <p className=" text-[16px]">
            {AngCourse.node.acfCourse.dates.map((dateMe, index) => {
              return (
                <div key={index}>
                  <p>{`${dateMe.startdate.toString()} - ${dateMe.enddate.toString()}`}</p>
                </div>
              )
            })}
          </p>
        </div>
        <div className="mt-6 pb-[60px] lg:pb-8">
          <p className="text-[14px] font-[350] tracking-wider">
            Några frågor?
            <button className="ml-1 text-dark-green">Kontakta oss</button>
          </p>
        </div>
      </div>
      <div className="hidden flex-col items-center bg-dark-green py-5 px-8 md:items-start lg:flex">
        <Link href={`/courseRegistration/${AngCourse.node.id}`}>
          <button className="text flex flex-row items-center text-white">
            Anmäl dig till kursen
            <CardRightIcon className="ml-3" />
          </button>
        </Link>
      </div>
      <div className="fixed bottom-0 z-10 flex w-screen justify-center bg-dark-green py-5 lg:hidden">
        <Link href={`/courseRegistration/${AngCourse.node.id}`}>
          <button className="text flex flex-row items-center text-white">
            Anmäl dig till kursen
            <CardRightIcon className="ml-3" />
          </button>
        </Link>
      </div>
    </div>
  )
}
