import classNames from "classnames"
import { useEffect, useState } from "react"
import { usePageVisibility } from "react-page-visibility"

export interface HeroItemProgressBarProps {
  timeoutCallback: () => void
  className?: string
}

export const HeroItemProgressBar = ({ timeoutCallback, className }: HeroItemProgressBarProps) => {
  const timeout = 5000
  const isVisible = usePageVisibility()

  const [percentage, setPercentage] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [isAnimate, setIsAnimate] = useState(false)

  useEffect(() => {
    setPercentage(100)
    const timer = setTimeout(() => {
      setIsAnimate(true)
    }, timeout)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (isAnimate && isVisible) {
      setOpacity(0)
      timeoutCallback()
    }
  }, [isAnimate, isVisible, timeoutCallback])

  return (
    <div
      className={classNames("h-0.5 w-full bg-dark-beige transition-opacity", className)}
      style={{ opacity: opacity }}
    >
      <div
        className="h-full w-full bg-white"
        style={{
          marginLeft: `${-(100 - percentage)}%`,
          transition: `margin-left ${timeout}ms linear`,
        }}
      ></div>
    </div>
  )
}
