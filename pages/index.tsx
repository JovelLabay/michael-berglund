import { GET_GLOBAL_FIELDS } from "@graphql/graphql-queries"
import client from "@graphql/urql-client"
import { GetServerSideProps } from "next"
import React from "react"
import invariant from "tiny-invariant"

import Layout from "@components/Layout/Layout"
import { GQLGlobalFields } from "@models/common"

interface IndexProps {
  globalFields: GQLGlobalFields
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  const [{ data: globalFields }] = await Promise.all([client.query(GET_GLOBAL_FIELDS).toPromise()])

  // ensure necessary data exist
  invariant(globalFields, "global fields is undefined")

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
