import { useGlobalContext } from "@context/global"
import { AnimatePresence } from "framer-motion"
import { useCallback, useRef, useState } from "react"

import { HeroData } from "@models/blocks"
import { AnimatedPage } from "@models/common"

import { HeroItem } from "./HeroItem"

export default function Hero({ pages }: HeroData) {
  console.log("hero component")
  const { pageMap } = useGlobalContext()
  const [heroItems, setHeroItems] = useState<AnimatedPage[]>(pages!)
  const heroContainer = useRef<HTMLDivElement>(null!)

  const animateHandler = useCallback(() => {
    const tempHeroList = [...heroItems]
    const firstElem = tempHeroList.shift()

    firstElem!.pageId += Math.random()
    setHeroItems([...tempHeroList, firstElem!])
  }, [heroItems])

  return (
    <div
      ref={heroContainer}
      className="relative flex h-screen flex-col justify-end overflow-hidden bg-dark-blue text-white"
    >
      {/* HERO ITEMS */}
      <AnimatePresence initial={false}>
        {heroItems &&
          heroItems.map(({ pageId, preTitle, mainTitle }) => {
            const pageData = pageMap![pageId]

            return (
              <HeroItem
                key={pageId}
                pageData={pageData}
                isActive={preTitle === heroItems[0].preTitle}
                mainTitle={mainTitle}
                preTitle={preTitle}
                expandHeight={heroContainer.current?.clientHeight - heroItems.length * 100 + 100}
                timeoutCallback={animateHandler}
              />
            )
          })}
      </AnimatePresence>
    </div>
  )
}
