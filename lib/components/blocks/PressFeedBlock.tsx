import { useState } from "react"

import { Card } from "@components/cards"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ExternalUrlIcon } from "@icons/ExternalUrlIcon"
import { NewsPaper } from "@icons/NewsPaper"
import { PlusIcon } from "@icons/PlusIcon"
import { PressData, PressFeedData } from "@models/blocks"

export const PressFeedBlock = ({ title, pressList }: PressFeedData) => {
  const pageSize = 8
  const totalPages = Math.ceil(pressList.length / pageSize)
  const [counter, setCounter] = useState(0)
  const [pressCardDisplay, setPressCardDisplay] = useState(
    splitPageLoadMore(pressList, pageSize, counter)
  )

  const loadMoreHandler = () => {
    setCounter(prevCount => prevCount + 1)
    setPressCardDisplay((previousCardDisplay: any) => [
      ...previousCardDisplay,
      ...splitPageLoadMore(pressList, pageSize, counter + 1),
    ])
  }

  const pressCardList = pressCardDisplay.map(
    ({ title, details, url, titleId, urlLabel }: PressData) => {
      const cardBody = (
        <div className="px-5 py-6 lg:p-8">
          <NewsPaper />
          <h4 className="app-h4 mt-[21px]">{title}</h4>
          <Wysiwyg content={details} className="body-m my-5" />
          <div className="flex items-center space-x-[10px]">
            <span className="link-m font-[350] text-dark-green">
              {urlLabel ? urlLabel : "Go to article"}
            </span>
            <ExternalUrlIcon />
          </div>
        </div>
      )
      return <Card key={titleId} link={url} body={cardBody} />
    }
  )

  return (
    <section className="section-padding   bg-white pb-[120px]">
      <h3 className="app-h3 mb-[60px]">{title}</h3>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
        {pressCardList}
      </div>
      {counter + 1 < totalPages && (
        <div
          className="link-m mt-[60px]  flex w-full cursor-pointer items-center justify-center space-x-[10px] text-center font-[350] text-dark-green"
          onClick={loadMoreHandler}
        >
          <span>Load more</span>
          <PlusIcon />
        </div>
      )}
      <hr className="mt-[80px]" />
    </section>
  )
}

const splitPageLoadMore = (arr: any[], n: number, counter: number) => {
  const arrayList = new Array()
  let index = 0
  arr.forEach((val: PressData, i) => {
    if (i == 0) arrayList.push([])
    else if ((i / n) % 1 === 0 && i !== 0) {
      index++
      arrayList.push([])
    }
    arrayList[index].push(val)
  })
  return arrayList[counter]
}
