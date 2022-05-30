import { BlocksUnion, isDescWithImageData, isStatsData } from "@models/blocks"

import { DescWithImgBlock } from "./"
import { StatsBlock } from "./StatsBlock"

export const Block = ({ block }: { block: BlocksUnion }) => {
  if (isStatsData(block)) return <StatsBlock {...block} />
  if (isDescWithImageData(block)) return <DescWithImgBlock {...block} />

  return null
}
