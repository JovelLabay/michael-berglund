import { useGlobalContext } from "@context/global"
import React from "react"

import { ProfileCard } from "@components/cards/ProfileCard"
import { ContactFeedListblock } from "@models/blocks"
import { MedarbetarePost } from "@models/common"

export const ContactFeedBlock = ({ contactLists, coverPhotoId }: ContactFeedListblock) => {
  const { images, postMap } = useGlobalContext();
  const coverPhoto = images && coverPhotoId ? images[coverPhotoId] : undefined;
  
  return <>{
      contactLists && contactLists.map(data => {
      return (<section className="section-padding bg-white w-full " key={data.title}> 
                <h3 className="app-h3 text-left ">{data.title}</h3>
                <div className="grid grid-cols-1 pt-[40px] md:grid-cols-3 md:gap-4  lg:grid-cols-4 lg:gap-4 md:pt-[100px]">
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
                
                <div className="pt-[100px] border-b w-full"></div>
          </section>)
        })
   
      }</>
}
