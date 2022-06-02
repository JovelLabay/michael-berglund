
import { HeroData } from "@models/blocks"

import { AnimatedHero } from "./AnimatedHero"
import { BasicHero } from "./BasicHero"

export default function Hero(props: HeroData) {
  return props.type === "animated" ? <AnimatedHero {...props} /> : <BasicHero {...props} />
}
