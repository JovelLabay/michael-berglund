import { useGlobalContext } from "@context/global"
import React, { useMemo } from "react"

import { Card } from "@components/cards"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ArrowRight } from "@icons/ArrowRight"
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
            <h5 className="app-h4">{title}</h5>
            <Wysiwyg content={excerpt} className="prose-p:body-m prose my-5" />
            <div className="link-m flex items-center space-x-[10px] text-dark-green">
              <span className="font-[350]">Read more</span>
              <ArrowRight className="fill-dark-green" />
            </div>
          </div>
        )
        return (
          <Card
            key={id}
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 ">{cards}</div>
    </section>
  )
}
