import client from "@graphql/urql-client"
import { gql } from "@urql/core"
import invariant from "tiny-invariant"

import { FileMap } from "@models/common"

const GetFileDetails = gql`
  query GetFileFields($id: ID!) {
    mediaItem(id: $id, idType: DATABASE_ID) {
      mediaItemUrl
    }
  }
`

interface FileDetails {
  mediaItem: {
    mediaItemUrl: string
  }
}

export const getFiles = async (ids: number[]): Promise<FileMap> => {
  const files = await Promise.all(ids.map(getFile))

  return ids.reduce((acc, id, index) => ({ ...acc, [id]: files[index] }), {})
}

const getFile = async (id: number) => {
  const { data } = await client.query<FileDetails>(GetFileDetails, { id }).toPromise()

  invariant(data)

  return data.mediaItem.mediaItemUrl
}
