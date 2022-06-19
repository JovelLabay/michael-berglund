import { useGlobalContext } from "@context/global"
import { Disclosure, Transition } from "@headlessui/react"
import Image from "next/image"
import { useState } from "react"

import { AppLink } from "@components/shared/AppLink"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ExternalUrlIcon } from "@icons/ExternalUrlIcon"
import { AccordionGroupData } from "@models/blocks"

export const AccordionItem = ({ accordionGroupDataList }: any) => {
  const { images } = useGlobalContext()

  const [indexOfOpenDisc, setIndexOfOpenDisc] = useState(0)

  const toggleDisc = (key: number) => {
    setIndexOfOpenDisc(prev => (prev !== key ? key : 0))
  }

  return (
    <div className="flex w-full flex-col justify-between bg-white ">
      <div className="flex flex-1 flex-col  pb-[60px] lg:pb-[40px]">
        {accordionGroupDataList.map((accordion: AccordionGroupData, index: any) => (
          <Disclosure key={accordion.tabTitle}>
            <>
              <Disclosure.Button
                onClick={() => toggleDisc(index)}
                className="mb-10 text-left text-app-h4 text-light-green"
              >
                <h3 className="app-h3 font-[350] text-light-green">{accordion.tabTitle}</h3>
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
                  <div className="flex flex-col items-center md:flex-row">
                    <div className="relative w-full shrink-0 md:w-[32%]">
                      <div className="aspect-w-[335] aspect-h-[188] md:aspect-w-[427] md:aspect-h-[342]">
                        <Image
                          src={images![accordion.imageId].src}
                          alt={images![accordion.imageId].alt}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </div>
                    <div className="mt-6 w-full md:mt-0 md:ml-8">
                      <h3 className="app-h3 mb-8 text-dark-green">{accordion.contentTitle}</h3>
                      <Wysiwyg content={accordion.content} />

                      {accordion.externalUrl && (
                        <AppLink
                          href={accordion.externalUrl}
                          className="mt-6 flex items-center space-x-[10px]"
                        >
                          <span className="link-m font-[350] text-dark-green">
                            {accordion.externalUrlLabel}
                          </span>
                          <ExternalUrlIcon />
                        </AppLink>
                      )}
                    </div>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          </Disclosure>
        ))}
      </div>
    </div>
  )
}
