import { Squeeze as Hamburger } from "hamburger-react"

import { AppLink } from "@components/shared/AppLink"
import { MainLogo } from "@logos/MainLogo"

export interface HeaderProps {
  isMenuOpen: boolean
  toggleMenu: () => void
}

export const Header = ({ isMenuOpen, toggleMenu }: HeaderProps) => {
  return (
    <div className="absolute top-0 z-20 flex w-full items-center justify-between px-12 py-6 text-white">
      <Hamburger toggled={isMenuOpen} toggle={toggleMenu} />
      <MainLogo />
      <AppLink
        href="#"
        className="text-link-m font-normal duration-300 ease-in-out hover:text-medium-beige"
      >
        Contact
      </AppLink>
    </div>
  )
}
