import { GET_GLOBAL_FIELDS, GET_SINGLE_ARTICLE } from "@graphql/graphql-queries"
import client from "@graphql/urql-client"
import { GetServerSideProps } from "next"
import Image from "next/image"
import invariant from "tiny-invariant"

import { useResponsiveLG } from "@/lib/hooks/shared"
import { getImageIds, getPageLinkIds, parse } from "@/lib/utils/BlockParser"
import { getImages } from "@/lib/utils/ImageGetter"
import { getPosts } from "@/lib/utils/PageHellper"
import { ArticleShareLinks } from "@components/article-share-links"
import { Block } from "@components/blocks"
import Layout from "@components/Layout/Layout"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { PlayIcon } from "@icons/PlayIcon"
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
  const { linkTitle, mediaFile, coverImage } = articleData.post.acfPostSingleArticle

  const responsiveLG = useResponsiveLG()

  const publishedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Layout {...globalFields} pageData={pageData} images={images} postMap={postMap}>
      <section className="bg-white">
        <div className="inset-0 h-[440px] bg-hero-pattern"></div>
        <div className="section-padding flex">
          <div className="mr-0 w-full lg:mr-[100px] lg:w-1/2 xl:mr-[147px]">
            <div className="mb-10 flex flex-col">
              <h1 className="lg:app-h2 mb-6 font-lora text-app-h3 md:max-w-[656px] lg:mb-10">
                {title}
              </h1>
              <span className="pre-title font-[350] uppercase tracking-[0.15em] text-dark-beige">
                published {publishedDate}
              </span>
            </div>
            <Wysiwyg className="article" content={content} />
            <ArticleShareLinks />
          </div>
          {responsiveLG && (
            <div className="w-1/2">
              <div className="aspect-w-16 aspect-h-9 relative h-[300px] w-full">
                <Image
                  src={coverImage.mediaItemUrl}
                  alt={coverImage.altText}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex w-full items-center bg-dark-green">
                <a
                  href={mediaFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center py-5 px-8 text-link-m text-white"
                >
                  {linkTitle} <PlayIcon className="ml-[10px]" />
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="mt-[60px] h-[1px] w-full bg-white lg:mt-[125px]">
          <hr className="mx-auto w-[95%] bg-normal-beige" />
        </div>
        {blocks ? blocks.map(block => <Block key={block.name} block={block} />) : null}
      </section>
    </Layout>
  )
}
