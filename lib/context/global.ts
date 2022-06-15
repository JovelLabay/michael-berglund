import { createContext, useContext } from "react"

import { ACFGlobalFields, FileMap, ImageMap, Page, PageMap, PostMap } from "@models/common"

export interface GlobalContextShape {
  acf: ACFGlobalFields
  pageData?: Page
  pageMap?: PageMap
  postMap?: PostMap
  images?: ImageMap
  files?: FileMap
}

export const GlobalContext = createContext<GlobalContextShape>(null!)
export const useGlobalContext = () => useContext(GlobalContext)
