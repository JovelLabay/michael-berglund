import {
  AccordionListsData,
  AssignmentsData,
  BaseBlock,
  ContactData,
  ContactFeedListblock,
  CourseCardsData,
  DataPointsData,
  DescWithImageData,
  HeroData,
  ImageGalleryData,
  InfoIconData,
  isAccordionListBlock,
  isBigPageLinks,
  isContactData,
  isContactFeedBlock,
  isCourseCardData,
  isDescWithImageData,
  isHeroData,
  isImageGalleryBlock,
  isInfoIconBlock,
  isLogowallData,
  isRegisterCvData,
  isRelatedArticlesData,
  isStatsData,
  isTabsData,
  LogowallData,
  PostData,
  PressFeedData,
  RegisterCvData,
  RelatedArticleData,
  ReviewSliderData,
  ShortDescData,
  StatsData,
  TableDescData,
  TabsData,
} from "@models/blocks"
import { IDropDown } from "@models/common"

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
      case "acf/register-cv":
        return parseRegisterCVBlock(data)
      case "acf/big-page-links":
        return parseAnyPostData(data, name)
      case "acf/course-card":
        return parseCourseCardData(data)
      case "acf/info-icon":
        return parseInfoIconBlock(data)
      case "acf/contact-feed":
        return parseContactFeedBlocks(data)
      case "acf/accordion-list":
        return parseAccordionListsBlock(data)
      case "acf/table-desc":
        return parseTableDescBlock(data)
      case "acf/press-feed":
        return parsePressFeedblock(data)
      case "acf/image-gallery":
        return parseImageGalleryBlock(data)
      default:
        throw new Error(`Unknown block type: ${name}`)
    }
  })

  return { blocks }
}

//collect all unique image ids used by different blocks
export const getImageIds = (blocks: BaseBlock[]): number[] => {
  const mapper = (block: BaseBlock) => {
    if (
      isStatsData(block) ||
      isLogowallData(block) ||
      isInfoIconBlock(block) ||
      isAccordionListBlock(block) ||
      isImageGalleryBlock(block)
    )
      return block.gallery.map(({ imageId }: any) => imageId)

    if (isDescWithImageData(block) || isTabsData(block)) return [block.imageId]

    if (isContactFeedBlock(block)) return [block.coverPhotoId]

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
    if (isContactFeedBlock(block)) return block.medarbetareIds!
    return []
  }

  return Array.from(new Set(blocks.map(mapper).flatMap(ids => ids)))
}

