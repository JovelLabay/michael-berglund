import { Wysiwyg } from "@components/shared/Wysiwyg"
import { WPMedia } from "@models/common"
import React from "react"
import { Card } from "./Card"

export default function CardNews({
  id,
  featuredImage,
  title,
  excerpt,
  uri,
}: {
  id: string
  featuredImage: {
    node: WPMedia
  }
  title: string
  excerpt: string
  uri: string
}) {
  const cardBody = (
    <div>
      <div className="px-5 py-6 md:p-7 lg:p-8">
        <span className="pre-title font-[350] uppercase tracking-[0.15em] text-dark-blue">
          Aktuellt · Artiklar
        </span>
        <h4 className="app-h4 my-5">{title}</h4>
        <Wysiwyg
          content={excerpt}
          className="article-card mt-[-20px] mb-[-20px] h-[72px] overflow-y-hidden lg:h-auto lg:overflow-auto"
        />
      </div>
    </div>
  )

  return (
    <div>
      <Card
        image={featuredImage.node}
        body={cardBody}
        link={`/articles${uri}`}
        className="h-full"
      />
    </div>
  )
}
