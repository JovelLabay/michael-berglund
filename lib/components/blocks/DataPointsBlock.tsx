import { useEffect, useMemo, useRef, useState } from "react"

import { Counter } from "@components/counter"
import { DataPointsData } from "@models/blocks"

export const DataPointsBlock = ({ points }: DataPointsData) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const startCountAnimation = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)
  }

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(startCountAnimation, options)

    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [containerRef, options])

  // Build the points.
  const _points = useMemo(
    () => points.map(point => <Counter key={point.pointNumber} {...point} />),
    [points]
  )

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-between bg-light-beige px-12 pt-[100px] pb-[120px]"
    >
      {isVisible && _points}
    </div>
  )
}
