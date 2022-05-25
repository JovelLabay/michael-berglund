import classNames from "classnames"
import Link from "next/link"
import { ReactNode, SyntheticEvent, useCallback } from "react"

export interface AppLinkProps {
  href?: string
  children?: ReactNode
  className?: string
}

export const AppLink = ({ href, children, className }: AppLinkProps) => {
  const needsNextLink = typeof href === "string" && href.startsWith("/")
  const onCLick = useCallback(
    (e: SyntheticEvent) => {
      // scroll to a section in the current page
      if (typeof href === "string" && href.startsWith("#")) {
        e.preventDefault()

        // scroll to target section
        try {
          const targetSection = document.querySelector(href)
          if (!targetSection) return
          targetSection.scrollIntoView({ behavior: "smooth" })
        } catch (_) {}
      }

      // open external link in a new tab
      else if (
        typeof href === "string" &&
        (href.startsWith("http://") || href.startsWith("https://")) &&
        new URL(href).host !== window.location.host
      ) {
        e.preventDefault()
        window.open(href, "_blank", "noopener,noreferrer")
      }
    },
    [href]
  )

  const container = (
    <a
      className={classNames("cursor-pointer", className)}
      href={needsNextLink ? href : undefined}
      onClick={needsNextLink ? undefined : onCLick}
    >
      {children}
    </a>
  )

  return needsNextLink ? <Link href={href}>{container}</Link> : container
}
