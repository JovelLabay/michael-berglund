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
    <div className="relative min-h-[490px] md:min-h-[550px]">
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
              "front absolute min-h-[490px] w-full md:min-h-[550px] "
            )}
          >
            <div className="absolute top-0 z-0 h-full w-full bg-darker-beige"></div>
            <div className="absolute flex h-full w-full translate-x-0.5 -translate-y-0.5 flex-col bg-light-beige transition ease-in-out hover:translate-x-1 hover:-translate-y-1">
              {image && (
                <div className="relative h-full max-h-[220px] w-full shrink-0 lg:max-h-[300px]">
                  <Image
                    src={image.mediaItemUrl}
                    alt={image.altText}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
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
                    <span className="block  w-full break-all pt-[20px]">{email}</span>
                  </a>
                  <a href={`tel:${phone}`}>
                    <span className="block w-full pt-1">{phone}</span>
                  </a>
                </div>

                <span className="flex w-full justify-between pt-[22px]">
                  <div
                    className="link-m flex cursor-pointer items-center space-x-[10px] font-[350]"
                    onClick={handleClick}
                  >
                    <span>Read Bio</span>
                    <FlipIcon className="relative" />
                  </div>

                  {linkedin && (
                    <AppLink href={linkedin}>
                      <LinkedinIcon />
                    </AppLink>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="back absolute flex min-h-[490px] w-full flex-col bg-light-beige md:min-h-[550px]">
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

              <div
                className="link-m flex cursor-pointer items-center space-x-[10px] p-5 pt-0 font-[350] lg:p-8"
                onClick={handleClick}
              >
                <span>Contact Info</span>
                <FlipIcon className="relative" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
