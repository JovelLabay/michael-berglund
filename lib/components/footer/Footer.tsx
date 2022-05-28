import { GlobalContext } from "@context/global"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"

import mapImage from "@/public/Map.png"
import { AppLink } from "@components/shared/AppLink"
import { FooterLogo } from "@logos/FooterLogo"

import { ContactItem } from "./ContactItem"
import { NewsLetter } from "./Newsletter"

export const Footer = () => {
  const {
    acfGlobal: { footer },
  } = useContext(GlobalContext)

  const { contactInfo, links, association, copyRightLabel } = footer

  // convert year placeholder in copyright text
  const year = new Date().getFullYear()
  const parsedCopyright = copyRightLabel.replace(/<year>/g, year.toString())

  return (
    <>
      <NewsLetter />
      <footer className="flex justify-between bg-dark-blue text-white">
        <div className="flex w-2/4 flex-col justify-between p-12 pt-[60px]">
          {/* Top */}
          <div className="flex flex-wrap justify-between">
            <AppLink href="/">
              <FooterLogo className="shrink-0" />
            </AppLink>

            {/* Contact Link */}
            <div className="footer-contact-text flex flex-col space-y-3">
              {contactInfo &&
                contactInfo.map(contact => <ContactItem key={contact.text} {...contact} />)}
            </div>

            {/* Social Link */}
            <div className="footer-link-text flex flex-col space-y-2">
              {links &&
                links.map(({ linkType, text, externalLink, internalLink }) =>
                  linkType === "internal" ? (
                    <AppLink
                      key={text}
                      href={internalLink.uri}
                      className="duration-300 ease-in-out hover:text-medium-beige"
                    >
                      <span>{text}</span>
                    </AppLink>
                  ) : (
                    <Link key={text} href={externalLink}>
                      <a
                        className="duration-300 ease-in-out hover:text-medium-beige"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>{text}</span>
                      </a>
                    </Link>
                  )
                )}
            </div>
          </div>
          {/* Bottom */}
          <div className="flex items-end justify-between">
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
                      className="duration-300 ease-in-out hover:opacity-75"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image src={logo.mediaItemUrl} alt={logo.altText} width={110} height={40} />
                    </a>
                  ))}
              </div>
            </div>
            <span className="body-s text-dark-beige">{parsedCopyright}</span>
          </div>
        </div>
        <div className="w-2/4 shrink-0">
          {/* <Map /> */}
          <div className="relative h-[455px]">
            <Image
              src={mapImage}
              alt="Map"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        </div>
      </footer>
    </>
  )
}
