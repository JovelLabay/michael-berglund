import { Tab, Transition } from "@headlessui/react"
import classNames from "classnames"
import { useState } from "react"

import { Wysiwyg } from "@components/shared/Wysiwyg"
import { useMediaQuery } from "@hooks/shared"
import { PlusIcon } from "@icons/PlusIcon"
import { TableDescData } from "@models/blocks"

export const TableDescBlock = ({ title, tableLists }: TableDescData) => {
  const isMobile = useMediaQuery(`(max-width: 640px)`)
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
    <section className="section-padding bg-white">
      <h3 className="app-h3 mb-10 lg:mb-[60px]">{title}</h3>
      <div className="hidden grid-cols-1 gap-6 sm:grid sm:grid-cols-8 sm:gap-8">
        <div className="col-span-2"></div>
        <div className="col-span-3 mb-[60px]">
          <TableHeaderDisplay title="INDIVIDUAL" />
        </div>
        <div className="col-span-3 mb-[60px]">
          <TableHeaderDisplay title="GROUP" />
        </div>
      </div>
      <div className="text-center">
        <div className="inline-flex sm:hidden">
          {tabList &&
            tabList.map(data => {
              return (
                <div key={data.label} className="mr-[32px] mb-[40px] cursor-pointer" onClick={() => handleClick(data.label)}>
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
            <div key={data.services} className="grid grid-cols-1 gap-6 sm:grid-cols-8 sm:gap-8">
              <div className="hidden sm:col-span-2 sm:block">
                <TableHeaderDisplay title={data.services} />{" "}
              </div>
              {!isMobile ? (
                <>
                  <div className="sm:col-span-3">
                    <TableDescSubDisplay
                      title={data.individual.title}
                      services={data.services}
                      description={data.individual.description}
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <TableDescSubDisplay
                      title={data.group.title}
                      services={data.services}
                      description={data.group.description}
                    />
                  </div>
                </>
              ) : tabList.find(item => item.active)?.label == "INDIVIDUAL" ? (
                <>
                  <div>
                    <TableDescSubDisplay
                      title={data.individual.title}
                      services={data.services}
                      description={data.individual.description}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <TableDescSubDisplay
                      title={data.group.title}
                      services={data.services}
                      description={data.group.description}
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

export const TableDescSubDisplay = ({ description, title, services }: any) => {
  return (
    <div>
      <span>
        <TableHeaderDisplay title={services} className="mb-[20px] text-dark-beige sm:hidden" />
      </span>
      <h5 className="app-h4 mb-[24px]">{title}</h5>
      <Wysiwyg
        content={description}
        className="mb-[24px] font-gotham text-[16px] font-[325] leading-[28px] sm:text-[20px]"
      />
      <div className=" link-m  mb-[60px] flex items-center space-x-[10px] font-gotham text-dark-green">
        <span className="font-[350]">Read more</span>
        <PlusIcon className="fill-dark-green" />
      </div>
    </div>
  )
}

export const TableHeaderDisplay = ({ title, className }: any) => {
  return (
    <div className={classNames(className, "font-gotham text-[14px] font-[350] leading-[28px] tracking-[.15em]"  )}>
      {title}
    </div>
  )
}
