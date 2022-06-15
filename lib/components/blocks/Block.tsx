import {
    BaseBlock, isAccordionListBlock, isAssignmentsData, isBigPageLinks, isContactData,
    isContactFeedBlock, isCourseCardData, isDataPointsData, isDescWithImageData, isHeroData,
    isImageGalleryBlock, isInfoIconBlock, isLogowallData, isPressFeedBlock, isRelatedArticlesData,
    isReviewSilderData, isShortDescData, isStatsData, isTabsData
} from "@models/blocks"

import { DescWithImgBlock } from "./"
import { AccordionListBlock } from "./accordion/AccordionListBlock"
import { Assignments } from "./Assignments"
import { BigPageLinks } from "./BigPageLinksBlock"
import { Contact } from "./Contact"
import { ContactFeedBlock } from "./ContactFeedBlock"
import { CourseCards } from "./CourseCards"
import { DataPointsBlock } from "./DataPointsBlock"
import Hero from "./hero/Hero"
import { ImageGalleryBlock } from "./ImageGalleryBlock"
import { InfoIconBlock } from "./InfoIconBlock"
import { LogowallBlock } from "./LogowallBlock"
import { PressFeedBlock } from "./PressFeedBlock"
import { RelatedArticles } from "./RelatedArticles"
import { ReviewSlider } from "./ReviewSlider"
import { ShortDescBlock } from "./ShortDescBlock"
import { StatsBlock } from "./StatsBlock"
import { TabsBlock } from "./TabsBlock"

export const Block = ({ block }: { block: BaseBlock }) => {
  if (isHeroData(block)) return <Hero {...block} />
  if (isStatsData(block)) return <StatsBlock {...block} />
  if (isDescWithImageData(block)) return <DescWithImgBlock {...block} />
  if (isLogowallData(block)) return <LogowallBlock {...block} />
  if (isReviewSilderData(block)) return <ReviewSlider {...block} />
  if (isRelatedArticlesData(block)) return <RelatedArticles {...block} />
  if (isShortDescData(block)) return <ShortDescBlock {...block} />
  if (isContactData(block)) return <Contact {...block} />
  if (isDataPointsData(block)) return <DataPointsBlock {...block} />
  if (isTabsData(block)) return <TabsBlock {...block} />
  if (isAssignmentsData(block)) return <Assignments {...block} />
  if (isBigPageLinks(block)) return <BigPageLinks {...block} />
  if (isCourseCardData(block)) return <CourseCards {...block} />
  if (isInfoIconBlock(block)) return <InfoIconBlock {...block} />
  if (isContactFeedBlock(block)) return <ContactFeedBlock {...block} />
  if (isAccordionListBlock(block)) return <AccordionListBlock {...block} />
  if (isPressFeedBlock(block)) return <PressFeedBlock {...block} />
  if (isImageGalleryBlock(block)) return <ImageGalleryBlock {...block} />
  return null
}
