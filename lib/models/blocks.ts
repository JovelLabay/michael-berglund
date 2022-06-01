import { AnimatedPage, HeroType } from "./common"

export interface BaseBlock {
  name: BlockName
}

export interface HeroData extends BaseBlock {
  type: HeroType
  pages: AnimatedPage[] | null
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

// export type BlocksUnion = StatsData | DescWithImageData

export type BlockName =
  | "acf/hero"
  | "acf/stats"
  | "acf/desc-image"
  | "acf/logo-wall"
  | "acf/reviews-slider"

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
