import { useGlobalContext } from "@context/global"

import { LogowallData } from "@models/blocks"

//TODO: Add images from global.
export const LogowallBlock = ({ heading, gallery }: LogowallData) => {
  const mocklogos = [1, 2, 3, 4, 5, 6, 7, 8]

  const _logos = mocklogos.map(logo => <div className="h-10 w-[160px] bg-black"></div>)

  return (
    <div className="flex h-[300px] flex-col items-center bg-light-beige pt-[100px]">
      <h3 className="app-h3 mb-[70px] text-dark-blue">{heading}</h3>
      <div className="flex flex-wrap justify-center gap-y-10 gap-x-20 px-[296px]">{_logos}</div>
    </div>
  )
}
