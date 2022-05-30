import {
    BaseBlock, DescWithImageData, isDescWithImageData, isStatsData, StatsData
} from "@models/blocks"

type Blocks = { attributesJSON: string }[]

export const parse = (rawBlocks: Blocks): { blocks: BaseBlock[] } => {
  // parse attributes from string to javascript objects
  const blockAttributes = rawBlocks.map(({ attributesJSON }) => JSON.parse(attributesJSON))

  // parse blocks according to their types
  const blocks = blockAttributes.map(({ data, name }) => {
    switch (name) {
      case "acf/hero":
        return data //TODO: add parse for hero.
      case "acf/stats":
        return parseStatsBlock(data)
      case "acf/desc-image":
        return parseDescWithImageBlock(data)
      default:
        throw new Error(`Unknown block type: ${name}`)
    }
  })

  return { blocks }
}

//collect all unique image ids used by different blocks
export const getImageIds = (blocks: BaseBlock[]): number[] => {
  const mapper = (block: BaseBlock) => {
    if (isStatsData(block)) return block.gallery.map(({ imageId }: any) => imageId)
    else if (isDescWithImageData(block)) return [block.imageId]

    return []
  }

  return Array.from(new Set(blocks.map(mapper).flatMap(ids => ids)))
}

// TODO: add getPageIds method

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
