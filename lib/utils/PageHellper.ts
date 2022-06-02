import {
    GET_GLOBAL_FIELDS, GET_PAGE_BLOCKS_BY_URI, GET_PAGE_DATA_BY_ID, GET_POST_DATA_BY_ID
} from "@graphql/graphql-queries"
import client from "@graphql/urql-client"
import invariant from "tiny-invariant"

import { getImageIds, getPageLinkIds, getPostLinkIds, parse } from "@/lib/utils/BlockParser"
import { getImages } from "@/lib/utils/ImageGetter"
import { PageMap, PostMap } from "@models/common"

export const getPageProps = async (uri = "/") => {
  const [{ data: globalFields }, { data: pageBlocks }] = await Promise.all([
    client.query(GET_GLOBAL_FIELDS).toPromise(),
    client.query(GET_PAGE_BLOCKS_BY_URI, { id: uri }).toPromise(),
  ])

  // ensure necessary data exist
  invariant(globalFields, "global fields is undefined")
  invariant(pageBlocks, "Page blocks are undefined")

  const pageData = {...pageBlocks.page}
  const { blocks } = parse(pageBlocks.page.blocks)

  const imageIds = getImageIds(blocks)
  const pageLinkIds = getPageLinkIds(blocks)
  const postLinkIds = getPostLinkIds(blocks)

  const [images, pageMap, postMap] = await Promise.all([getImages(imageIds), getPages(pageLinkIds), getPosts(postLinkIds)])

  return { props: { globalFields, blocks, pageMap, postMap, images, pageData } }
}

const getPages = async (ids: number[]): Promise<PageMap> => {
  const pageDataList = await Promise.all(
    ids.map(async id => client.query(GET_PAGE_DATA_BY_ID, { id }).toPromise())
  )

  return pageDataList
    .map(({ data: { page } }) => page)
    .reduce((acc, page) => ({ ...acc, [page.pageId]: page }), {})
}

const getPosts = async (ids: number[]): Promise<PostMap> => {
  const postDataList = await Promise.all(
    ids.map(async id => client.query(GET_POST_DATA_BY_ID, { id }).toPromise())
  )

  return postDataList
    .map(({ data: { post } }) => post)
    .reduce((acc, post) => ({ ...acc, [post.postId]: post }), {})
}
