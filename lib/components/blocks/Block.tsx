import {
    BaseBlock, isDescWithImageData, isHeroData, isRelatedArticlesData, isStatsData
} from "@models/blocks"

import { DescWithImgBlock } from "./"
import Hero from "./hero/Hero"
import { RelatedArticles } from "./RelatedArticles"
import { StatsBlock } from "./StatsBlock"

export const Block = ({ block }: { block: BaseBlock }) => {
  if (isHeroData(block)) return <Hero {...block} />
  if (isStatsData(block)) return <StatsBlock {...block} />
  if (isDescWithImageData(block)) return <DescWithImgBlock {...block} />
  if (isRelatedArticlesData(block)) return <RelatedArticles {...block} />

  return null
}
