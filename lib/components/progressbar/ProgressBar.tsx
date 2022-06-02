import { useNProgress } from "@tanem/react-nprogress"

export interface ProgressBarProps {
  isAnimating: boolean
}

export const ProgressBar = ({ isAnimating }: ProgressBarProps) => {
  const { animationDuration, isFinished, progress } = useNProgress({ isAnimating })

  return (
    <div
      className="pointer-events-none"
      style={{ opacity: isFinished ? 0 : 1, transition: `opacity ${animationDuration}ms linear` }}
    >
      <div
        className="fixed left-0 top-0 z-[150] h-0.5 w-full bg-white"
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left ${animationDuration}ms linear`,
        }}
      ></div>
    </div>
  )
}
