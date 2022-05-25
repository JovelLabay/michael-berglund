import { GlobalContext } from "@context/global"
import classNames from "classnames"
import { AnimatePresence } from "framer-motion"
import { ReactNode, useCallback, useState } from "react"

import { Footer } from "@components/footer"
import { Header, MenuContent } from "@components/menu"
import { ACFGeneralSettings, ACFGlobalFields } from "@models/common"

export interface LayoutProps {
  children: ReactNode
  acfGlobalFields: ACFGlobalFields
  generalSettings: ACFGeneralSettings
}

export default function Layout({ children, acfGlobalFields, generalSettings }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(open => !open)
  }, [])

  return (
    <GlobalContext.Provider value={acfGlobalFields}>
      <div
        className={classNames("relative h-screen w-screen bg-dark-blue", {
          "overflow-hidden": isMenuOpen,
        })}
      >
        <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}></Header>
        <AnimatePresence>{isMenuOpen && <MenuContent />}</AnimatePresence>
        <div className="pt-[400px]">{children}</div>
        <Footer />
      </div>
    </GlobalContext.Provider>
  )
}