export const getFileLinks = (blocks: BaseBlock[]) => {
  const mapper = (block: BaseBlock) => {
    if (isRegisterCvData(block)) {
      if (block.downloadFile !== null) {
        return block.downloadFile!
      } else {
        return []
      }
    }

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

export const hasCourseCardBlock = (blocks: BaseBlock[]): boolean => {
  return blocks.find(block => isCourseCardData(block)) ? true : false
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

const imageGalleryPattern = /^images_(\d+)_image$/
const parseImageGalleryBlock = (data: any): ImageGalleryData => {
  const indexes = Object.keys(data)
    .filter(key => imageGalleryPattern.test(key))
    .map(key => key.match(imageGalleryPattern)![1])
  const gallery = indexes.map(index => ({
    imageIdKey: data[`_images_${index}_image`] + Math.random(),
    imageId: parseInt(data[`images_${index}_image`]),
  }))
  return { gallery, title: data["title"], name: "acf/image-gallery" }
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

const parseInfoIconBlock = (data: any): InfoIconData => {
  const indexes = Object.keys(data)
    .filter(key => logoWallPattern.test(key))
    .map(key => key.match(logoWallPattern)![1])

  const gallery = indexes.map(index => ({
    imageId: parseInt(data[`logo_gallery_${index}_logo_image`]),
    description: data[`logo_gallery_${index}_description`],
  }))
  return {
    heading: data.heading,
    gallery: gallery,
    name: "acf/info-icon",
  }
}

const contactFeedBlockPattern = /^contact_feed_group_(\d+)_heading$/
const contactFeedBlockSubPattern = /^contact_feed_group_(\d+)_medarbetare_list_(\d+)_medarbetare$/
const parseContactFeedBlocks = (data: any): ContactFeedListblock => {
  let resultParse: { title: any; tempLists: any[]; medarbetareIds: any[] }[] = []
  Object.keys(data).forEach(keys => {
    if (contactFeedBlockPattern.test(keys)) {
      resultParse.push({
        title: data[keys],
        tempLists: [],
        medarbetareIds: [],
      })
    } else {
      if (
        resultParse &&
        resultParse.length > 0 &&
        (contactFeedBlockPattern.test(keys) || keys.charAt(0) != "_")
      ) {
        resultParse[resultParse.length - 1].tempLists.push(keys)
      }
    }
  })
  let medarbetareIds: any[] = []
  resultParse.forEach((dataRes, i) => {
    let indexes = dataRes.tempLists
      .filter(key => contactFeedBlockSubPattern.test(key))
      .map(key => key.match(contactFeedBlockSubPattern)![2])
    indexes.map(value => {
      dataRes.medarbetareIds.push(
        data[`contact_feed_group_${i}_medarbetare_list_${value}_medarbetare`]
      )
      medarbetareIds.push(data[`contact_feed_group_${i}_medarbetare_list_${value}_medarbetare`])
    })
  })
  const contactListsBlockData = resultParse.map(value => {
    return { title: value.title, medarbetareIds: value.medarbetareIds }
  }) as any
  return {
    contactLists: contactListsBlockData,
    coverPhotoId: data["cover_photo"],
    medarbetareIds: medarbetareIds,
    name: "acf/contact-feed",
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

  return {
    heading: data.heading,
    backgroundColor: data.background_color,
    reviews,
    name: "acf/reviews-slider",
  }
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
  return {
    description: data.description,
    quote: data.quote,
    backgroundColor: data.background_color,
    name: "acf/short-desc",
  }
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

  return { points: points, backGroundColor: data.background_color, name: "acf/data-points" }
}

const pressFeedPattern = /^press_list_(\d+)_title$/
const parsePressFeedblock = (data: any): PressFeedData => {
  const indexes = Object.keys(data)
    .filter(key => pressFeedPattern.test(key))
    .map(key => key.match(pressFeedPattern)![1])
  const pressList = indexes.map(index => ({
    title: data[`press_list_${index}_title`],
    details: data[`press_list_${index}_details`],
    url: data[`press_list_${index}_url`],
    titleId: data[`_press_list_${index}_title`] + Math.random(),
    urlLabel: data[`press_list_${index}_url_label`],
  }))

  return { title: data["title"], pressList, name: "acf/press-feed" }
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

const accordionGroupPattern = /^accordion_group_(\d+)_group_title$/
const accordionSubGroupPattern = /^accordion_group_(\d+)_accordion_list_(\d+)_tab_title$/
const parseAccordionListsBlock = (data: any): AccordionListsData => {
  let resultParse: { groupTitle: any; tempLists: any[]; accordionLists: any[] }[] = []
  const gallery: { imageId: any }[] = []
  Object.keys(data).forEach(keys => {
    if (accordionGroupPattern.test(keys)) {
      resultParse.push({
        groupTitle: data[keys],
        tempLists: [],
        accordionLists: [],
      })
    } else {
      if (resultParse && resultParse.length > 0) {
        if (accordionGroupPattern.test(keys) || keys.charAt(0) != "_")
          resultParse[resultParse.length - 1].tempLists.push(keys)
      }
    }
  })
  resultParse.forEach((dataRes, i) => {
    let indexes = dataRes.tempLists
      .filter(key => accordionSubGroupPattern.test(key))
      .map(key => key.match(accordionSubGroupPattern)![2])
    indexes.map(value => {
      dataRes.accordionLists.push({
        tabTitle: data[`accordion_group_${i}_accordion_list_${value}_tab_title`],
        contentTitle: data[`accordion_group_${i}_accordion_list_${value}_content_title`],
        content: data[`accordion_group_${i}_accordion_list_${value}_content`],
        imageId: data[`accordion_group_${i}_accordion_list_${value}_image`],
        externalUrl: data[`accordion_group_${i}_accordion_list_${value}_external_url`],
        externalUrlLabel: data[`accordion_group_${i}_accordion_list_${value}_external_url_label`],
      })
      gallery.push({ imageId: data[`accordion_group_${i}_accordion_list_${value}_image`] })
    })
  })

  const accordionListsBlockData = resultParse.map(value => {
    return { groupTitle: value.groupTitle, accordionLists: value.accordionLists }
  })
  return { gallery: gallery, accordionLists: accordionListsBlockData, name: "acf/accordion-list" }
}

const tableDescPattern = /^table_(\d+)_services$/
const parseTableDescBlock = (data: any): TableDescData => {
  console.log(data)

  const indexes = Object.keys(data)
    .filter(key => tableDescPattern.test(key))
    .map(key => key.match(tableDescPattern)![1])

  let tableLists: {
    services: any
    group: { title: any; description: any }
    individual: { title: any; description: any }
  }[] = []
  indexes.forEach(index => {
    tableLists.push({
      services: data[`table_${index}_services`],
      group: {
        title: data[`table_${index}_group_0_title`],
        description: data[`table_${index}_group_0_description`],
      },
      individual: {
        title: data[`table_${index}_individual_0_title`],
        description: data[`table_${index}_individual_0_description`],
      },
    })
  })

  return { title: data["title"], tableLists, name: "acf/table-desc" }
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

// A replace function to convert any string to camelCase
const toCamelCase = (text: string): string => {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (leftTrim: string, index: number) =>
      index === 0 ? leftTrim.toLowerCase() : leftTrim.toUpperCase()
    )
    .replace(/\s+/g, "")
}

const parseRegisterCVBlock = (data: any): RegisterCvData => {
  const dropDownLength = data.professional_info_info_dropdown

  let infoDropdown: IDropDown[] = []

  for (let i = 0; i < dropDownLength; i++) {
    let values = []
    let title = data[`professional_info_info_dropdown_${i}_title`]
    let fieldName = toCamelCase(title)

    for (let j = 0; j < data[`professional_info_info_dropdown_${i}_values`]; j++) {
      values.push(data[`professional_info_info_dropdown_${i}_values_${j}_value`])
    }
    infoDropdown.push({ title, fieldName, values })
  }

  const linkTitle = data.download_link_title ? data.download_link_title : null
  const linkFile = data.download_file ? data.download_file : null

  return {
    heading: data.heading,
    description: data.description,
    downloadLinkTitle: linkTitle,
    downloadFile: linkFile,
    professionalInfo: { infoDropdown },
    name: "acf/register-cv",
  }
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

const parseCourseCardData = (data: any): CourseCardsData => {
  return { name: "acf/course-cards", title: data.title }
}

function AccordionGroupData(arg0: (index: string) => { const: any }, AccordionGroupData: any) {
  throw new Error("Function not implemented.")
}
