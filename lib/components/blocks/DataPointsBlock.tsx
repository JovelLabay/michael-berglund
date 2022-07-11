import classNames from "classnames"
import { useEffect, useMemo, useRef, useState } from "react"

import { Counter } from "@components/counter"
import { DataPointsData } from "@models/blocks"

export const DataPointsBlock = ({ points, backGroundColor }: DataPointsData) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const startCountAnimation = (entries: IntersectionObserverEntry[], observer: any) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting)

    //Only runs the animation once.
    if (entry.isIntersecting) {
      observer.unobserve(containerRef.current)
    }
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    }

    const pointsElement = containerRef.current
    const observer = new IntersectionObserver(startCountAnimation, options)

    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      if (pointsElement) observer.unobserve(pointsElement)
    }
  }, [containerRef])

  // Build the points.
  const _points = useMemo(
    () => points.map(point => <Counter key={point.pointNumber} {...point} />),
    [points]
  )

  return (
    <section
      ref={containerRef}
      className={classNames(
        "section-padding flex flex-col items-center justify-between space-y-7 bg-white pb-[60px] md:flex-row md:space-y-0 lg:pb-[120px]",
        { "bg-light-beige": backGroundColor === "beige" }
      )}
    >
      {isVisible && _points}
    </section>
  )
}
