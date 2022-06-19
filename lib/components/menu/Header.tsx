import { Squeeze as Hamburger } from "hamburger-react"

import { AppLink } from "@components/shared/AppLink"
import { MainLogo } from "@logos/MainLogo"

export interface HeaderProps {
  isMenuOpen: boolean
  isHomePage?: boolean
  toggleMenu: () => void
}

export const Header = ({ isMenuOpen, isHomePage, toggleMenu }: HeaderProps) => {
  return (
    <div className="absolute top-0 z-[100] flex w-full items-center justify-between px-12 py-6 text-white">
      <Hamburger toggled={isMenuOpen} toggle={toggleMenu} />
      {isMenuOpen && isHomePage && (
        <div onClick={toggleMenu} className="cursor-pointer">
          <MainLogo />
        </div>
      )}
      {(!isMenuOpen || !isHomePage) && (
        <AppLink href="/">
          <MainLogo />
        </AppLink>
      )}
      <AppLink href="/contact-us" className="link-m hover-text-white font-normal">
        Contact
      </AppLink>
    </div>
  )
}
