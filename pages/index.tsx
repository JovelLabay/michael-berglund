import { GET_GLOBAL_FIELDS, GET_PAGE_BLOCKS_BY_ID } from "@graphql/graphql-queries"
import client from "@graphql/urql-client"
import { GetServerSideProps } from "next"
import React from "react"
import invariant from "tiny-invariant"

import { parse } from "@/lib/utils/BlockParser"
import { getImages } from "@/lib/utils/ImageGetter"
import { Block } from "@components/blocks"
import Layout from "@components/Layout/Layout"
import { BlocksUnion } from "@models/blocks"
import { GQLGlobalFields } from "@models/common"

interface IndexProps {
  globalFields: GQLGlobalFields
  blocks: BlocksUnion[]
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  const [{ data: globalFields }, { data: pageBlocks }] = await Promise.all([
    client.query(GET_GLOBAL_FIELDS).toPromise(),
    client.query(GET_PAGE_BLOCKS_BY_ID, { id: process.env.WP_PAGEID_HOME }).toPromise(),
  ])

  // ensure necessary data exist
  invariant(globalFields, "global fields is undefined")
  invariant(pageBlocks, "Page blocks are undefined")

  const { blocks, imagesIds } = parse(pageBlocks.page.blocks)
  const images = await getImages(imagesIds)

  return { props: { globalFields, blocks } }
}

export default function Index({ globalFields, blocks }: IndexProps) {
  const { acfGlobalFields, generalSettings } = globalFields
  return (
    <Layout acfGlobalFields={acfGlobalFields} generalSettings={generalSettings}>
      {blocks ? blocks.map(block => <Block key={block.name} block={block} />) : null}
    </Layout>
  )
}
