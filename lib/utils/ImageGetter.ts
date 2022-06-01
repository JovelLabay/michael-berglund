import client from "@graphql/urql-client"
import { gql } from "@urql/core"
import invariant from "tiny-invariant"

import { ImageMap } from "@models/common"

const GetImageDetails = gql`
  query GetImageFields($id: ID!) {
    mediaItem(id: $id, idType: DATABASE_ID) {
      sourceUrl
      altText
    }
  }
`

interface ImageDetails {
  mediaItem: {
    altText: string
    sourceUrl: string
  }
}

export const getImages = async (ids: number[]): Promise<ImageMap> => {
  const images = await Promise.all(ids.map(getImage))

  return ids.reduce((acc, id, index) => ({ ...acc, [id]: images[index] }), {})
}

const getImage = async (id: number) => {
  const { data } = await client.query<ImageDetails>(GetImageDetails, { id }).toPromise()

  invariant(data)
  return { src: data.mediaItem.sourceUrl, alt: data.mediaItem.altText }
}
