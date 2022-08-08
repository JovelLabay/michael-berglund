import React from "react"
import { GetServerSideProps } from "next"

import client from "@graphql/urql-client"
import { GET_ALL_COURSES } from "@graphql/graphql-queries"
import { Course } from "@models/common"
import { ArrowDown } from "@icons/ArrowDown"
import ChevronRightIcon from "@icons/ChevronRightIcon"
import Link from "next/link"
import { AppLink } from "@components/shared/AppLink"
import { Contact } from "@components/blocks"
import { NewsLetter } from "@components/footer/Newsletter"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import CourseDetailedCard from "@components/cards/CourseDetailedCard"
import { MainLogo } from "@logos/MainLogo"

export default function CourseRegistration({ course }: { course: Course[] }) {
  return (
    <div className="min-h-screen bg-light-beige">
      <div className="flex h-[88px] flex-row items-center justify-between bg-dark-blue px-[20px] md:px-[60px]">
        <div>fgdfg</div>
        <MainLogo className="w-[78px] md:w-auto" />
        <div>dfgdf</div>
      </div>
      <div className="grid grid-cols-1 pt-36 lg:grid-cols-3">
        {course.map((AngCourse, index) => {
          return (
            <>
              <div key={index} className="px-[20px] md:col-span-2 md:pl-12 xl:mr-60"></div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const lala = context.query.id

  const course: Course[] = []

  const data = await client.query(GET_ALL_COURSES).toPromise()

  const dodo = data.data.courses.edges.filter((element: Course) => {
    return element.node.id === lala
  })

  course.push(dodo)

  return {
    props: {
      course: course[0],
    },
  }
}
