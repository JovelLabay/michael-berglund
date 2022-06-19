import { useGlobalContext } from "@context/global"
import Image from "next/image"
import { useState } from "react"

import { PressCard } from "@components/cards/PressCard"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { PlusIcon } from "@icons/PlusIcon"
import { PressFeedData } from "@models/blocks"

// import { InfoIconData } from "@models/blocks"

export const PressFeedBlock = ({ title, pressList }: PressFeedData) => {

  const pressCardList = pressList.map(({  title, details,url, titleId }) => { 
    const cardBody = (
      <div>
        <h4 className="app-h4">{title}</h4>
        <Wysiwyg content={details} className="my-5" />
      </div>
    );
    return (
      <PressCard 
        key={titleId}
        link={url}
        body={cardBody}
      />
    )
  })

  return (
    <section className="bg-white  pb-[120px] section-padding">
         <h3 className="app-h3 mb-[60px] ">{title}</h3>
         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">{pressCardList}</div>
         <div className="w-full text-center  mt-[62px] text-dark-green block font-medium ">
         <div className=" inline-flex">Load more &nbsp; <PlusIcon className="relative top-1 font-normal"/></div>
         </div>
    </section>
  )
}
