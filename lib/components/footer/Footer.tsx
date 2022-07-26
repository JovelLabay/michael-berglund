import { useGlobalContext } from "@context/global"
import Image from "next/image"
import Link from "next/link"

import mapImage from "@/public/Map.png"
import { AppLink } from "@components/shared/AppLink"
import { FooterLogo } from "@logos/FooterLogo"

import { FooterContactItem } from "./FooterContactItem"
import { NewsLetter } from "./Newsletter"

export const Footer = () => {
  const {
    acf: {
      acfGlobal: { footer },
    },
  } = useGlobalContext()

  const { contactInfo, links, association, copyRightLabel, footerBottomLinks } = footer

  // convert year placeholder in copyright text
  const year = new Date().getFullYear()
  const parsedCopyright = copyRightLabel.replace(/<year>/g, year.toString())

  return (
    <>
      <NewsLetter />
      <footer className=" mr-4 bg-dark-blue px-6 py-[50px] text-white md:px-10">
        {/* TOP */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-12 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
          {/* ICON */}
          <AppLink href="/">
            <FooterLogo className="shrink-0" />
          </AppLink>

          {/* CONTACT LIST */}
          <div>
            <span className="pre-title font-normal uppercase tracking-[0.15em] text-dark-beige">
              {/* {association.title} */}
              {"kontact".toUpperCase()}
            </span>
            <div className=" footer-contact-text mt-6 flex flex-col space-y-3">
              {contactInfo &&
                contactInfo.map(contact => <FooterContactItem key={contact.text} {...contact} />)}
            </div>
          </div>

          {/* SOCIALS */}
          <div>
            <span className="pre-title font-normal uppercase tracking-[0.15em] text-dark-beige">
              {/* {association.title} */}
              {"linkedin".toUpperCase()}
            </span>
            <div className=" footer-link-text mt-[20px] flex flex-col space-y-2">
              {links &&
                links.map(({ linkType, text, externalLink, internalLink }) =>
                  linkType === "internal" ? (
                    <AppLink key={text} href={internalLink.uri} className="hover-text-white">
                      <span>{text}</span>
                    </AppLink>
                  ) : (
                    <Link key={text} href={externalLink}>
                      <a className="hover-text-white outline-none" target="_blank" rel="noreferrer">
                        <span>{text}</span>
                      </a>
                    </Link>
                  )
                )}
            </div>
          </div>

          {/* OTHER ICON */}
          <div>
            <span className="pre-title font-normal uppercase tracking-[0.15em] text-dark-beige">
              {association.title}
            </span>
            <div className="mt-6 flex space-x-10">
              {association.partners &&
                association.partners.map(({ logo, link }) => (
                  <a
                    key={logo.mediaItemUrl}
                    href={link}
                    className="app-hover outline-none hover:opacity-75"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={logo.mediaItemUrl} alt={logo.altText} width={110} height={40} />
                  </a>
                ))}
            </div>
          </div>
        </div>

        {/* BOOTM */}
        <div>
          <div className=" my-14 border-b-2 border-dark-beige" />
          <div className="flex flex-col justify-between md:flex-row">
            <div className="mb-10 flex w-48 flex-row justify-between sm:my-0">
              {footerBottomLinks.map((footerBottomLink, index) => {
                return (
                  <a
                    href={footerBottomLink.footerLinks}
                    key={index}
                    target="_blank"
                    rel="noreferrer"
                    className="hover-text-white"
                  >
                    <p>{footerBottomLink.footerLinksName}</p>
                  </a>
                )
              })}
            </div>
            <div>
              <span className="body-s text-dark-beige">{parsedCopyright}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
