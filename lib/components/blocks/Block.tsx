import {
    BaseBlock, isAssignmentsData, isBigPageLinks, isContactData, isDataPointsData,
    isDescWithImageData, isHeroData, isInfoIconBlock, isLogowallData, isRelatedArticlesData,
    isReviewSilderData, isShortDescData, isStatsData, isTabsData
} from "@models/blocks"

import { DescWithImgBlock } from "./"
import { Assignments } from "./Assignments"
import { BigPageLinks } from "./BigPageLinksBlock"
import { Contact } from "./Contact"
import { DataPointsBlock } from "./DataPointsBlock"
import Hero from "./hero/Hero"
import { InfoIconBlock } from "./InfoIconBlock"
import { LogowallBlock } from "./LogowallBlock"
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
  if (isInfoIconBlock(block)) return <InfoIconBlock {...block} />
  return null
}
