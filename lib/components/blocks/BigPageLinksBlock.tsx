import { useGlobalContext } from "@context/global"
import React, { useMemo } from "react"

import { Card } from "@components/cards"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { PostData } from "@models/blocks"
import { Post } from "@models/common"

export const BigPageLinks = ({ title, postIds }: PostData) => {
  const { postMap } = useGlobalContext()
  const cards = useMemo(
    () =>
      postIds.map(cardId => {
        const { id, featuredImage, title, excerpt, uri } = postMap![cardId] as Post
        const cardBody = (
          <div className="p-8">
            <h4 className="app-h4 my-5">{title}</h4>
            <Wysiwyg content={excerpt} />
            <div className="flex dark-green pt-2.5 font-medium">Read more &nbsp; <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></div>
          </div>
        )
        return (
            <Card
              key= {id}
              image={featuredImage.node}
              body={cardBody}
              link={`/post${uri}`}
              className="h-full grid-rows-1"
            />
        )
      }),
    [postIds, postMap]
  )

  return (
    <section className="bg-white px-12 pt-[100px] pb-[120px]">
      <h3 className="app-h3 mb-[60px]">{title}</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 ">
          { cards }
        </div>
    </section>
  )
}
