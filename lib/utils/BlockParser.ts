type Blocks = { attributesJSON: string }[]

export const parse = (rawBlocks: Blocks) => {
  // parse attributes from string to javascript objects
  const blockAttributes = rawBlocks.map(({ attributesJSON }) => JSON.parse(attributesJSON))

  // parse blocks according to their types
  const blocks = blockAttributes.map(({ data, name }) => {
    switch (name) {
      case "acf/hero":
        return "hero-block"
      default:
        throw new Error(`Unknown block type: ${name}`)
    }
  })

  console.log(blocks)
}
