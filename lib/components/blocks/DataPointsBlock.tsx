import { DataPointsData } from "@models/blocks"

export const DataPointsBlock = ({ points }: DataPointsData) => {
  const _points = points.map(point => (
    <div className="flex w-[309px] flex-col items-center">
      <div className="app-h1 mb-4 text-dark-beige">
        <span>{point.pointNumber}</span>
        {point.pointSymbol && <span>{point.pointSymbol}</span>}
      </div>
      <div className="body-l text-dark-beige">{point.pointTitle}</div>
    </div>
  ))

  return (
    <div className="flex items-center justify-between bg-light-beige px-12 pt-[100px] pb-[120px]">
      {_points}
    </div>
  )
}
