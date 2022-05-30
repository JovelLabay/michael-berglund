import type { ImageProps } from "next/image"

export type LinkType = "internal" | "external"

export type ImageMap = Record<number, Pick<ImageProps, "src"| "alt">>

export interface GQLGlobalFields {
  generalSettings: ACFGeneralSettings
  acfGlobalFields: ACFGlobalFields
}

export interface ACFGeneralSettings {
  title: string
  description: string
}

export interface ACFGlobalFields {
  acfGlobal: {
    menu: {
      menuLinks: {
        text: string
        pagelink: Page
      }[]
    }
    newsletter: {
      title: string
      description: string
      emailPlaceholder: string
      privacyPolicy: string
    }
    footer: {
      contactInfo: {
        icon: WPMedia
        text: string
        link: string
      }[]
      links: {
        text: string
        linkType: LinkType
        externalLink: string
        internalLink: Page
      }[]
      association: {
        title: string
        partners: {
          link: string
          logo: WPMedia
        }[]
      }
      copyRightLabel: string
    }
  }
}

export interface WPMediaDetails {
  height: number
  width: number
}

export interface WPMedia {
  altText: string
  mediaItemUrl: string
  mediaDetails: WPMediaDetails | null
}

export interface Page {
  id: string
  slug: string
  uri: string
  title: string
  featuredImage: {
    node: WPMedia
  }
}
