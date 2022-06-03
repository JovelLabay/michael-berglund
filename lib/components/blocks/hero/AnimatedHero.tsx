import { useGlobalContext } from "@context/global"
import { AnimatePresence } from "framer-motion"
import React, { useCallback, useRef, useState } from "react"

import { HeroData } from "@models/blocks"
import { AnimatedPage } from "@models/common"

import { HeroItem } from "./HeroItem"

export const AnimatedHero = ({ pages }: HeroData) => {
  const { pageMap } = useGlobalContext()
  const [heroItems, setHeroItems] = useState<AnimatedPage[]>(pages!)
  const heroContainer = useRef<HTMLDivElement>(null!)

  const animateHandler = useCallback(() => {
    const tempHeroList = [...heroItems]
    const firstElem = tempHeroList.shift()

    firstElem!.id += Math.random()
    setHeroItems([...tempHeroList, firstElem!])
  }, [heroItems])

  return (
    <section
      ref={heroContainer}
      className="relative flex h-screen flex-col justify-end overflow-hidden bg-dark-blue text-white"
    >
      {/* HERO ITEMS */}
      <AnimatePresence initial={false}>
        {heroItems &&
          heroItems.map(({ id, pageId, preTitle, mainTitle, colorOverlay }) => {
            const pageData = pageMap![pageId]

            return (
              <HeroItem
                key={id}
                pageData={pageData}
                isActive={preTitle === heroItems[0].preTitle}
                mainTitle={mainTitle}
                preTitle={preTitle}
                colorOverlay={colorOverlay}
                expandHeight={heroContainer.current?.clientHeight - heroItems.length * 100 + 100}
                timeoutCallback={animateHandler}
              />
            )
          })}
      </AnimatePresence>
    </section>
  )
}
