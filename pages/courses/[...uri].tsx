import { GET_ALL_COURSES, GET_GLOBAL_FIELDS, GET_SINGLE_ARTICLE } from "@graphql/graphql-queries"
import client from "@graphql/urql-client"
import { GetServerSideProps } from "next"
import Image from "next/image"
import invariant from "tiny-invariant"

import { useResponsiveLG } from "@/lib/hooks/shared"
import { getImageIds, getPageLinkIds, parse } from "@/lib/utils/BlockParser"
import { getImages } from "@/lib/utils/ImageGetter"
import { getPosts } from "@/lib/utils/PageHellper"
import { ArticleShareLinks } from "@components/article-share-links"
import { Block, Contact, ReviewSlider } from "@components/blocks"
import Layout from "@components/Layout/Layout"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { PlayIcon } from "@icons/PlayIcon"
import { BaseBlock } from "@models/blocks"
import { Course, GQLGlobalFields, ImageMap, PostMap, SingleArticlePost } from "@models/common"
import { useEffect, useState } from "react"
import Courses from "@components/blocks/Courses"
import { ContactFeedBlock } from "@components/blocks/ContactFeedBlock"
import { NewsLetter } from "@components/footer/Newsletter"

export const getServerSideProps: GetServerSideProps = async context => {
  invariant(context.params)

  const { uri } = context.params

  const pageUri = Array.isArray(uri) ? uri.join("/") : uri

  const [{ data: globalFields }, { data: articleData }] = await Promise.all([
    client.query<GQLGlobalFields>(GET_GLOBAL_FIELDS).toPromise(),
    client.query<SingleArticlePost>(GET_SINGLE_ARTICLE, { id: pageUri }).toPromise(),
  ])

  invariant(globalFields)
  invariant(articleData)

  const pageData = { ...articleData.post }
  const { blocks } = parse(articleData.post.blocks)
  const imageIds = getImageIds(blocks)
  //   const postLinkIds = getPageLinkIds(blocks)

  const [images, postMap] = await Promise.all([getImages(imageIds), getPosts(blocks)])

  // COURSES
  const lala = context.query.uri
  const uniqueUri = `/course/${lala?.at(1)}/`
  const course: Course[] = []

  const data = await client.query(GET_ALL_COURSES).toPromise()

  const dodo = data.data.courses.edges.filter((element: Course) => {
    return element.node.uri === uniqueUri
  })

  course.push(dodo)

  const oneCourse = course[0]

  return {
    props: { globalFields, articleData, blocks, pageData, images, postMap, oneCourse },
  }
}

interface SingleArticleProps {
  globalFields: GQLGlobalFields
  articleData: SingleArticlePost
  blocks: BaseBlock[]
  pageData: any
  images: ImageMap
  postMap: PostMap
  oneCourse: Course[]
}

export default function SingleCourse({
  globalFields,
  articleData,
  blocks,
  pageData,
  images,
  postMap,
  oneCourse,
}: SingleArticleProps) {
  return (
    <Layout {...globalFields} pageData={pageData} images={images} postMap={postMap}>
      <section className="bg-white">
        <Courses course={oneCourse} />
        {blocks ? blocks.map(block => <Block key={block.name} block={block} />) : null}
      </section>
    </Layout>
  )
}
