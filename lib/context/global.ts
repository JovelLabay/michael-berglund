import { createContext, useContext } from "react"

import { ACFGlobalFields, PageMap } from "@models/common"

export interface GlobalContextShape {
  acf: ACFGlobalFields
  pageMap?: PageMap
}

export const GlobalContext = createContext<GlobalContextShape>(null!)
export const useGlobalContext = () => useContext(GlobalContext)
