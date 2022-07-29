import { GlobalContext } from "@context/global"
import classNames from "classnames"
import { AnimatePresence } from "framer-motion"
import { useRouter } from "next/router"
import { ReactNode, useCallback, useEffect, useState } from "react"

import { Footer } from "@components/footer"
import { Header, MenuContent } from "@components/menu"
import {
  ACFGeneralSettings,
  ACFGlobalFields,
  FileMap,
  ImageMap,
  Page,
  PageMap,
  PostMap,
} from "@models/common"
import { BaseBlock } from "@models/blocks"

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
  blocks: BaseBlock[]
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
  blocks,
}: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuShow, setMenuShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

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

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setMenuShow(false)
      } else {
        setMenuShow(true)
      }

      setLastScrollY(window.scrollY)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)

      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

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
        <AnimatePresence>{isMenuOpen && <MenuContent blocks={blocks} />}</AnimatePresence>
        <div>{children}</div>
        <Footer />
        {menuShow && (
          <div className="fixed top-0 right-0 z-30 h-auto w-full">
            <Header
              isHomePage={isHomePage}
              isMenuOpen={isMenuOpen}
              toggleMenu={toggleMenu}
              lastScrollY={lastScrollY}
            />
          </div>
        )}
      </div>
    </GlobalContext.Provider>
  )
}
