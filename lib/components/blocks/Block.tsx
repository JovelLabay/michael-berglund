import Hero from "@components/hero/Hero"
import { BaseBlock, isDescWithImageData, isHeroData, isStatsData } from "@models/blocks"

import { DescWithImgBlock } from "./"
import { StatsBlock } from "./StatsBlock"

export const Block = ({ block }: { block: BaseBlock }) => {
  if (isHeroData(block)) return <Hero {...block} />
  if (isStatsData(block)) return <StatsBlock {...block} />
  if (isDescWithImageData(block)) return <DescWithImgBlock {...block} />

  return null
}
