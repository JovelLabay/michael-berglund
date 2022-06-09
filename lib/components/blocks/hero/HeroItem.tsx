import classNames from "classnames"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"

import { AppLink } from "@components/shared/AppLink"
import { ArrowRight } from "@icons/ArrowRight"
import { LogoDots } from "@icons/LogoDots"
import { Page } from "@models/common"

import { HeroItemProgressBar } from "./HeroItemProgressBar"

export interface HeroItemProps {
  isActive: boolean
  mainTitle: string
  preTitle: string
  linkText: string
  expandDimension: expandImageDimension
  pageData: Page
  colorOverlay: string
  className?: string
  timeoutCallback: () => void
}

export interface expandImageDimension {
  width: number
  height: number
}

export function HeroItem({
  isActive,
  mainTitle,
  preTitle,
  linkText,
  expandDimension,
  pageData,
  colorOverlay,
  className,
  timeoutCallback,
}: HeroItemProps) {
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
      className={classNames("relative", className)}
    >
      {/* Base */}
      <motion.div animate={{ height: heroHeight }} transition={{ duration: 0.85 }}></motion.div>
      <div className="h-[100px]"></div>
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
            className="app-h2 absolute bottom-[220px] z-30 mx-12 max-w-[660px] font-lora text-light-beige"
          >
            <h3>{mainTitle}</h3>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-padding absolute bottom-0 z-30 flex  w-full justify-between pb-10 font-[350]">
        <div
          className={classNames("flex items-center", {
            "hidden md:flex": isActive,
          })}
        >
          {/* {isActive && <LogoDots />} */}
          <motion.div animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 1.5 }}>
            <LogoDots />
          </motion.div>
          <motion.h2
            animate={{ marginLeft: isActive ? 20 : -20 }}
            transition={{ duration: 1 }}
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
        <HeroItemProgressBar timeoutCallback={timeoutCallback} className="absolute bottom-0 z-30" />
      )}
    </motion.div>
  )
}
