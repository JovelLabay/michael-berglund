import { useEffect, useState } from "react"

interface CounterProps {
  pointNumber: number
  pointSymbol: string
  pointTitle: string
}

//Easing function.
const easeOutQuad = (t: number) => t * (2 - t)

export const Counter = ({ pointNumber, pointSymbol, pointTitle }: CounterProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const frameDuration = 1000 / 60
    let frame = 0

    const totalFrames = Math.round(duration / frameDuration)

    const timer = setInterval(() => {
      frame++
      const progress = easeOutQuad(frame / totalFrames)
      setCount(pointNumber * progress)

      if (frame === totalFrames) {
        clearInterval(timer)
      }
    }, frameDuration)

    return () => {
      clearInterval(timer)
    }
  }, [pointNumber])

  return (
    <div className="flex w-[309px] flex-col items-center">
      <div className="app-h1 mb-4 text-dark-beige">
        <span>{Math.floor(count)}</span>
        {pointSymbol && <span>{pointSymbol}</span>}
      </div>
      <div className="body-l text-dark-beige">{pointTitle}</div>
    </div>
  )
}
