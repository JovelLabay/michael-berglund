import { GetServerSideProps } from "next"
import React from "react"
import invariant from "tiny-invariant"

import { getPageProps } from "@/lib/utils/PageHellper"
import { Block } from "@components/blocks"
import Layout from "@components/Layout/Layout"
import { PageProps } from "@models/common"

export const getServerSideProps: GetServerSideProps<PageProps> = context => {
  invariant(context.params)
  const { uri } = context.params

  const pageUri = Array.isArray(uri) ? uri.join("/") : uri

  return getPageProps(pageUri)
}

export default function OtherPages({ globalFields, blocks, pageMap, postMap, images, pageData }: PageProps) {
  return (
    <Layout {...globalFields} pageData={pageData} pageMap={pageMap} postMap={postMap} images={images}>
      {blocks ? blocks.map(block => <Block key={block.name} block={block} />) : null}
    </Layout>
  )
}
