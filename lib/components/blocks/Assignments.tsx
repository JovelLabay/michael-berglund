import React, { useEffect, useState } from "react"

import { useResponsiveLG } from "@hooks/shared"
import AssignmentCheck from "@icons/AssignmentCheck"
import DismissIcon from "@icons/DismissIcon"
import { PlusIcon } from "@icons/PlusIcon"
import { AssignmentsData, AssignmentsDataPopUp } from "@models/blocks"

export const Assignments = ({ title, assignments }: AssignmentsData) => {
  const responsiveLG = useResponsiveLG()

  const [assignmentList, setAssignmentList] = useState<AssignmentsData["assignments"]>([])
  const [limiter, setLimiter] = useState(3)

  const [isShow, setIsShow] = useState(false)
  const [modelContent, setModelContent] = useState<AssignmentsDataPopUp>()

  useEffect(() => {
    setAssignmentList(assignments.slice(0, limiter))
  }, [limiter])

  return (
    <section className="section-padding relative bg-white pb-[120px] lg:pl-12 lg:pr-0">
      <div className=" absolute top-0 left-0 w-full">
        <hr className="bg-darker-beige" />
      </div>
      <h3 className="app-h3 mb-10 lg:mb-[60px]">{title}</h3>

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
                className="flex flex-row items-center text-dark-green leading-[20px]"
                onClick={() => {
                  setIsShow(true)
                  setModelContent(assignment)
                }}
              >
                Läs mer <PlusIcon className="ml-4 text-dark-green" />
              </button>
            </div>
          )
        })}
      </div>

      {/* BUTTON */}

      <button
        className="mx-auto mt-10 flex flex-row items-center text-dark-green"
        onClick={() => {
          setLimiter(prev => prev + 3)
        }}
      >
        { assignments.length != assignmentList.length && ( <> Läs mer <PlusIcon className="ml-4 text-dark-green" /> </>) }
      </button>

      {/* SHOW EACH ASSIGNEMNT */}
      {isShow && (
        <div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-[#0000007f] z-10">
          <div className="col-span-1 mx-5 flex h-[380px] w-[656px] flex-col items-center justify-center gap-10 bg-white md:mx-0">
            <AssignmentCheck />
            <h3 className="app-h3 mx-2 text-dark-blue">{modelContent?.title}</h3>
            <p className="mx-4 text-dark-blue md:mx-14">{modelContent?.description}</p>
            <button onClick={() => setIsShow(false)} className="flex items-center text-dark-green">
              Stäng <DismissIcon className="ml-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
