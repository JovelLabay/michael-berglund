import classNames from "classnames"
import { useState } from "react"

import { Wysiwyg } from "@components/shared/Wysiwyg"
import { useMediaQuery } from "@hooks/shared"
import { TableDescData } from "@models/blocks"

export const TableDescBlock = ({ title, tableLists }: TableDescData) => {
  const isMobile = useMediaQuery(`(max-width: 767px)`)
  const [tabList, setTabList] = useState([
    {
      label: "INDIVIDUAL",
      active: true,
    },
    {
      label: "GROUP",
      active: false,
    },
  ])

  const handleClick = (label: any) => {
    setTabList(
      tabList.map(data => {
        data.active = label == data.label
        return data
      })
    )
  }

  return (
    <section className="section-padding bg-white pb-[60px]">
      <h3 className="app-h3 mb-10 lg:mb-[60px]">{title}</h3>
      <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-12 md:gap-8">
        <div className="col-span-2"></div>
        <div className="col-span-5 mb-[60px]  md:pl-[10px] lg:pl-0">
          <TableHeaderDisplay title="INDIVIDUAL" />
        </div>
        <div className="col-span-5 mb-[60px]">
          <TableHeaderDisplay title="GROUP" />
        </div>
      </div>
      <div className="text-center">
        <div className="inline-flex md:hidden">
          {tabList &&
            tabList.map(data => {
              return (
                <div
                  key={data.label}
                  className="mr-[32px] mb-[40px] cursor-pointer"
                  onClick={() => handleClick(data.label)}
                >
                  <TableHeaderDisplay
                    title={data.label}
                    className={classNames(data.active ? "" : "opacity-25")}
                  />
                </div>
              )
            })}
        </div>
      </div>
      {tableLists &&
        tableLists.map(data => {
          return (
            <div
              key={data.services}
              className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 lg:mb-[60px]"
            >
              <div className="mr-10 hidden md:col-span-2 md:block">
                <TableHeaderDisplay title={data.services} />{" "}
              </div>
              {!isMobile ? (
                <>
                  <div className="md:col-span-5 md:pl-[10px] lg:pl-0">
                    <TableDescSubDisplay
                      services={data.services}
                      description={data.individual.content}
                    />
                  </div>
                  <div className="md:col-span-5">
                    <TableDescSubDisplay
                      services={data.services}
                      description={data.group.content}
                    />
                  </div>
                </>
              ) : tabList.find(item => item.active)?.label == "INDIVIDUAL" ? (
                <>
                  <div>
                    <TableDescSubDisplay
                      services={data.services}
                      description={data.individual.content}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <TableDescSubDisplay
                      services={data.services}
                      description={data.group.content}
                    />
                  </div>
                </>
              )}
            </div>
          )
        })}
    </section>
  )
}

export const TableDescSubDisplay = ({ description, services }: any) => {
  return (
    <div>
      <span>
        <TableHeaderDisplay title={services} className="mb-8 md:mb-[20px] text-dark-beige md:hidden" />
      </span>
      <Wysiwyg content={description} className="table" />
    </div>
  )
}

export const TableHeaderDisplay = ({ title, className }: any) => {
  return (
    <div
      className={classNames(
        className,
        "pre-title font-[350] uppercase leading-[28px] tracking-[0.15em]"
      )}
    >
      {title}
    </div>
  )
}
