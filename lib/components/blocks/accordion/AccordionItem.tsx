import { useGlobalContext } from "@context/global"
import { Disclosure, Transition } from "@headlessui/react"
import Image from "next/image"
import { useState } from "react"

import { AccordionGroupData } from "@models/blocks"

export const AccordionItem = ({ accordionGroupDataList }: any) => {
  const { images } = useGlobalContext()

  const [indexOfOpenDisc, setIndexOfOpenDisc] = useState(0)

  const toggleDisc = (key: number) => {
    setIndexOfOpenDisc(prev => (prev !== key ? key : 0))
  }

  return (
    <section className="flex w-full flex-col justify-between bg-white ">
      <div className="flex flex-1 flex-col border-b pb-[60px] lg:pb-24 xl:pr-[147px]">
        {accordionGroupDataList.map((accordion: AccordionGroupData, index: any) => (
          <Disclosure key={accordion.tabTitle}>
            <>
              <Disclosure.Button
                onClick={() => toggleDisc(index)}
                className="mb-7 text-left text-app-h4 text-light-green"
              >
                <span
                  className={`${
                    index === indexOfOpenDisc ? "text-light-green" : "text-light-green"
                  }`}
                >
                  {accordion.tabTitle}
                </span>
              </Disclosure.Button>
              <Transition
                show={index === indexOfOpenDisc}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Disclosure.Panel className="mb-7 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-8 sm:gap-8 lg:gap-6 ">
                    <div className="relative col-span-1 mb-6 lg:col-span-3 lg:mb-0">
                      <Image
                        src={images![accordion.imageId].src}
                        alt={images![accordion.imageId].alt}
                        width={600}
                        height={300}
                        layout="responsive"
                        objectFit="cover"
                      />
                    </div>
                    <div className="col-span-5 ">
                      <h3 className="mb-6 text-app-h4  font-semibold text-dark-green lg:mb-10">
                        {accordion.contentTitle}
                      </h3>
                      <p className="mb-6 lg:mb-10">{accordion.content}</p>
                      <a
                        href={`${accordion.externalUrl}`}
                        className=" mb-1 flex font-medium text-dark-green"
                        target="_blank"
                      >
                        {" "}
                        {accordion.externalUrlLabel} &nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          </Disclosure>
        ))}
      </div>
    </section>
  )
}
