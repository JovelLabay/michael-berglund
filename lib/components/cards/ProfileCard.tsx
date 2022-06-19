import classNames from "classnames"
import Image from "next/image"
import React, { useState } from "react"

import { Wysiwyg } from "@components/shared/Wysiwyg"
import { FlipIcon } from "@icons/FlipIcon"
import { LinkedinIcon } from "@icons/LinkedinIcon"
import { ImageMap, WPMedia } from "@models/common"

export interface ProfileItemProps {
  image: WPMedia
  name: string
  position: string
  phone: string
  email: string
  linkedin: string
  bio: string
  coverPhoto?: any
}

export const ProfileCard = ({
  image,
  name,
  position,
  phone,
  email,
  bio,
  coverPhoto,
  linkedin,
}: ProfileItemProps) => {
  const [isActive, setIsActive] = useState(false)
  const handleClick = () => {
    setIsActive(current => !current)
  }

  return (
    <div className="relative h-[650px] ">
      <div className="profile-card absolute float-left w-full">
        <div
          className={classNames(
            isActive ? "transform" : "",
            "content absolute h-full w-full transition-transform duration-1000 ease-in-out"
          )}
        >
          <div
            className={classNames(
              isActive ? "z-0" : "",
              "front absolute h-[650px] w-full bg-light-beige"
            )}
          >
            <div className="relative mb-5 aspect-square  w-full shrink-0  ">
              <div className="absolute top-0 z-0 h-full w-full "></div>
              <div className=" w-full translate-x-0.5 -translate-y-0.5 transition ease-in-out hover:translate-x-1 hover:-translate-y-1">
                {image && (
                  <div className="relative aspect-video h-[390px] w-full">
                    <Image
                      src={image.mediaItemUrl}
                      alt={image.altText}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className="dark-blue min-h-[228px] p-8 pt-[36px]">
                  <h5 className="app-h4 ">{name}</h5>
                  <span className="pre-title  block w-full  pt-[16px] font-medium uppercase tracking-[0.15em]">
                    {position}
                  </span>
                  <span className="pre-title block  w-full break-all pt-[20px] font-gotham font-[350] tracking-[0.15em]">
                    {email}
                  </span>
                  <span className="pre-title block w-full pt-[8px] font-gotham font-[350] tracking-[0.15em]">
                    {phone}
                  </span>
                  <span className="flex w-full pt-[22px]">
                    <span
                      className="link-m text-base inline-flex w-40  cursor-pointer font-medium"
                      onClick={handleClick}
                    >
                      Read Bio &nbsp; <FlipIcon className="relative" />
                    </span>
                    <span className="pre-title  text-base w-full  text-right font-medium tracking-[0.15em] ">
                      <a href={linkedin} target="_blank" rel="noreferrer">
                        <LinkedinIcon className="float-right" />
                      </a>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="back absolute inline-block h-[650px] w-full bg-light-beige">
            <div className=" mb-5 aspect-square  h-full w-full shrink-0 bg-light-beige">
              <div
                style={{ backgroundImage: `url(${coverPhoto.src})` }}
                className="absolute -top-px h-14 w-full"
              ></div>
              <br />
              <div className="relative m-auto aspect-square  w-[64px] shrink-0 overflow-hidden  rounded-full border-2 border-white">
                {image && (
                  <Image
                    src={image.mediaItemUrl}
                    alt={image.altText}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
              <span className="dark-blue block w-full break-all p-[20px] text-center font-medium uppercase tracking-[0.15em]">
                <h5 className="app-h4 pb-5 text-center ">{name}</h5>
                {position}
              </span>
              <Wysiwyg
                content={bio}
                hasWysiwyg={false}
                className="dark-blue min-h-[330px]  overflow-auto p-8 pt-[32px]"
              />
              <span
                className="link-m text-base  relative inline-flex w-48 cursor-pointer p-8 pt-[38px] font-medium"
                onClick={handleClick}
              >
                Contact Info &nbsp; <FlipIcon className="relative" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
