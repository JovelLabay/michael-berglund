import { useGlobalContext } from "@context/global"
import { Disclosure, Transition } from "@headlessui/react"
import classNames from "classnames"
import Image from "next/image"
import { useState } from "react"

import { TabsData } from "@models/blocks"

export const TabsBlock = ({ heading, tabList, imageId }: TabsData) => {
  const { images } = useGlobalContext()

  const [indexOfOpenDisc, setIndexOfOpenDisc] = useState(0)

  const toggleDisc = (key: number) => {
    setIndexOfOpenDisc(prev => (prev !== key ? key : 0))
  }

  return (
    <section className="flex w-full flex-col justify-between bg-white lg:h-[760px] lg:flex-row">
      <div className="section-padding mb-10 flex flex-1 flex-col xl:pr-[147px]">
        <h3 className="app-h3 mb-10 lg:mb-[60px]">{heading}</h3>
        {tabList.map((tab, index) => (
          <Disclosure key={tab.title}>
            <>
              <Disclosure.Button
                onClick={() => toggleDisc(index)}
                className="mb-7 text-left text-app-h4 text-light-green"
              >
                <span
                  className={`${
                    index === indexOfOpenDisc ? "text-dark-green" : "text-light-green"
                  }`}
                >
                  {tab.title}
                </span>
              </Disclosure.Button>
              <Transition show={index === indexOfOpenDisc}>
                <Disclosure.Panel className="mb-7 md:w-2/3 lg:w-full">
                  <span>{tab.content}</span>
                </Disclosure.Panel>
              </Transition>
            </>
          </Disclosure>
        ))}
      </div>
      <div className="relative aspect-square h-[375px] w-full md:h-[500px] lg:h-full lg:w-1/2">
        <Image
          src={images![imageId].src}
          alt={images![imageId].alt}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </section>
  )
}
