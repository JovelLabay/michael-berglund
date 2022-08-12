import { GET_GLOBAL_FIELDS, GET_SINGLE_JOB } from "@graphql/graphql-queries"
import client from "@graphql/urql-client"
import { GetServerSideProps } from "next"
import React from "react"
import invariant from "tiny-invariant"

import { parse } from "@/lib/utils/BlockParser"
import { Block } from "@components/blocks"
import Layout from "@components/Layout/Layout"
import { BaseBlock } from "@models/blocks"
import { GQLGlobalFields, ImageMap, PostMap, SingleJob } from "@models/common"

export const getServerSideProps: GetServerSideProps = async context => {
  invariant(context.params)

  const { uri } = context.params

  const pageUri = Array.isArray(uri) ? uri.join("/") : uri

  const [{ data: globalFields }, { data: jobData }] = await Promise.all([
    client.query<GQLGlobalFields>(GET_GLOBAL_FIELDS).toPromise(),
    client.query<SingleJob>(GET_SINGLE_JOB, { id: pageUri }).toPromise(),
  ])

  invariant(globalFields)
  invariant(jobData)

  const { blocks } = parse(jobData.jobPosition.blocks)

  return {
    props: { globalFields, blocks },
  }
}

interface SingleJobProps {
  globalFields: GQLGlobalFields
  blocks: BaseBlock[]
}

const SingleJob = ({ globalFields, blocks }: SingleJobProps) => {
  return (
    <Layout {...globalFields}>
      <div className="h-[96px] bg-dark-green"></div>
      {blocks ? blocks.map(block => <Block key={block.name} block={block} />) : null}
    </Layout>
  )
}

export default SingleJob
