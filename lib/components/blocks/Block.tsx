import {
    BaseBlock, isDataPointsData, isDescWithImageData, isHeroData, isLogowallData,
    isRelatedArticlesData, isReviewSilderData, isShortDescData, isStatsData
} from "@models/blocks"

import { DescWithImgBlock } from "./"
import { DataPointsBlock } from "./DataPointsBlock"
import Hero from "./hero/Hero"
import { LogowallBlock } from "./LogowallBlock"
import { RelatedArticles } from "./RelatedArticles"
import { ReviewSlider } from "./ReviewSlider"
import { ShortDescBlock } from "./ShortDescBlock"
import { StatsBlock } from "./StatsBlock"

export const Block = ({ block }: { block: BaseBlock }) => {
  if (isHeroData(block)) return <Hero {...block} />
  if (isStatsData(block)) return <StatsBlock {...block} />
  if (isDescWithImageData(block)) return <DescWithImgBlock {...block} />
  if (isLogowallData(block)) return <LogowallBlock {...block} />
  if (isReviewSilderData(block)) return <ReviewSlider {...block} />
  if (isRelatedArticlesData(block)) return <RelatedArticles {...block} />
  if (isShortDescData(block)) return <ShortDescBlock {...block} />
  if (isDataPointsData(block)) return <DataPointsBlock {...block} />

  return null
}
