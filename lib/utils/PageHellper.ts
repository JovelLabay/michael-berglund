import { GET_PAGE_DATA_BY_ID } from "@graphql/graphql-queries"
import client from "@graphql/urql-client"

import { Page } from "@models/common"

export const getPages = async (ids: string[]): Promise<Record<string, Page>> => {
  const pageDataList = await Promise.all(
    ids.map(async id => client.query(GET_PAGE_DATA_BY_ID, { id }).toPromise())
  )

  return pageDataList
    .map(({ data: { page } }) => page)
    .reduce((acc, page) => ({ ...acc, [page.pageId]: page }), {})
}
