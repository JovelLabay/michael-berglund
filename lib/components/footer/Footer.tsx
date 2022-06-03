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

  const { contactInfo, links, association, copyRightLabel } = footer

  // convert year placeholder in copyright text
  const year = new Date().getFullYear()
  const parsedCopyright = copyRightLabel.replace(/<year>/g, year.toString())

  return (
    <>
      <NewsLetter />
      <footer className="flex justify-between bg-dark-blue text-white">
        <div className="flex w-1/2 flex-col justify-between p-12 pt-[60px]">
          {/* Top */}
          <div className="flex flex-wrap justify-between">
            <AppLink href="/">
              <FooterLogo className="shrink-0" />
            </AppLink>

            {/* Contact Link */}
            <div className="footer-contact-text flex flex-col space-y-3">
              {contactInfo &&
                contactInfo.map(contact => <FooterContactItem key={contact.text} {...contact} />)}
            </div>

            {/* Social Link */}
            <div className="footer-link-text flex flex-col space-y-2">
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
                      className="app-hover outline-none hover:opacity-75"
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
        <div className="w-1/2 shrink-0">
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
