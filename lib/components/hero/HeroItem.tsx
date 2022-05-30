import classNames from "classnames"
import { motion } from "framer-motion"

import { HeroItemProgressBar } from "./HeroItemProgressBar"

export interface HeroItemProps {
  isActive: boolean
  preTitle: string
  expandHeight: number
  className?: string
  timeoutCallback: () => void
}

export function HeroItem({
  isActive,
  preTitle,
  expandHeight,
  className,
  timeoutCallback,
}: HeroItemProps) {
  let heroHeight: number | string = 0

  if (isActive) {
    heroHeight = typeof expandHeight !== "number" || isNaN(expandHeight) ? "100vh" : expandHeight
  }

  return (
    <motion.div
      key={preTitle}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={classNames(className)}
    >
      <motion.div animate={{ height: heroHeight }} transition={{ duration: 1 }}></motion.div>
      <div className="flex h-[100px] w-full justify-between px-12">
        <span>{preTitle}</span>
        {isActive && <span>Learn more</span>}
      </div>
      {isActive && <HeroItemProgressBar timeoutCallback={timeoutCallback} />}
    </motion.div>
  )
}
