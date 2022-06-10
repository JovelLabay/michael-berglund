import { AccordionListsData } from "@models/blocks"

import { AccordionItem } from "./AccordionItem"

export const AccordionListBlock = ({ accordionLists }: AccordionListsData) => {
  return (
     <section className="section-padding  w-full bg-white  pb-[120px]">
      {accordionLists.map((accordion, index) => (
        <div key={accordion.groupTitle + index} className='w-full pb-20 '>
            <h3 className="app-h3 mb-10 lg:mb-[60px]">{accordion.groupTitle}</h3>
            <AccordionItem accordionGroupDataList={accordion.accordionLists}></AccordionItem>
        </div>
      ))}
    </section>
  )
}
