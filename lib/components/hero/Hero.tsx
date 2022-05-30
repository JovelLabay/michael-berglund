import { AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"

import { HeroItem } from "./HeroItem"

const heroItemsTemp: heroItemTempProps[] = [
  {
    preTitle: "Executive Search",
    bgClass: "bg-[#1A2241]",
  },
  {
    preTitle: "Interim Management",
    bgClass: "bg-[#3E5C58]",
  },
  {
    preTitle: "Leadership Acceleration",
    bgClass: "bg-[#D4743B]",
  },
  {
    preTitle: "Board Value",
    bgClass: "bg-[#B0BCB2]",
  },
]

interface heroItemTempProps {
  preTitle: string
  bgClass: string
}

export default function Hero() {
  const [heroItems, setHeroItems] = useState<heroItemTempProps[]>(heroItemsTemp)
  const heroContainer = useRef<HTMLDivElement>(null!)

  const animateHandler = () => {
    const items2 = [...heroItems]

    const firstElem = items2.shift()
    firstElem!.preTitle += ` ${Math.random()}`
    setHeroItems([...items2, firstElem!])
  }

  return (
    <div
      ref={heroContainer}
      className="relative flex h-screen flex-col justify-end overflow-hidden bg-rose-200 text-white"
    >
      <div className="absolute bottom-0 right-0 z-20">
        <span className="m-5 rounded-lg border border-white p-4 transition hover:opacity-50">
          {heroItems.length}
        </span>
        <button
          className=" m-5 rounded-lg border border-white p-4 transition hover:opacity-50"
          onClick={animateHandler}
        >
          Animate
        </button>
      </div>

      {/* HERO ITEMS */}

      <AnimatePresence initial={false}>
        {heroItems &&
          heroItems.map(({ preTitle, bgClass }, index) => (
            <HeroItem
              key={preTitle}
              isActive={preTitle === heroItems[0].preTitle}
              preTitle={preTitle}
              className={bgClass}
              expandHeight={heroContainer.current?.clientHeight - heroItems.length * 100 + 100}
              timeoutCallback={animateHandler}
            />
          ))}
      </AnimatePresence>
    </div>
  )
}
