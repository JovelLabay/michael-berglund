import { useGlobalContext } from "@context/global"
import { AnimatePresence } from "framer-motion"
import React, { useCallback, useEffect, useRef, useState } from "react"

import { HeroData } from "@models/blocks"
import { AnimatedPage } from "@models/common"

import { expandImageDimension, HeroItem } from "./HeroItem"

export const AnimatedHero = ({ pages }: HeroData) => {
  const { pageMap } = useGlobalContext()
  const [heroItems, setHeroItems] = useState<AnimatedPage[]>(pages!)
  const heroContainer = useRef<HTMLDivElement>(null!)

  const [imageDimenstions, setImageDimenstions] = useState<expandImageDimension>({
    width: 0,
    height: 0,
  })

  const animationHandler = useCallback(() => {
    const tempHeroList = [...heroItems]
    const firstElem = tempHeroList.shift()

    firstElem!.id += Math.random()
    setHeroItems([...tempHeroList, firstElem!])
  }, [heroItems])

  useEffect(() => {
    const handleResize = () => {
      setImageDimenstions({
        width: window.innerWidth,
        height: window.innerHeight - heroItems.length * 100 + 100,
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
      className="relative flex h-screen flex-col justify-end overflow-hidden  text-white"
    >
      {imageDimenstions.height > 0 && (
        <AnimatePresence initial={false}>
          {heroItems &&
            heroItems.map(({ id, pageId, preTitle, mainTitle, linkText, colorOverlay }) => {
              const pageData = pageMap![pageId]

              return (
                <HeroItem
                  key={id}
                  pageData={pageData}
                  isActive={preTitle === heroItems[0].preTitle}
                  mainTitle={mainTitle}
                  preTitle={preTitle}
                  linkText={linkText}
                  colorOverlay={colorOverlay}
                  expandDimension={imageDimenstions}
                  timeoutCallback={animationHandler}
                />
              )
            })}
        </AnimatePresence>
      )}
    </section>
  )
}
