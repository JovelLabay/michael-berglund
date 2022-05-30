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

// export type BlocksUnion = StatsData | DescWithImageData

export type BlockName = "acf/hero" | "acf/stats" | "acf/desc-image"

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
