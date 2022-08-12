import classNames from "classnames"
import { Squeeze as Hamburger } from "hamburger-react"
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef, useState } from "react"

import { AppLink } from "@components/shared/AppLink"
import { MainLogo } from "@logos/MainLogo"

export interface HeaderProps {
  isMenuOpen: boolean
  isHomePage?: boolean
  toggleMenu: () => void
}

export const Header = ({ isMenuOpen, isHomePage, toggleMenu }: HeaderProps) => {
  const [addBg, setAddBg] = useState(false)
  const [hidden, setHidden] = useState(false)
  const scrollPosition = useRef(0)
  const headerRef = useRef<HTMLElement>(null)

  const router = useRouter()
  const pageLocation = router.asPath.slice(0, 5)

  // window scroll handler
  const scrollHandler = useCallback(() => {
    const { top } = document.body.getBoundingClientRect()

    // hide navbar
    if (top < 0 && top < scrollPosition.current) {
      setHidden(true)

      // show navbar
    } else if (top === 0 || top > scrollPosition.current) {
      setAddBg(top < 0)
      setHidden(false)
    }

    // update scroll offset
    scrollPosition.current = top
  }, [])

  // react to user scroll events
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler)
    return () => window.removeEventListener("scroll", scrollHandler)
  }, [scrollHandler])

  return (
    <header
      ref={headerRef}
      className={classNames(
        "section-padding fixed z-[100] flex w-screen items-center justify-between py-4 text-white transition-all duration-500 lg:py-6",
        { "bg-dark-green": pageLocation !== "/jobs" && addBg },
        { "bg-white text-dark-green": pageLocation === "/jobs" }
      )}
      style={{ top: hidden ? `-${headerRef.current?.clientHeight}px` : 0 }}
    >
      <Hamburger toggled={isMenuOpen} toggle={toggleMenu} />
      {isMenuOpen && isHomePage && (
        <div onClick={toggleMenu} className="cursor-pointer">
          <MainLogo />
        </div>
      )}
      {(!isMenuOpen || !isHomePage) && (
        <AppLink href="/">
          <MainLogo
            className="w-[78px] md:w-auto"
            fill={pageLocation === "/jobs" ? "#3E5C58" : "white"}
          />
        </AppLink>
      )}
      <AppLink href="/contact-us" className="link-m hover-text-white font-normal">
        Contact
      </AppLink>
    </header>
  )
}
