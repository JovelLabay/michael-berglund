import { BaseBlock, isDescWithImageData, isStatsData } from "@models/blocks"

import { DescWithImgBlock } from "./"
import { StatsBlock } from "./StatsBlock"

export const Block = ({ block }: { block: BaseBlock }) => {
  if (isStatsData(block)) return <StatsBlock {...block} />
  else if (isDescWithImageData(block)) return <DescWithImgBlock {...block} />

  return null
}
