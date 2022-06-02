import { useGlobalContext } from "@context/global"
import React from "react"

import { ContactItem } from "@components/contact-item"
import { ContactData } from "@models/blocks"
import { MedarbetarePost } from "@models/common"

export const Contact = ({ title, medarbetareIds }: ContactData) => {
  const { postMap } = useGlobalContext()

  return (
    <div className="bg-white px-12 pt-[100px] pb-[120px]">
      <h3 className="app-h3">{title}</h3>
      <div className="mt-[60px] grid grid-cols-2 gap-y-12 gap-x-10">
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
    </div>
  )
}
