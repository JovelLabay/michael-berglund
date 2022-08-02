import { useGlobalContext } from "@context/global"
import React, { useState } from "react"

import { ProfileCard } from "@components/cards/ProfileCard"
import { ContactFeedListblock } from "@models/blocks"
import { MedarbetarePost } from "@models/common"
import FilterIcon from "@icons/FilterIcon"

export const ContactFeedBlock = ({
  contactLists,
  coverPhotoId,
  positionList,
}: ContactFeedListblock) => {
  const { images, postMap } = useGlobalContext()
  const coverPhoto = images && coverPhotoId ? images[coverPhotoId] : undefined

  const [filterPosition, setFilterPosition] = React.useState("Alla medarbetare")
  const [isShow, setIsShow] = useState(false)

  return (
    <>
      {contactLists &&
        contactLists.map((data, index) => {
          return (
            <section className="section-padding w-full bg-white " key={data.title}>
              <div className="mx-auto ">
                <div className="items-center justify-between md:mb-[30px] md:flex">
                  <h3 className="app-h3 text-left ">{data.title}</h3>

                  <div className="relative mt-[40px]  md:my-0 ">
                    <div className="flex min-w-[250px] flex-row md:justify-end ">
                      <button
                        className="flex items-center text-dark-green"
                        onClick={() => setIsShow(!isShow)}
                      >
                        Visar: {filterPosition} <FilterIcon className="ml-[10px]" />
                      </button>
                    </div>

                    {isShow && (
                      <div className="sh absolute top-[20px] left-0 z-50 mt-[16px] flex h-auto w-[231px] flex-col items-start justify-start rounded-[2px] bg-white shadow-shadow-cus">
                        <div className="p-[16px]">
                          {positionList.map((position, index) => {
                            return (
                              <p
                                key={index}
                                className={
                                  filterPosition === position
                                    ? "my-[8px] font-[400] text-light-green hover:cursor-pointer hover:text-dark-blue"
                                    : "my-[8px] font-[400] text-dark-green hover:cursor-pointer hover:text-dark-blue"
                                }
                                onClick={() => {
                                  setFilterPosition(position)
                                  setIsShow(false)
                                }}
                              >
                                {position}
                              </p>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-8 pt-[32px] pb-[100px] md:grid-cols-2 md:gap-4  lg:grid-cols-3 lg:gap-8 ">
                  {data.medarbetareIds &&
                    data.medarbetareIds
                      .filter(postId => {
                        const {
                          id,
                          title,
                          acfMedarbetare: { position, email, phone, linkedin, bio, category },
                          featuredImage: { node: image },
                        } = postMap![postId] as MedarbetarePost

                        if (filterPosition === "Alla medarbetare") {
                          return postId
                        }

                        if (category.includes(filterPosition)) {
                          return postId
                        }
                        return null
                      })
                      .map(lala => {
                        const {
                          id,
                          title,
                          acfMedarbetare: { position, email, phone, linkedin, bio },
                          featuredImage: { node: image },
                        } = postMap![lala] as MedarbetarePost

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

                {/* {index < contactLists.length - 1 && <div className="w-full border-b"></div>} */}
              </div>
            </section>
          )
        })}
    </>
  )
}
