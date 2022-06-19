import { AccordionListsData } from "@models/blocks"

import { AccordionItem } from "./AccordionItem"

export const AccordionListBlock = ({ accordionLists }: AccordionListsData) => {
  return (
    <section className="w-full bg-white px-5 pb-[120px]  lg:px-12">
      {accordionLists.map((accordion, index) => (
        <div key={accordion.groupTitle + index} className="w-full pt-[60px]">
          <h3 className="app-h3 mb-10 lg:mb-[60px]">{accordion.groupTitle}</h3>
          <AccordionItem accordionGroupDataList={accordion.accordionLists}></AccordionItem>
        </div>
      ))}
    </section>
  )
}
