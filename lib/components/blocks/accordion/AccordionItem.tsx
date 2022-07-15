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

  return (
    <div className="flex w-full flex-col justify-between bg-white ">
      <div className="flex flex-1 flex-col  pb-[60px] lg:pb-[40px]">
        {accordionGroupDataList.map((accordion: AccordionGroupData, index: any) => (
          <Disclosure key={accordion.tabTitle}>
            <>
              <Disclosure.Button
                onClick={() => setIndexOfOpenDisc(index)}
                className="mb-7 text-left text-app-h4 text-light-green lg:mb-10"
              >
                <h3
                  className={`${
                    index === indexOfOpenDisc ? "text-dark-green" : "text-light-green"
                  } app-h3 transition-colors duration-300 ease-in-out hover:text-dark-green`}
                >
                  {accordion.tabTitle}
                </h3>
              </Disclosure.Button>
              <Transition
                show={index === indexOfOpenDisc}
                enter="transition-all delay-100 duration-[800ms] ease-in-out"
                enterFrom="opacity-0 max-h-0"
                enterTo="opacity-100 max-h-[700px] lg:max-h-auto"
                leave="transition-all duration-300 ease-out "
                leaveFrom="opacity-100 max-h-[700px] lg:max-h-[400px]"
                leaveTo="opacity-0 max-h-0"
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
                      <h3 className="app-h3 mb-6 text-dark-green lg:mb-8">
                        {accordion.contentTitle}
                      </h3>
                      <Wysiwyg content={accordion.content} className="accordian" />

                      {accordion.externalUrl && (
                        <AppLink
                          href={accordion.externalUrl}
                          className="mt-5 flex items-center space-x-[10px] lg:mt-6"
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
