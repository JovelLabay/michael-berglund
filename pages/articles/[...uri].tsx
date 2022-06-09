import { GET_GLOBAL_FIELDS, GET_SINGLE_ARTICLE } from "@graphql/graphql-queries"
import client from "@graphql/urql-client"
import { GetServerSideProps } from "next"
import Image from "next/image"
import invariant from "tiny-invariant"

import { getImageIds, getPageLinkIds, parse } from "@/lib/utils/BlockParser"
import { getImages } from "@/lib/utils/ImageGetter"
import { getPageProps, getPosts } from "@/lib/utils/PageHellper"
import { Block } from "@components/blocks"
import { BasicHero } from "@components/blocks/hero/BasicHero"
import Layout from "@components/Layout/Layout"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { BaseBlock } from "@models/blocks"
import { GQLGlobalFields, ImageMap, PostMap, SingleArticlePost } from "@models/common"

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

  return {
    props: { globalFields, articleData, blocks, pageData, images, postMap },
  }
}

interface SingleArticleProps {
  globalFields: GQLGlobalFields
  articleData: SingleArticlePost
  blocks: BaseBlock[]
  pageData: any
  images: ImageMap
  postMap: PostMap
}

export default function SingleArticle({
  globalFields,
  articleData,
  blocks,
  pageData,
  images,
  postMap,
}: SingleArticleProps) {
  const { title, date, content, featuredImage } = articleData.post

  return (
    <Layout {...globalFields} pageData={pageData} images={images} postMap={postMap}>
      <section className="relative bg-white pt-[200px]">
        {/* <div className="absolute w-full">
          <div className="relative inset-0 z-0">
            <Image src={featuredImage.node.mediaItemUrl} alt="" layout="fill" objectFit="cover" />
          </div>
        </div> */}
        <h1 className="app-h1 mt-[200px]">{title}</h1>
        <Wysiwyg className="bg-white" content={content} />
        <p>Dela links</p>
        {blocks ? blocks.map(block => <Block key={block.name} block={block} />) : null}
      </section>
    </Layout>
  )
}
