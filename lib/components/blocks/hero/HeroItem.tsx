import classNames from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

import { AppLink } from "@components/shared/AppLink"
import { ArrowRight } from "@icons/ArrowRight"
import { LogoDots } from "@icons/LogoDots"
import { Page } from "@models/common"

import { HeroItemProgressBar } from "./HeroItemProgressBar"

export interface HeroItemProps {
  index: number
  isActive: boolean
  mainTitle: string
  preTitle: string
  linkText: string
  expandDimension: expandImageDimension
  pageData: Page
  colorOverlay: string
  className?: string
  cancelAnimation: boolean
  timeoutCallback: () => void
  clickHandler: (index: number) => void
}

export interface expandImageDimension {
  width: number
  height: number
}

export function HeroItem({
  index,
  isActive,
  mainTitle,
  preTitle,
  linkText,
  expandDimension,
  pageData,
  colorOverlay,
  className,
  cancelAnimation,
  timeoutCallback,
  clickHandler,
}: HeroItemProps) {
  const [isHovered, setHovered] = useState(false)
  let heroHeight = isActive ? expandDimension.height - 100 : 0
  const image = pageData.featuredImage.node
  const pageLink = pageData.uri

  return (
    <motion.div
      key={preTitle}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ opacity: 0.5 }}
      transition={{ duration: 0.75, easings: "linear" }}
      className={classNames("relative", className, { "cursor-pointer": !isActive })}
      onClick={() => {
        if (!isActive) clickHandler(index)
      }}
    >
      {/* Base */}
      <motion.div animate={{ height: heroHeight }} transition={{ duration: 0.85 }}></motion.div>
      <div className="h-12 lg:h-[100px]"></div>
      {/* Background Image - Layer 1 */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <Image
          src={image.mediaItemUrl}
          alt={image.altText}
          width={expandDimension.width}
          height={expandDimension.height}
          objectFit="cover"
          className={classNames("bottom-0 transition-all duration-1000", {
            "blur-[15px]": !isActive,
          })}
        />
      </div>
      {/* Overlay - Layer 2 */}
      <div
        className="absolute inset-0 z-20 opacity-50"
        style={{ backgroundColor: colorOverlay }}
      ></div>

      {/* Text Layer - Layer 3 */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, translateY: 150 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -50 }}
            transition={{ duration: 0.85 }}
            className="app-h2 absolute bottom-[220px] z-30 mx-5 max-w-[660px] font-lora text-light-beige lg:mx-12"
          >
            {/* For Mobile Only */}
            <div
              className={classNames("mb-8 flex items-center", {
                "flex md:hidden": isActive,
              })}
            >
              <motion.div
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 1.5, delay: 0.15 }}
              >
                <LogoDots />
              </motion.div>
              <motion.h2
                animate={{ marginLeft: isActive ? 20 : -20 }}
                transition={{ duration: 1, delay: 0.15 }}
                className="pre-title uppercase tracking-[0.15em] text-white"
              >
                {preTitle}
              </motion.h2>
            </div>

            <h3>{mainTitle}</h3>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={classNames(
          "section-padding absolute bottom-0 z-30 flex  w-full justify-between py-4 font-[350] lg:py-10",
          { "pb-10": isActive }
        )}
        onMouseEnter={() => {
          if (!isActive) setHovered(true)
        }}
        onMouseLeave={() => {
          if (isHovered) setHovered(false)
        }}
      >
        <div
          className={classNames("flex items-center", {
            "hidden md:flex": isActive,
          })}
        >
          {/* {isActive && <LogoDots />} */}
          <motion.div
            animate={{ opacity: isActive || isHovered ? 1 : 0 }}
            transition={{ duration: isHovered ? 0.5 : 1.5 }}
          >
            <LogoDots />
          </motion.div>
          <motion.h2
            animate={{ marginLeft: isActive || isHovered ? 20 : -20 }}
            transition={{ duration: isHovered ? 0.5 : 1 }}
            className="pre-title uppercase tracking-[0.15em] text-white"
          >
            {preTitle}
          </motion.h2>
        </div>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <AppLink
              href={pageLink}
              className="hover-text-white group flex items-center space-x-[10px]"
            >
              <span className="link-m">{linkText}</span>
              <ArrowRight className="fill-white group-hover:fill-medium-beige" />
            </AppLink>
          </motion.div>
        )}
      </div>
      {isActive && (
        <HeroItemProgressBar
          timeoutCallback={timeoutCallback}
          clearTimer={cancelAnimation}
          className="absolute bottom-0 z-30"
        />
      )}
    </motion.div>
  )
}
