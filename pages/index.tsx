import { GET_GLOBAL_FIELDS, GET_PAGE_BLOCKS_BY_ID } from "@graphql/graphql-queries"
import client from "@graphql/urql-client"
import { GetServerSideProps } from "next"
import React from "react"
import invariant from "tiny-invariant"

import { getImageIds, getPageLinkIds, getPostLinkIds, parse } from "@/lib/utils/BlockParser"
import { getImages } from "@/lib/utils/ImageGetter"
import { getPages, getPosts } from "@/lib/utils/PageHellper"
import { Block } from "@components/blocks"
import Layout from "@components/Layout/Layout"
import { BaseBlock } from "@models/blocks"
import { GQLGlobalFields, ImageMap, PageMap, PostMap } from "@models/common"

interface IndexProps {
  globalFields: GQLGlobalFields
  blocks: BaseBlock[]
  pageMap?: PageMap
  postMap?: PostMap
  images?: ImageMap
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  const [{ data: globalFields }, { data: pageBlocks }] = await Promise.all([
    client.query(GET_GLOBAL_FIELDS).toPromise(),
    client.query(GET_PAGE_BLOCKS_BY_ID, { id: process.env.WP_PAGEID_HOME }).toPromise(),
  ])

  // ensure necessary data exist
  invariant(globalFields, "global fields is undefined")
  invariant(pageBlocks, "Page blocks are undefined")

  const { blocks } = parse(pageBlocks.page.blocks)

  const imageIds = getImageIds(blocks)
  const pageLinkIds = getPageLinkIds(blocks)
  const postLinkIds = getPostLinkIds(blocks)

  const images = await getImages(imageIds)
  const pageMap = await getPages(pageLinkIds)
  const postMap = await getPosts(postLinkIds)

  return { props: { globalFields, blocks, pageMap, postMap, images } }
}

export default function Index({ globalFields, blocks, pageMap, postMap, images }: IndexProps) {
  return (
    <Layout {...globalFields} pageMap={pageMap} postMap={postMap} images={images} isHomePage>
      {blocks ? blocks.map(block => <Block key={block.name} block={block} />) : null}
    </Layout>
  )
}
