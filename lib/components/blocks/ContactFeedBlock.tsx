import { useGlobalContext } from "@context/global"
import React from "react"

import { ProfileCard } from "@components/cards/ProfileCard"
import { ContactFeedListblock } from "@models/blocks"
import { MedarbetarePost } from "@models/common"

export const ContactFeedBlock = ({ contactLists }: ContactFeedListblock) => {
  const { postMap } = useGlobalContext()
  console.log(postMap);
  return (
    <section className="section-padding bg-white pb-[120px]"> 
      <h3 className="app-h3 text-left ">{contactLists[0].title}</h3>
      <div className="mt-10 grid grid-cols-3'">
        {contactLists[0].medarbetareIds &&
          contactLists[0].medarbetareIds.map(postId => {
            const {
              id,
              title,
              acfMedarbetare: { position, email, phone, linkedin, bio },
              featuredImage: { node: image },
            } = postMap![postId] as MedarbetarePost

            return (
              
                <ProfileCard
                  image={image}
                  name={title}
                  position={position}
                  email={email}
                  phone={phone}
                  linkedin={linkedin}
                  bio={bio}
                />
            )
          })}
      </div>
    </section>
  )
}
