import { createContext, useContext } from "react"

import { ACFGlobalFields, ImageMap, Page, PageMap, PostMap } from "@models/common"

export interface GlobalContextShape {
  acf: ACFGlobalFields
  pageData?: Page
  pageMap?: PageMap
  postMap?: PostMap
  images?: ImageMap
}

export const GlobalContext = createContext<GlobalContextShape>(null!)
export const useGlobalContext = () => useContext(GlobalContext)
