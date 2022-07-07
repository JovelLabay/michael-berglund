import { useGlobalContext } from "@context/global"
import { Disclosure, Transition } from "@headlessui/react"
import Image from "next/image"
import { useState } from "react"

import { Wysiwyg } from "@components/shared/Wysiwyg"
import { TabsData } from "@models/blocks"

export const TabsBlock = ({ heading, tabList, imageId }: TabsData) => {
  const { images } = useGlobalContext()

  const [indexOfOpenDisc, setIndexOfOpenDisc] = useState(0)

  return (
    <section className="flex w-full flex-col justify-between bg-white lg:h-[760px] lg:flex-row">
      <div className="section-padding mb-10 flex flex-1 flex-col xl:pr-[147px]">
        <h3 className="app-h3 mb-10 lg:mb-[60px]">{heading}</h3>
        {tabList.map((tab, index) => (
          <Disclosure key={tab.title}>
            <>
              <Disclosure.Button
                onClick={() => setIndexOfOpenDisc(index)}
                className="mb-7 text-left text-app-h4 text-light-green lg:mb-10 lg:text-app-h4-alt"
              >
                <span
                  className={`${
                    index === indexOfOpenDisc ? "text-dark-green" : "text-light-green"
                  } transition-colors duration-300 ease-in-out hover:text-dark-green`}
                >
                  {tab.title}
                </span>
              </Disclosure.Button>
              <Transition
                show={index === indexOfOpenDisc}
                enter="transition-all delay-300 duration-[600ms] ease-out"
                enterFrom="opacity-0 max-h-0"
                enterTo="opacity-100 max-h-[235px] lg:max-h-[200px]"
                leave="transition-all duration-150 ease-out "
                leaveFrom="opacity-100 max-h-[235px] lg:max-h-[200px]"
                leaveTo="opacity-0 max-h-0"
              >
                <Disclosure.Panel className="-mt-5 mb-7 md:w-2/3 lg:mb-10 lg:w-full">
                  <Wysiwyg className="tabs" content={tab.content} />
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
