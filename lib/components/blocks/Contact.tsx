import { useGlobalContext } from "@context/global"
import React from "react"

import { ContactItem } from "@components/contact-item"
import { ContactData } from "@models/blocks"
import { MedarbetarePost } from "@models/common"

export const Contact = ({ title, medarbetareIds }: ContactData) => {
  const { postMap } = useGlobalContext()

  return (
    <section className="section-padding bg-white pb-[120px]">
      <h3 className="app-h3 text-center lg:text-left">{title}</h3>
      <div className="mt-10 grid grid-cols-1 gap-y-8 gap-x-10 lg:mt-[60px] lg:grid-cols-2 lg:gap-y-12">
        {medarbetareIds &&
          medarbetareIds.map(postId => {
            const {
              id,
              title,
              acfMedarbetare: { position, email, phone },
              featuredImage: { node: image },
            } = postMap![postId] as MedarbetarePost

            return (
              <ContactItem
                key={id}
                image={image}
                name={title}
                position={position}
                email={email}
                phone={phone}
              />
            )
          })}
      </div>
    </section>
  )
}
