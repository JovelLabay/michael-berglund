import { GlobalContext } from "@context/global"
import classNames from "classnames"
import { AnimatePresence } from "framer-motion"
import { useRouter } from "next/router"
import { ReactNode, useCallback, useEffect, useState } from "react"

import { Footer } from "@components/footer"
import { Header, MenuContent } from "@components/menu"
import {
    ACFGeneralSettings, ACFGlobalFields, FileMap, ImageMap, Page, PageMap, PostMap
} from "@models/common"

export interface LayoutProps {
  children: ReactNode
  acfGlobalFields: ACFGlobalFields
  generalSettings: ACFGeneralSettings
  pageData?: Page
  pageMap?: PageMap
  postMap?: PostMap
  images?: ImageMap
  isHomePage?: boolean
  files?: FileMap
}

export default function Layout({
  children,
  acfGlobalFields,
  generalSettings,
  pageData,
  pageMap,
  postMap,
  images,
  isHomePage,
  files,
}: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(open => !open)
  }, [])

  useEffect(() => {
    const handleStop = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    router.events.on("routeChangeComplete", handleStop)
    router.events.on("routeChangeError", handleStop)

    return () => {
      // router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeError", handleStop)
    }
  }, [router, isMenuOpen])

  return (
    <GlobalContext.Provider
      value={{
        acf: acfGlobalFields,
        pageData: pageData,
        pageMap: pageMap,
        postMap: postMap,
        images: images,
        files: files,
      }}
    >
      <div
        className={classNames("relative h-screen w-screen bg-dark-blue", {
          "overflow-hidden": isMenuOpen,
        })}
      >
        <Header isHomePage={isHomePage} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <AnimatePresence>{isMenuOpen && <MenuContent />}</AnimatePresence>
        <div>{children}</div>
        <Footer />
      </div>
    </GlobalContext.Provider>
  )
}
