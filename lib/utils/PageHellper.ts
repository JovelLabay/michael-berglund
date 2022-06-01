import { GET_PAGE_DATA_BY_ID, GET_POST_DATA_BY_ID } from "@graphql/graphql-queries"
import client from "@graphql/urql-client"

import { PageMap, PostMap } from "@models/common"

export const getPages = async (ids: number[]): Promise<PageMap> => {
  const pageDataList = await Promise.all(
    ids.map(async id => client.query(GET_PAGE_DATA_BY_ID, { id }).toPromise())
  )

  return pageDataList
    .map(({ data: { page } }) => page)
    .reduce((acc, page) => ({ ...acc, [page.pageId]: page }), {})
}

export const getPosts = async (ids: number[]): Promise<PostMap> => {
  const postDataList = await Promise.all(
    ids.map(async id => client.query(GET_POST_DATA_BY_ID, { id }).toPromise())
  )

  return postDataList
    .map(({ data: { post } }) => post)
    .reduce((acc, post) => ({ ...acc, [post.postId]: post }), {})
}
