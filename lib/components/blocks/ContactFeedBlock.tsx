import { useGlobalContext } from "@context/global"
import React from "react"

import { ProfileCard } from "@components/cards/ProfileCard"
import { ContactFeedListblock } from "@models/blocks"
import { MedarbetarePost } from "@models/common"

export const ContactFeedBlock = ({ contactLists, coverPhotoId }: ContactFeedListblock) => {
  const { images, postMap } = useGlobalContext()
  const coverPhoto = images && coverPhotoId ? images[coverPhotoId] : undefined

  console.log(coverPhoto)

  return (
    <>
      {contactLists &&
        contactLists.map(data => {
          return (
            <section className="section-padding w-full bg-white " key={data.title}>
              <div className="mx-auto max-w-[1440px] xl:px-12">
                <h3 className="app-h3 text-left ">{data.title}</h3>
                <div className="grid grid-cols-1 gap-8 pt-[60px] md:grid-cols-2 md:gap-4  lg:grid-cols-3 lg:gap-8 ">
                  {data.medarbetareIds &&
                    data.medarbetareIds.map(postId => {
                      const {
                        id,
                        title,
                        acfMedarbetare: { position, email, phone, linkedin, bio },
                        featuredImage: { node: image },
                      } = postMap![postId] as MedarbetarePost
                      return (
                        <ProfileCard
                          key={id}
                          image={image}
                          name={title}
                          position={position}
                          email={email}
                          phone={phone}
                          linkedin={linkedin}
                          bio={bio}
                          coverPhoto={coverPhoto}
                        />
                      )
                    })}
                </div>

                <div className="w-full border-b pt-[100px]"></div>
              </div>
            </section>
          )
        })}
    </>
  )
}
