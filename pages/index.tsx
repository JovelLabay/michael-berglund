import { GET_GLOBAL_FIELDS, GET_PAGE_BLOCKS_BY_ID } from "@graphql/graphql-queries"
import client from "@graphql/urql-client"
import { GetServerSideProps } from "next"
import React from "react"
import invariant from "tiny-invariant"

import { getImageIds, getPageLinkIds, parse } from "@/lib/utils/BlockParser"
import { getImages } from "@/lib/utils/ImageGetter"
import { getPages } from "@/lib/utils/PageHellper"
import { Block } from "@components/blocks"
import Layout from "@components/Layout/Layout"
import { BaseBlock } from "@models/blocks"
import { GQLGlobalFields, PageMap } from "@models/common"

interface IndexProps {
  globalFields: GQLGlobalFields
  blocks: BaseBlock[]
  pageMap?: PageMap
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

  const images = await getImages(imageIds)
  const pageMap = await getPages(pageLinkIds)

  return { props: { globalFields, blocks, pageMap } }
}

export default function Index({ globalFields, blocks, pageMap }: IndexProps) {
  return (
    <Layout {...globalFields} pageMap={pageMap}>
      {blocks ? blocks.map(block => <Block key={block.name} block={block} />) : null}
    </Layout>
  )
}
