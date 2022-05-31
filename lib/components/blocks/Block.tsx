import Hero from "@components/hero/Hero"
import {
    BaseBlock, isDescWithImageData, isHeroData, isLogowallData, isStatsData
} from "@models/blocks"

import { DescWithImgBlock } from "./"
import { LogowallBlock } from "./LogowallBlock"
import { StatsBlock } from "./StatsBlock"

export const Block = ({ block }: { block: BaseBlock }) => {
  if (isHeroData(block)) return <Hero {...block} />
  if (isStatsData(block)) return <StatsBlock {...block} />
  if (isDescWithImageData(block)) return <DescWithImgBlock {...block} />
  if (isLogowallData(block)) return <LogowallBlock {...block} />

  return null
}
