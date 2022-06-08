import {
    AssignmentsData, BaseBlock, ContactData, DataPointsData, DescWithImageData, HeroData,
    isBigPageLinks, isContactData, isDescWithImageData, isHeroData, isLogowallData,
    isRelatedArticlesData, isStatsData, isTabsData, LogowallData, PostData, RelatedArticleData,
    ReviewSliderData, ShortDescData, StatsData, TabsData
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
      case "acf/contact":
        return parseContactBlocks(data)
      case "acf/data-points":
        return parseDataPointsblock(data)
      case "acf/tabs":
        return parseTabsBlock(data)
      case "acf/assignments":
        return parseAssignmentsBlock(data)
      case "acf/big-page-links":
        return parseAnyPostData(data, name)
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
    if (isDescWithImageData(block) || isTabsData(block)) return [block.imageId]

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

export const getMedarbetareLinkIds = (blocks: BaseBlock[]) => {
  const mapper = (block: BaseBlock) => {
    if (isContactData(block)) return block.medarbetareIds

    return []
  }

  return Array.from(new Set(blocks.map(mapper).flatMap(ids => ids)))
}

export const getCoursesLinkIds = (blocks: BaseBlock[]) => {
  const mapper = (block: BaseBlock) => {
    if (isBigPageLinks(block)) return block.postIds
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
        colorOverlay: data[`animated_pages_${index}_color_overlay`],
      }))
  } else {
    pageData = {
      title: data.basic_hero_title,
      linkText: data.basic_hero_link_text,
      linkUrl: data.basic_hero_link_url,
      colorOverlay: data.basic_hero_color_overlay,
    }
  }

  return { name: "acf/hero", type: data.hero_type, pages: animatedPages, page: pageData }
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

const contactItemPattern = /^medarbetare_list_(\d+)_medarbetare$/

const parseContactBlocks = (data: any): ContactData => {
  const medarbetareIds = Object.keys(data)
    .filter(key => contactItemPattern.test(key))
    .map(key => key.match(contactItemPattern)![1])
    .map(index => data[`medarbetare_list_${index}_medarbetare`])

  return { name: "acf/contact", title: data.title, medarbetareIds }
}

const dataPointsPattern = /^data_points_(\d+)_data_number$/

const parseDataPointsblock = (data: any): DataPointsData => {
  const indexes = Object.keys(data)
    .filter(key => dataPointsPattern.test(key))
    .map(key => key.match(dataPointsPattern)![1])

  const points = indexes.map(index => ({
    pointNumber: data[`data_points_${index}_data_number`],
    pointSymbol: data[`data_points_${index}_data_symbol`],
    pointTitle: data[`data_points_${index}_data_title`],
  }))

  return { points: points, name: "acf/data-points" }
}

const tabsPattern = /^tab_list_(\d+)_tab_title$/

const parseTabsBlock = (data: any): TabsData => {
  const indexes = Object.keys(data)
    .filter(key => tabsPattern.test(key))
    .map(key => key.match(tabsPattern)![1])

  const tabsList = indexes.map(index => ({
    title: data[`tab_list_${index}_tab_title`],
    content: data[`tab_list_${index}_tab_content`],
  }))

  return { heading: data.heading, imageId: data.image, tabList: tabsList, name: "acf/tabs" }
}

const completedAssignmentsPattern = /^completed_assignments_(\d+)_title$/
const parseAssignmentsBlock = (data: any): AssignmentsData => {
  const completedAssignments = Object.keys(data)
    .filter(key => completedAssignmentsPattern.test(key))
    .map(key => key.match(completedAssignmentsPattern)![1])
    .map(index => ({
      title: data[`completed_assignments_${index}_title`],
      description: data[`completed_assignments_${index}_description`],
    }))

  return { name: "acf/assignments", title: data.title, assignments: completedAssignments }
}

/**
 *
 * @param data Object value from the block
 * @param name Attribute name of the block
 * @param pattern Regex pattern to be match from the key/attributejson
 * @returns Parse data from different types of post
 */

const parseAnyPostData = (data: any, name: any): PostData => {
  const { title } = data

  const postIds = Object.keys(data)
    .filter(key => regexPostPatternFinder(name).test(key))
    .map(key => data[key])
  return { title, postIds, name }
}

/**
 *
 * @param name Use this to create more regex pattern to a certain post type
 * @returns Regex pattern for a specific type of post
 */

const regexPostPatternFinder = (name: any): RegExp => {
  const [postDataPattern] = [
    { name: "acf/related-articles", pattern: /^articles_(\d+)_article$/ },
    { name: "acf/big-page-links", pattern: /^tailored_courses_(\d+)_tailored_course$/ },
  ].filter(data => name == data.name)

  return postDataPattern.pattern
}
