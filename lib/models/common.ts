import type { ImageProps } from "next/image"
import { BaseBlock } from "./blocks"

export type LinkType = "internal" | "external"

export type HeroType = "basic" | "animated"

export type ImageMap = Record<number, Pick<ImageProps, "src" | "alt">>

export type PageMap = Record<number, Page>
export type PostMap = Record<number, Post | MedarbetarePost | CoursePost | CoursePost[]>

export type FileMap = Record<number, string>

export interface IDropDown {
  title: string
  fieldName: string
  values: string[]
}

export interface PageProps {
  globalFields: GQLGlobalFields
  blocks: BaseBlock[]
  pageMap?: PageMap
  postMap?: PostMap
  images?: ImageMap
  pageData?: Page
  files?: FileMap
}
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
        description: string
      }[]
    }
    newsletter: {
      title: string
      description: string
      emailPlaceholder: string
      privacyPolicy: string
      successTitle: string
      successMessage: string
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
      footerBottomLinks: {
        footerLinks: string
        footerLinksName: string
      }[]
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
  pageId?: string
  featuredImage: {
    node: WPMedia
  }
}

export interface Post {
  id: string
  postId: string
  title: string
  slug: string
  uri: string
  excerpt: string
  featuredImage: {
    node: WPMedia
  }
}

export interface MedarbetarePost {
  id: string
  medarbetaredId: string
  title: string
  slug: string
  uri: string
  featuredImage: {
    node: WPMedia
  }
  acfMedarbetare: AcfMedarbetare
}

export interface Courses {
  edges: {
    node: {
      id: string
      courseId: string
      uri: string
      title: string
      excerpt: string
      acfCourse: AcfCourse
    }
  }[]
}

export interface CoursePost extends Post {
  id: string
  courseId: string
  uri: string
  title: string
  excerpt: string
  acfCourse: AcfCourse
}
export interface AcfCourse {
  isCourseFull: boolean
  startDate: Date
  duration: number
  durationUnit: string
  language: string
}

export interface AcfMedarbetare {
  position: string
  email: string
  phone: string
  linkedin: string
  bio: string
}

export interface AnimatedPage {
  id: number
  pageId: number
  mainTitle: string
  preTitle: string
  linkText: string
  colorOverlay: string
}

export interface SingleArticlePost {
  post: {
    title: string
    date: string
    content: string
    featuredImage: {
      node: WPMedia
    }
    acfPostSingleArticle: {
      coverImage: WPMedia
      linkTitle: string
      mediaFile: string
    }
    blocks: {
      attributesJSON: string
    }[]
  }
}
