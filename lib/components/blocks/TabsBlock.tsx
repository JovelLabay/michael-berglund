import { Tab, Transition } from "@headlessui/react"
import classNames from "classnames"

import { LogoDots } from "@icons/LogoDots"
import { TabsData } from "@models/blocks"

export const TabsBlock = ({ heading, tabList }: TabsData) => {
  return (
    <section className="flex min-h-[642px] flex-col items-center bg-white px-[277px] pt-[120px]">
      <h3 className="app-h3 mb-[60px]">{heading}</h3>

      <Tab.Group>
        <Tab.List className="mb-20 flex space-x-10">
          {Object.values(tabList).map(tab => (
            <Tab
              key={tab.title}
              className={({ selected }) =>
                classNames(
                  "pre-title flex flex-col items-center uppercase",
                  selected ? "opacity-100 outline-none" : "opacity-25"
                )
              }
            >
              {({ selected }) => (
                <>
                  <LogoDots fill="#1A2241" className={selected ? "visible" : "invisible"} />
                  <span className="mt-3">{tab.title}</span>
                </>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {Object.values(tabList).map((tab, index) => (
            <Tab.Panel key={tab.title} className="max-w-[806px]">
              <h4 className="app-h4 mb-6">
                {index + 1}. {tab.title}
              </h4>
              <p className="body-m">{tab.content}</p>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </section>
  )
}
