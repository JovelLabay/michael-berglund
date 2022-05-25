import classNames from "classnames"
import { motion } from "framer-motion"

export interface HeroItemProps {
  key: string
  isActive: boolean
  preTitle: string
  className?: string
}

export function HeroItem({ key, isActive, preTitle, className }: HeroItemProps) {
  return (
    <motion.div
      key={key}
      initial={{ height: 0 }}
      animate={isActive ? { height: "auto" } : { height: 100 }}
      transition={{ duration: 1 }}
      exit={{ height: 0 }}
      className={classNames("flex px-12", className, {
        "items-center": !isActive,
        "items-end pb-[42px]": isActive,
      })}
    >
      <div className="flex w-full justify-between">
        <span>{preTitle}</span>
        {isActive && <span>Learn more</span>}
      </div>
    </motion.div>
  )
}
