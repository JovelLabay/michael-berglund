import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import { usePageVisibility } from "react-page-visibility"

export interface HeroItemProgressBarProps {
  timeoutCallback: () => void
  className?: string
  clearTimer?: boolean
}

export const HeroItemProgressBar = ({
  timeoutCallback,
  className,
  clearTimer,
}: HeroItemProgressBarProps) => {
  const timeout = 5000
  const isVisible = usePageVisibility()

  const [percentage, setPercentage] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const [isAnimate, setIsAnimate] = useState(false)
  const hasAnimated = useRef(false)

  const timerRef = useRef<NodeJS.Timeout>(null!)

  useEffect(() => {
    if (clearTimer) clearTimeout(timerRef.current)
  }, [clearTimer])

  useEffect(() => {
    setPercentage(100)
    timerRef.current = setTimeout(() => {
      setIsAnimate(true)
    }, timeout)

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!hasAnimated.current && isAnimate && isVisible) {
      setOpacity(0)
      timeoutCallback()
      hasAnimated.current = true
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
