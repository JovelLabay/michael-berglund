import { useGlobalContext } from "@context/global"
import React, { useMemo, useState } from "react"
import { SwiperSlide } from "swiper/react"

import { Card } from "@components/cards"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ProgressSwiper } from "@components/swiper"
import { useResponsiveMD } from "@hooks/shared"
import { SwiperArrowRight } from "@icons/SwiperArrowRight"
import { RelatedArticleData } from "@models/blocks"
import { Post } from "@models/common"
import CardNews from "@components/cards/CardNews"
import { SwiperArrowLeft } from "@icons/SwiperArrowLeft"

export const RelatedArticles = ({
  title,
  postIds,
  urlLabel,
  url,
  newsDescription,
  newsOnly,
  newsFilter,
}: RelatedArticleData) => {
  const { postMap } = useGlobalContext()
  const responsiveMD = useResponsiveMD()

  const slidesPerView = responsiveMD ? 2.5 : 1
  const totalPages = Math.ceil(postIds.length / Math.floor(slidesPerView))

  const [currentFilter, setCurrentFilter] = useState("Alla")
  const [currentPage, setCurrentPage] = useState(0)

  const slides = useMemo(
    () =>
      postIds.map(cardId => {
        const { id, featuredImage, title, excerpt, uri } = postMap![cardId] as Post

        const cardBody = (
          <div className="px-4 py-6 lg:p-8">
            <span className="pre-title font-[350] uppercase tracking-[0.15em]">
              Aktuellt · Artiklar
            </span>
            <h4 className="app-h4 my-5">{title}</h4>
            <Wysiwyg
              content={excerpt}
              className="article-card h-[72px] overflow-y-hidden lg:h-auto lg:overflow-auto"
            />
          </div>
        )

        return (
          <SwiperSlide key={id} className="pt-1">
            <Card
              image={featuredImage.node}
              body={cardBody}
              link={`/articles${uri}`}
              className="h-full"
            />
          </SwiperSlide>
        )
      }),
    [postIds, postMap]
  )

  return (
    <section className="section-padding bg-white pb-[100px] md:pr-0">
      {!newsOnly ? (
        <>
          <div className="app-h3 mb-10 flex flex-row justify-between lg:mb-[60px]">
            <h3>{title}</h3>
            <a
              className="text flex flex-row items-center pr-0 md:pr-[48px]"
              target="_blank"
              rel="noopener noreferrer"
              href={url}
            >
              <span className="mr-2 font-gotham text-[16px] font-medium text-dark-green">
                {urlLabel}
              </span>
              <SwiperArrowRight className="w-5 text-[16px]" />
            </a>
          </div>
          <ProgressSwiper totalPages={totalPages} slidesPerView={slidesPerView} slides={slides} />
        </>
      ) : (
        <>
          <div className="mb-[40px] items-center justify-between md:mb-[60px] xl:flex">
            <p className=" w-auto font-[325] text-dark-blue md:w-[656px] md:text-[20px] md:font-[400]">
              {newsDescription}
            </p>
            <div className="my-10 flex flex-row items-center gap-[40px] overflow-auto pr-0 md:pr-[48px] xl:my-0">
              {newsFilter.map((filter, index) => {
                return (
                  <button
                    key={index}
                    className={currentFilter === filter ? " text-dark-green" : " text-light-green"}
                    onClick={() => setCurrentFilter(filter)}
                  >
                    {filter}
                    <p className={currentFilter === filter ? "text-dark-green" : "text-white"}>
                      ● ●
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 pr-0 sm:grid-cols-1 md:grid-cols-2 md:gap-7 md:pr-[48px] lg:grid-cols-3 lg:gap-8">
            {postIds
              .filter((postId, index) => {
                if (index >= currentPage && index <= currentPage + 8) {
                  return postId
                }
              })
              .map((postId, index) => {
                const { id, featuredImage, title, excerpt, uri } = postMap![postId] as Post

                return (
                  <div key={index}>
                    <CardNews
                      id={id}
                      featuredImage={featuredImage}
                      title={title}
                      excerpt={excerpt}
                      uri={uri}
                    />
                  </div>
                )
              })}
          </div>
          {/* THIS SECTION IS UNFINISHED */}
          <div className="mt-[40px] flex flex-row justify-between md:mt-[50px] md:pr-[48px]">
            <button
              className={currentPage <= 0 ? "text-dark-green opacity-50" : "text-dark-green"}
              disabled={currentPage <= 0}
              onClick={() => {
                setCurrentPage(currentPage - 9)
              }}
            >
              <SwiperArrowLeft />
            </button>
            <div className="flex gap-[24px] md:gap-[32px]">
              {/* THIS IS PARTIAL SINCE I HAVE DIFFICULTY UPON ADDING EACH CATEGORY */}
              {/* THIS IS PARTICAL FOR BY 9 IN ACCORDANCE WITH THE FIGMA PROTOTYPE */}
              <button>{currentPage === 0 ? "0" : currentPage - 9}</button>
              <button>{currentPage === 0 ? "1" : currentPage}</button>
              <button>{currentPage + 9}</button>
              <button>...</button>
              <button>{postIds.length}</button>
            </div>
            <button
              className={
                postIds.length <= currentPage + 9 ? "text-dark-green opacity-50" : "text-dark-green"
              }
              disabled={postIds.length <= currentPage + 9}
              onClick={() => {
                setCurrentPage(currentPage + 9)
              }}
            >
              <SwiperArrowRight />
            </button>
          </div>
        </>
      )}
    </section>
  )
}
