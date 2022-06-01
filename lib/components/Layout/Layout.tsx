import { GlobalContext } from "@context/global"
import classNames from "classnames"
import { AnimatePresence } from "framer-motion"
import { ReactNode, useCallback, useState } from "react"

import { Footer } from "@components/footer"
import { Header, MenuContent } from "@components/menu"
import { ACFGeneralSettings, ACFGlobalFields, ImageMap, PageMap, PostMap } from "@models/common"

export interface LayoutProps {
  children: ReactNode
  acfGlobalFields: ACFGlobalFields
  generalSettings: ACFGeneralSettings
  pageMap?: PageMap
  postMap?: PostMap
  images?: ImageMap
}

export default function Layout({
  children,
  acfGlobalFields,
  generalSettings,
  pageMap,
  postMap,
  images,
}: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(open => !open)
  }, [])

  return (
    <GlobalContext.Provider
      value={{ acf: acfGlobalFields, pageMap: pageMap, postMap: postMap, images: images }}
    >
      <div
        className={classNames("relative h-screen w-screen bg-dark-blue", {
          "overflow-hidden": isMenuOpen,
        })}
      >
        <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}></Header>
        <AnimatePresence>{isMenuOpen && <MenuContent />}</AnimatePresence>
        <div>{children}</div>
        <Footer />
      </div>
    </GlobalContext.Provider>
  )
}
