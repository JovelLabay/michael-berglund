import classNames from "classnames"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

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
  const [activeIndex, setActiveIndex] = useState(0)
  const [heroItems, setHeroItems] = useState(heroItemsTemp)

  const animateHandler = () => {
    setActiveIndex(index => (index === 3 ? 0 : index + 1))
    // setHeroItems(items => {
    //   //   const arr = [...items]
    //   //   return arr.push(arr.shift())
    //   return items.push(items.shift()!)
    // })

    // const items = [...heroItems]
    // // items.push(items.shift()!)

    // console.log(items.shift())
    // setHeroItems(items)
  }

  const addHandler = () => {
    setHeroItems([
      ...heroItems,
      {
        preTitle: "NEW ITEM",
        bgClass: "bg-[#D4743B]",
      },
    ])
  }

  const removeHandler = () => {
    console.log("helloworld")
    const items = [...heroItems]
    items.shift()
    setHeroItems(items)
  }

  useEffect(() => {
    console.log("HERO COMPONENT!")
    console.log(heroItemsTemp)
  }, [])

  return (
    <div className="relative flex h-screen flex-col justify-end overflow-hidden bg-rose-200 text-white">
      <span className="absolute top-0 left-0 m-5 rounded-lg border border-white p-4 transition hover:opacity-50">
        {activeIndex}
      </span>
      <div className="absolute top-0 right-0">
        <button
          className=" m-5 rounded-lg border border-white p-4 transition hover:opacity-50"
          onClick={animateHandler}
        >
          Animate
        </button>
        <button
          className=" m-5 rounded-lg border border-white p-4 transition hover:opacity-50"
          onClick={addHandler}
        >
          Add
        </button>
        <button
          className=" m-5 rounded-lg border border-white p-4 transition hover:opacity-50"
          onClick={removeHandler}
        >
          Remove
        </button>
      </div>

      {/* HERO ITEMS */}

      <AnimatePresence>
        {heroItems &&
          heroItems.map(({ preTitle, bgClass }, index) => (
            <HeroItem
              key={index.toString()}
              isActive={activeIndex === index}
              preTitle={preTitle}
              className={bgClass}
            />
          ))}
      </AnimatePresence>

      {/* <HeroItem isActive={activeIndex === 0} preTitle="Executive Search" className="bg-[#1A2241]" />
      <HeroItem
        isActive={activeIndex === 1}
        preTitle="Interim Management"
        className="bg-[#3E5C58]"
      />
      <HeroItem
        isActive={activeIndex === 2}
        preTitle="Leadership Acceleration"
        className="bg-[#D4743B]"
      />
      <HeroItem isActive={activeIndex === 3} preTitle="Board Value" className="bg-[#B0BCB2]" /> */}

      {/* <div
        className={classNames("flex items-end  bg-[#3E5C58] py-[42px] px-12", {
          "flex-1": activeIndex === 1,
        })}
      >
        <div className="flex w-full justify-between">
          <span>Interim Management</span>
          <span>Learn more</span>
        </div>
      </div>
      <div
        className={classNames("flex items-end  bg-[#D4743B] py-[42px] px-12", {
          "flex-1": activeIndex === 2,
        })}
      >
        <div className="flex w-full justify-between">
          <span>Leadership Acceleration</span>
          <span>Learn more</span>
        </div>
      </div>
      <div
        className={classNames("flex items-end  bg-[#B0BCB2] py-[42px] px-12", {
          "flex-1": activeIndex === 3,
        })}
      >
        <div className="flex w-full justify-between">
          <span>Board Value</span>
          <span>Learn more</span>
        </div>
      </div> */}
      {/* <div className=" py-[42px] px-12">Executive Search 222</div>
      <div className=" py-[42px] px-12">Interim Management 222</div> */}
    </div>
  )
}
