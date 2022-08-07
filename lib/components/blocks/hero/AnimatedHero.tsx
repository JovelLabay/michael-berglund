import { useGlobalContext } from "@context/global"
import { AnimatePresence } from "framer-motion"
import React, { useCallback, useEffect, useRef, useState } from "react"

import { HeroData } from "@models/blocks"
import { AnimatedPage } from "@models/common"

import { expandImageDimension, HeroItem } from "./HeroItem"

export const AnimatedHero = ({ pages }: HeroData) => {
  const { pageMap } = useGlobalContext()
  const [cancelAnimation, setCancelAnimation] = useState(false)
  const [heroItems, setHeroItems] = useState<AnimatedPage[]>(pages!)
  const heroContainer = useRef<HTMLDivElement>(null!)

  const [imageDimenstions, setImageDimenstions] = useState<expandImageDimension>({
    width: 0,
    height: 0,
  })

  const animationHandler = useCallback(() => {
    setHeroItems(shiftHeroItems(heroItems))
  }, [heroItems])

  const clickHandler = useCallback(
    (index: number) => {
      const tempHeroList = [...heroItems]
      setCancelAnimation(true)

      setHeroItems(shiftHeroItems(heroItems, index))
    },
    [heroItems]
  )

  useEffect(() => {
    const handleResize = () => {
      const initialHeroHeight = window.matchMedia("(min-width: 1024px)").matches ? 100 : 30

      setImageDimenstions({
        width: window.innerWidth,
        height: window.innerHeight - heroItems.length * initialHeroHeight + initialHeroHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [heroItems.length])

  return (
    <section
      ref={heroContainer}
      className="relative flex h-screen flex-col justify-end overflow-hidden text-white"
    >
      {imageDimenstions.height > 0 && (
        <AnimatePresence initial={false}>
          {heroItems &&
            heroItems.map(({ id, pageId, preTitle, mainTitle, linkText, colorOverlay }, index) => {
              const pageData = pageMap![pageId]

              return (
                <HeroItem
                  index={index}
                  key={id}
                  pageData={pageData}
                  isActive={preTitle === heroItems[0].preTitle}
                  mainTitle={mainTitle}
                  preTitle={preTitle}
                  linkText={linkText}
                  colorOverlay={colorOverlay}
                  expandDimension={imageDimenstions}
                  cancelAnimation={cancelAnimation}
                  timeoutCallback={animationHandler}
                  clickHandler={clickHandler}
                />
              )
            })}
        </AnimatePresence>
      )}
    </section>
  )
}

function shiftHeroItems(heroItems: AnimatedPage[], count: number = 1) {
  let shiftedHeroItems: AnimatedPage[] = [...heroItems]

  for (let i = 0; i < count; i++) {
    const firstElem = shiftedHeroItems.shift()

    firstElem!.id += Math.random()

    shiftedHeroItems = [...shiftedHeroItems, firstElem!]
  }

  return shiftedHeroItems
}
