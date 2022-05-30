import {
    BlocksUnion, DescWithImageData, isDescWithImageData, isStatsData, StatsData
} from "@models/blocks"

type Blocks = { attributesJSON: string }[]

export const parse = (rawBlocks: Blocks): { blocks: BlocksUnion[]; imagesIds: number[] } => {
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

  //collect all unique image ids used by different blocks

  const mapper = (block: BlocksUnion) => {
    if (isStatsData(block)) return block.gallery.map(({ imageId }: any) => imageId)
    if (isDescWithImageData(block)) return [block.imageId]

    return []
  }

  const imagesIds = Array.from(new Set(blocks.map(mapper).flatMap(ids => ids)))

  return { blocks, imagesIds }
}

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
