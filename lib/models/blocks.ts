import { AnimatedPage, Courses, HeroType, IDropDown, Page } from "./common"

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
  dataList: {
    dataKey: string
    title: string
    description: string
  }[]
  backgroundColor: "white" | "beige"
  descriptionOnly: boolean
}

export interface LogowallData extends BaseBlock {
  heading: string
  border: "border" | "no-border"
  gallery: {
    imageId: number
  }[]
}

export interface InfoIconData extends BaseBlock {
  heading: string
  gallery: {
    imageId: number
    description: string
  }[]
}

export interface ReviewSliderData extends BaseBlock {
  heading?: string
  backgroundColor: "white" | "beige"
  reviews: {
    reviewText: string
    reviewClient: string
    reviewCompany: string
  }[]
}
export interface RelatedArticleData extends PostData {
  urlLabel: string
  url: string
  newsOnly: boolean
  newsDescription: string | null
  newsFilter: string[]
}

export interface PostData extends BaseBlock {
  title: string
  postIds: number[]
}

export interface ShortDescData extends BaseBlock {
  description: string
  quote: string
  backgroundColor: "white" | "beige"
}

export interface ContactData extends BaseBlock {
  title: string
  medarbetareIds: number[]
  description: string[]
}

export interface DataPointsData extends BaseBlock {
  points: {
    pointNumber: number
    pointSymbol: string
    pointTitle: string
  }[]
  backGroundColor: "white" | "beige"
}

export interface TabsData extends BaseBlock {
  heading: string
  imageId: number
  tabList: {
    title: string
    content: string
  }[]
}

export interface PressFeedData extends BaseBlock {
  title: string
  pressList: PressData[]
}

export interface PressData {
  title: string
  titleId?: string
  details: string
  url: string
  urlLabel: string
  datePublished: string
}

export interface AccordionListsData extends BaseBlock {
  gallery: {
    imageId: number
  }[]
  accordionLists: {
    groupTitle: string
    accordionLists: AccordionGroupData[]
  }[]
}

export interface TableDescData extends BaseBlock {
  title: string
  tableLists: {
    services: string
    individual: {
      content: string
    }
    group: {
      content: string
    }
  }[]
}

export interface ImageGalleryData extends BaseBlock {
  title: any
  gallery: {
    imageId: number
    imageIdKey: string
  }[]
}

export interface AccordionGroupData {
  tabTitle: string
  contentTitle: string
  content: string
  imageId: number
  externalUrl: string
  externalUrlLabel: string
}

export interface AssignmentsData extends BaseBlock {
  title: string
  assignments: {
    title: string
    description: string
  }[]
}

export interface AssignmentsDataPopUp {
  title: string
  description: string
}

export interface RegisterCvData extends BaseBlock {
  heading: string
  description: string
  downloadLinkTitle?: string
  downloadFile?: number
  type?: string
  professionalInfo: {
    coverLetter: "0" | "1"
    infoDropdown: IDropDown[]
  }
}

export interface ContactFeedListblock extends BaseBlock {
  contactLists: ContactData[]
  medarbetareIds?: number[]
  coverPhotoId?: number
  positionList: string[]
}

export interface CourseCardsData extends BaseBlock {
  title: string
}

export interface RightLeftImageData extends BaseBlock {
  heading: string
  description: string
  imageId: number
  link: string
  position: "left" | "right"
}

export interface JobPositionsData {
  id: string
  afcJobPositions: {
    jobDescrption: string
    jobTitle: string
    jobLink: {
      target: string
      title: string
      url: string
    }
    jobCategory: string
  }
  uri: string
}

export interface JobPositionData extends BaseBlock {
  header: string
  jobMessage: string
  jobs: JobPositionsData[]
  JobLinkTitle: string
  jobAvailability: string
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
  | "acf/assignments"
  | "acf/register-cv"
  | "acf/big-page-links"
  | "acf/course-cards"
  | "acf/info-icon"
  | "acf/contact-feed"
  | "acf/accordion-list"
  | "acf/table-desc"
  | "acf/press-feed"
  | "acf/image-gallery"
  | "acf/right-left-image"
  | "acf/job-listing"

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

export function isAssignmentsData(object: any): object is AssignmentsData {
  return object && typeof object.name === "string" && object.name === "acf/assignments"
}

export function isBigPageLinks(object: any): object is PostData {
  return object && typeof object.name === "string" && object.name === "acf/big-page-links"
}

export function isCourseCardData(object: any): object is CourseCardsData {
  return object && typeof object.name === "string" && object.name === "acf/course-cards"
}

export function isInfoIconBlock(object: any): object is InfoIconData {
  return object && typeof object.name === "string" && object.name === "acf/info-icon"
}

export function isContactFeedBlock(object: any): object is ContactFeedListblock {
  return object && typeof object.name === "string" && object.name === "acf/contact-feed"
}

export function isAccordionListBlock(object: any): object is AccordionListsData {
  return object && typeof object.name === "string" && object.name === "acf/accordion-list"
}

export function isTableDesc(object: any): object is TableDescData {
  return object && typeof object.name === "string" && object.name === "acf/table-desc"
}

export function isPressFeedBlock(object: any): object is PressFeedData {
  return object && typeof object.name === "string" && object.name === "acf/press-feed"
}

export function isImageGalleryBlock(object: any): object is ImageGalleryData {
  return object && typeof object.name === "string" && object.name === "acf/image-gallery"
}

export function isRightLeftImageBlock(object: any): object is RightLeftImageData {
  return object && typeof object.name === "string" && object.name === "acf/right-left-image"
}

export function isJobPositionData(object: any): object is JobPositionData {
  return object && typeof object.name === "string" && object.name === "acf/job-listing"
}
