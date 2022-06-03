import { AnimatedPage, HeroType, Page } from "./common"

export interface BaseBlock {
  name: BlockName
}

export interface HeroData extends BaseBlock {
  type: HeroType
  pages: AnimatedPage[] | null
  page: {
    title: string
    linkText: string
    linkUrl: string
    colorOverlay: string
  } | null
}
export interface StatsData extends BaseBlock {
  heading: string
  description: string
  gallery: {
    imageId: number
    title: string
  }[]
  linkTitle: string
  linkUri: number
}

export interface DescWithImageData extends BaseBlock {
  heading: string
  description: string
  imageId: number
}

export interface LogowallData extends BaseBlock {
  heading: string
  border: "border" | "no-border"
  gallery: {
    imageId: number
  }[]
}

export interface ReviewSliderData extends BaseBlock {
  heading?: string
  reviews: {
    reviewText: string
    reviewClient: string
    reviewCompany: string
  }[]
}
export interface RelatedArticleData extends BaseBlock {
  title: string
  postIds: number[]
}

export interface ShortDescData extends BaseBlock {
  description: string
  quote: string
}

export interface ContactData extends BaseBlock {
  title: string
  medarbetareIds: number[]
}

export interface DataPointsData extends BaseBlock {
  points: {
    pointNumber: number
    pointSymbol: string
    pointTitle: string
  }[]
}

export interface TabsData extends BaseBlock {
  heading: string
  tabList: {
    title: string
    content: string
  }[]
}

export interface RegisterCvData extends BaseBlock {
  heading: string
  description: string
  downloadLinkTitle: string
  downloadFile: number
  professionalInfo: {
    infoDropdown: {
      title: string
      values: {
        value: string
      }[]
    }[]
  }
}

export type BlockName =
  | "acf/hero"
  | "acf/stats"
  | "acf/desc-image"
  | "acf/related-articles"
  | "acf/logo-wall"
  | "acf/reviews-slider"
  | "acf/short-desc"
  | "acf/contact"
  | "acf/data-points"
  | "acf/tabs"
  | "acf/register-cv"

/** Type-narrowing functions */
export function isHeroData(object: any): object is HeroData {
  return object && typeof object.name === "string" && object.name === "acf/hero"
}

export function isStatsData(object: any): object is StatsData {
  return object && typeof object.name === "string" && object.name === "acf/stats"
}

export function isDescWithImageData(object: any): object is DescWithImageData {
  return object && typeof object.name === "string" && object.name === "acf/desc-image"
}

export function isLogowallData(object: any): object is LogowallData {
  return object && typeof object.name === "string" && object.name === "acf/logo-wall"
}

export function isReviewSilderData(object: any): object is ReviewSliderData {
  return object && typeof object.name === "string" && object.name === "acf/reviews-slider"
}

export function isRelatedArticlesData(object: any): object is RelatedArticleData {
  return object && typeof object.name === "string" && object.name === "acf/related-articles"
}

export function isShortDescData(object: any): object is ShortDescData {
  return object && typeof object.name === "string" && object.name === "acf/short-desc"
}

export function isContactData(object: any): object is ContactData {
  return object && typeof object.name === "string" && object.name === "acf/contact"
}

export function isDataPointsData(object: any): object is DataPointsData {
  return object && typeof object.name === "string" && object.name === "acf/data-points"
}

export function isTabsData(object: any): object is TabsData {
  return object && typeof object.name === "string" && object.name === "acf/tabs"
}

export function isRegisterCvData(object: any): object is RegisterCvData {
  return object && typeof object.name === "string" && object.name === "acf/register-cv"
}
