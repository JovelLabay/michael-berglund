import { useGlobalContext } from "@context/global"
import React from "react"

import { Card } from "@components/cards"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { RelatedArticleData } from "@models/blocks"

export const RelatedArticles = ({ title, postIds }: RelatedArticleData) => {
  const { postMap } = useGlobalContext()
  return (
    <div className="bg-white px-12 pt-[100px] pb-[120px]">
      <h3 className="app-h3 mb-[60px]">{title}</h3>
      <div className="flex space-x-8">
        {postIds &&
          postIds.map(cardId => {
            const { id, featuredImage, title, excerpt, uri } = postMap![cardId]

            const cardBody = (
              <div className="p-8">
                <span className="pre-title font-[350] uppercase tracking-[0.15em]">
                  Aktuellt · Artiklar
                </span>
                <h4 className="app-h4 my-5">{title}</h4>
                <Wysiwyg content={excerpt} />
              </div>
            )

            return (
              <Card
                key={id}
                image={featuredImage.node}
                body={cardBody}
                link={`/post${uri}`}
                className="h-full w-[541px]"
              />
            )
          })}
      </div>
    </div>
  )
}
