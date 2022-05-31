import { createContext, useContext } from "react"

import { ACFGlobalFields, ImageMap, PageMap } from "@models/common"

export interface GlobalContextShape {
  acf: ACFGlobalFields
  pageMap?: PageMap
  images?: ImageMap
}

export const GlobalContext = createContext<GlobalContextShape>(null!)
export const useGlobalContext = () => useContext(GlobalContext)
