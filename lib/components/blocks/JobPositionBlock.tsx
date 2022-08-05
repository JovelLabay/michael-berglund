import { CardLink } from "@components/cards/CardLink"
import { ArrowRight } from "@icons/ArrowRight"
import BagIcon from "@icons/BagIcon"
import { JobPositionData } from "@models/blocks"
import React from "react"

export function JobPositionBlock({
  header,
  jobMessage,
  jobs,
  JobLinkTitle,
  jobAvailability,
}: JobPositionData) {
  return (
    <div className="bg-white px-5 pt-[60px] md:px-12 md:pt-[100px]">
      <p className="pb-[40px] font-lora text-[36px] font-[400] text-dark-blue md:pb-[60px]">
        {header}
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 ">
        {jobs.filter(job => {
          return job.afcJobPositions.jobCategory === jobAvailability
        }).length === 0 ? (
          <p className="text-dark-blue">{jobMessage}</p>
        ) : (
          jobs.map(job => {
            return (
              <CardLink
                key={job.id}
                link={job.afcJobPositions.jobLink.url}
                card={
                  <div className="flex flex-col bg-light-beige p-5 md:p-8">
                    <BagIcon />
                    <h1 className="app-h4 mt-5 text-dark-blue">{job.afcJobPositions.jobTitle}</h1>
                    <p className="font-[16px] my-5 font-[325]">
                      {job.afcJobPositions.jobDescrption}
                    </p>
                    <a href={job.afcJobPositions.jobLink.url}>
                      <button className="flex flex-row items-center text-dark-green hover:text-dark-blue">
                        {JobLinkTitle}
                        <ArrowRight className="ml-3 fill-dark-green" />
                      </button>
                    </a>
                  </div>
                }
              />
            )
          })
        )}
      </div>
      <div className="mt-[60px] border-b md:mt-[100px]" />
    </div>
  )
}
