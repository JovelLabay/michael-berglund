import { Squeeze as Hamburger } from "hamburger-react"
import { useContext, useEffect, useState } from "react"

import { NewsLetter } from "@components/footer/Newsletter"
import { AppLink } from "@components/shared/AppLink"
import { MainLogo } from "@logos/MainLogo"

export interface HeaderProps {
  isMenuOpen: boolean
  isHomePage?: boolean
  toggleMenu: () => void
}

export const Header = ({ isMenuOpen, isHomePage, toggleMenu }: HeaderProps) => {

  const [showPopUp, setShowPopUp] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("newsLetterPopUp") === null) {
      setTimeout(() => {
        setShowPopUp(true)
      }, 1000)
    }
  }, [])

  const props = { showPopUp, setShowPopUp }

  return (
    <div className="section-padding absolute top-0 z-[100] flex w-full items-center justify-between py-4 text-white lg:py-6">
      <Hamburger toggled={isMenuOpen} toggle={toggleMenu} />
      {isMenuOpen && isHomePage && (
        <div onClick={toggleMenu} className="cursor-pointer">
          <MainLogo />
        </div>
      )}
      {(!isMenuOpen || !isHomePage) && (
        <AppLink href="/">
          <MainLogo className="w-[78px] md:w-auto" />
        </AppLink>
      )}
      <AppLink href="/contact-us" className="link-m hover-text-white font-normal">
        Contact
      </AppLink>

      {/* SHOW POP UP */}
      {showPopUp && (
        <div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-[#00000080]">
          <NewsLetter {...props} />
        </div>
      )}
    </div>
  )
}
