import { GET_GLOBAL_FIELDS, GET_PAGE_BLOCKS_BY_ID } from "@graphql/graphql-queries"
import client from "@graphql/urql-client"
import { GetServerSideProps } from "next"
import React from "react"
import invariant from "tiny-invariant"

import { parse } from "@/lib/utils/BlockParser"
import Layout from "@components/Layout/Layout"
import { GQLGlobalFields } from "@models/common"

interface IndexProps {
  globalFields: GQLGlobalFields
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  const [{ data: globalFields }, { data: pageBlocks }] = await Promise.all([
    client.query(GET_GLOBAL_FIELDS).toPromise(),
    client.query(GET_PAGE_BLOCKS_BY_ID, { id: process.env.WP_PAGEID_HOME }).toPromise(),
  ])

  // ensure necessary data exist
  invariant(globalFields, "global fields is undefined")

  parse(pageBlocks.page.blocks)

  return { props: { globalFields } }
}

export default function Index({ globalFields }: IndexProps) {
  const { acfGlobalFields, generalSettings } = globalFields
  return (
    <Layout acfGlobalFields={acfGlobalFields} generalSettings={generalSettings}>
      <div></div>
    </Layout>
  )
}
