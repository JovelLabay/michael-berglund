import {
    BaseBlock, DescWithImageData, HeroData, isDescWithImageData, isHeroData, isLogowallData,
    isRelatedArticlesData, isStatsData, LogowallData, RelatedArticleData, ReviewSliderData,
    ShortDescData, StatsData
} from "@models/blocks"

type Blocks = { attributesJSON: string }[]

export const parse = (rawBlocks: Blocks): { blocks: BaseBlock[] } => {
  // parse attributes from string to javascript objects
  const blockAttributes = rawBlocks
    .filter(blocks => Object.keys(blocks).length > 0)
    .map(({ attributesJSON }) => JSON.parse(attributesJSON))

  // parse blocks according to their types
  const blocks: BaseBlock[] = blockAttributes.map(({ data, name }) => {
    switch (name) {
      case "acf/hero":
        return parseHeroBlock(data)
      case "acf/stats":
        return parseStatsBlock(data)
      case "acf/desc-image":
        return parseDescWithImageBlock(data)
      case "acf/logo-wall":
        return parseLogowallBlock(data)
      case "acf/reviews-slider":
        return parseReviewSilderBlock(data)
      case "acf/related-articles":
        return parseRelatedArticles(data)
      case "acf/short-desc":
        return parseShortDescblock(data)

      default:
        throw new Error(`Unknown block type: ${name}`)
    }
  })

  return { blocks }
}

//collect all unique image ids used by different blocks
export const getImageIds = (blocks: BaseBlock[]): number[] => {
  const mapper = (block: BaseBlock) => {
    if (isStatsData(block) || isLogowallData(block))
      return block.gallery.map(({ imageId }: any) => imageId)
    if (isDescWithImageData(block)) return [block.imageId]

    return []
  }

  return Array.from(new Set(blocks.map(mapper).flatMap(ids => ids)))
}

export const getPageLinkIds = (blocks: BaseBlock[]) => {
  const mapper = (block: BaseBlock) => {
    if (isHeroData(block) && block.type === "animated") return block.pages!.map(page => page.pageId)
    if (isStatsData(block)) return [block.linkUri]

    return []
  }

  return Array.from(new Set(blocks.map(mapper).flatMap(ids => ids)))
}

export const getPostLinkIds = (blocks: BaseBlock[]) => {
  const mapper = (block: BaseBlock) => {
    if (isRelatedArticlesData(block)) return block.postIds

    return []
  }

  return Array.from(new Set(blocks.map(mapper).flatMap(ids => ids)))
}

const animatedPagesPattern = /^animated_pages_(\d+)_page$/

const parseHeroBlock = (data: any): HeroData => {
  const blockType = data.hero_type
  let animatedPages = null
  let pageData = null

  if (blockType === "animated") {
    animatedPages = Object.keys(data)
      .filter(key => animatedPagesPattern.test(key))
      .map(key => key.match(animatedPagesPattern)![1])
      .map(index => ({
        id: +data[`animated_pages_${index}_page`],
        pageId: +data[`animated_pages_${index}_page`],
        mainTitle: data[`animated_pages_${index}_main_title`],
        preTitle: data[`animated_pages_${index}_pre-title`],
        linkText: data[`animated_pages_${index}_link_text`],
        linkUrl: data[`animated_pages_${index}_link_url`],
        colorOverlay: data[`animated_pages_${index}_color_overlay`],
      }))
  } else {
    pageData = {
      title: data.basic_hero_title,
      linkText: data.basic_hero_link_text,
      linkUrl: data.basic_hero_link_url,
      colorOverlay: data.basic_hero_color_overlay
    }
  }

  return { name: "acf/hero", type: data.hero_type, pages: animatedPages }
}

const statsIconPattern = /^icons_(\d+)_image$/

const parseStatsBlock = (data: any): StatsData => {
  const indexes = Object.keys(data)
    .filter(key => statsIconPattern.test(key))
    .map(key => key.match(statsIconPattern)![1])

  const gallery = indexes.map(index => ({
    imageId: parseInt(data[`icons_${index}_image`]),
    title: String(data[`icons_${index}_title`]),
  }))

  return {
    heading: data.heading,
    description: data.description,
    gallery: gallery,
    linkTitle: data.stats_link_link_title,
    linkUri: data.stats_link_link,
    name: "acf/stats",
  }
}

const parseDescWithImageBlock = (data: any): DescWithImageData => {
  return {
    heading: data.heading,
    description: data.description,
    imageId: data.image,
    name: "acf/desc-image",
  }
}

const logoWallPattern = /^logo_gallery_(\d+)_logo_image$/

const parseLogowallBlock = (data: any): LogowallData => {
  const indexes = Object.keys(data)
    .filter(key => logoWallPattern.test(key))
    .map(key => key.match(logoWallPattern)![1])

  const gallery = indexes.map(index => ({
    imageId: parseInt(data[`logo_gallery_${index}_logo_image`]),
  }))

  return {
    heading: data.heading,
    border: data.border_bottom,
    gallery: gallery,
    name: "acf/logo-wall",
  }
}

const reviewSliderPattern = /^reviews_(\d+)_review_text$/

const parseReviewSilderBlock = (data: any): ReviewSliderData => {
  const indexes = Object.keys(data)
    .filter(key => reviewSliderPattern.test(key))
    .map(key => key.match(reviewSliderPattern)![1])

  const reviews = indexes.map(index => ({
    reviewText: data[`reviews_${index}_review_text`],
    reviewClient: data[`reviews_${index}_review_client`],
    reviewCompany: data[`reviews_${index}_review_company`],
  }))

  return { heading: data.heading, reviews, name: "acf/reviews-slider" }
}

const relatedArticlePattern = /^articles_(\d+)_article$/

const parseRelatedArticles = (data: any): RelatedArticleData => {
  const { title } = data

  const postIds = Object.keys(data)
    .filter(key => relatedArticlePattern.test(key))
    .map(key => data[key])

  return { title, postIds, name: "acf/related-articles" }
}

const parseShortDescblock = (data: any): ShortDescData => {
  return { description: data.description, quote: data.quote, name: "acf/short-desc" }
}
