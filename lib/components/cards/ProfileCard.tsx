import classNames from "classnames"
import Image from "next/image"
import React, { useState } from "react"

import { AppLink } from "@components/shared/AppLink"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { FlipIcon } from "@icons/FlipIcon"
import { LinkedinIcon } from "@icons/LinkedinIcon"
import { WPMedia } from "@models/common"

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
    <div className="relative min-h-[520px] xsm:min-h-[700px] md:min-h-[540px]">
      <div className="profile-card absolute h-full w-full">
        <div
          className={classNames(
            "content absolute h-full w-full transition-transform duration-1000 ease-in-out",
            {
              transform: isActive,
            }
          )}
        >
          <div
            className={classNames(
              isActive ? "z-0" : "",
              "front absolute min-h-[520px] w-full xsm:min-h-[700px] md:min-h-[540px] "
            )}
          >
            <div className="absolute top-0 z-0 h-full w-full bg-darker-beige"></div>
            <div className="absolute flex h-full w-full translate-x-0.5 -translate-y-0.5 flex-col bg-light-beige transition ease-in-out hover:translate-x-1 hover:-translate-y-1">
              {image && (
                <div className="aspect-h-[220] aspect-w-[335] relative max-h-[300px] w-full lg:aspect-h-[300] lg:aspect-w-[427]">
                  <Image
                    src={image.mediaItemUrl}
                    alt={image.altText}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="dark-blue flex flex-1 flex-col p-5 pt-6 lg:p-8">
                <div className="flex-1">
                  <h5 className="app-h4 ">{name}</h5>
                  <span className="pre-title  block w-full  pt-[16px] font-[350] uppercase tracking-[0.15em]">
                    {position}
                  </span>

                  <a href={`mailto:${email}`}>
                    <span className="block  w-full break-all pt-[20px] tracking-[0.15em]">
                      {email}
                    </span>
                  </a>
                  <a href={`tel:${phone}`}>
                    <span className="block w-full pt-1 tracking-[0.15em]">{phone}</span>
                  </a>
                </div>

                <span className="flex w-full justify-between pt-[22px]">
                  <span
                    className="link-m text-base inline-flex w-40  cursor-pointer font-medium"
                    onClick={handleClick}
                  >
                    Read Bio &nbsp; <FlipIcon className="relative" />
                  </span>

                  {linkedin && (
                    <AppLink href={linkedin}>
                      <LinkedinIcon />
                    </AppLink>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="back absolute flex min-h-[520px] w-full flex-col bg-light-beige xsm:min-h-[700px] md:min-h-[540px]">
            <div className="absolute top-0 z-0 h-full w-full bg-darker-beige"></div>
            <div className="absolute flex h-full w-full translate-x-0.5 -translate-y-0.5 flex-col bg-light-beige transition ease-in-out hover:translate-x-1 hover:-translate-y-1">
              <div className="relative h-16 shrink-0">
                {/* TODO: Needs to be updated! */}
                <div
                  style={{ backgroundImage: `url(${coverPhoto.src})` }}
                  className="absolute h-full w-full"
                ></div>
                <div className="absolute top-7 left-1/2 aspect-square w-[64px]  -translate-x-1/2 overflow-hidden  rounded-full border border-white">
                  {image && (
                    <Image
                      src={image.mediaItemUrl}
                      alt={image.altText}
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                </div>
              </div>
              <h5 className="app-h4 mt-[52px] text-center">{name}</h5>
              <span className="pre-title mt-4 block text-center font-[350] uppercase tracking-[0.15em]">
                {position}
              </span>
              <Wysiwyg
                content={bio}
                className="prose-p:body-m prose flex-1 p-5 py-5 lg:px-[36px]"
              />
              <span
                className="link-m text-base  relative inline-flex w-48 cursor-pointer p-5 pt-0 font-medium lg:p-8"
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
