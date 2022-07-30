import { GetServerSideProps } from "next"
import React from "react"

import { getPageProps } from "@/lib/utils/PageHellper"
import { Block } from "@components/blocks"
import Layout from "@components/Layout/Layout"
import { PageProps } from "@models/common"

export const getServerSideProps: GetServerSideProps<PageProps> = () => getPageProps()

export default function Index({ globalFields, blocks, pageMap, postMap, images }: PageProps) {
  return (
    <Layout {...globalFields} pageMap={pageMap} postMap={postMap} images={images} isHomePage>
      {blocks ? blocks.map(block => <Block key={block.name} block={block} />) : null}
    </Layout>
  )
}
