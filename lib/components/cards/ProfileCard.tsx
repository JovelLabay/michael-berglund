import classNames from "classnames"
import Image from "next/image"
import React, { useState } from "react"

import { AppLink } from "@components/shared/AppLink"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { FlipIcon } from "@icons/FlipIcon"
import { LinkedinIcon } from "@icons/LinkedinIcon"
import { WPMedia } from "@models/common"
import { CloseIcon } from "@icons/CloseIcon"
import DismissIcon from "@icons/DismissIcon"
import Close from "@icons/Close"
import { ClockIcon } from "@icons/ClockIcon"
import { LinkedinBlueIcon } from "@icons/LinkedinBlueIcon"
import { PlusIcon } from "@icons/PlusIcon"

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
    setIsActive(!isActive)
  }

  return (
    <>
      <div className="relative min-h-[490px] md:min-h-[550px]">
        <div className="profile-card absolute h-full w-full">
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
                  <div className="absolute left-0 bottom-4 bg-dark-blue ">
                    <p className="py-1 px-2 font-[350] uppercase tracking-wider text-white">
                      Tjänstledig
                    </p>
                  </div>
                </div>
              )}
              <div className="p-[20px] text-dark-blue md:p-[32px]">
                <h5 className="mb-[16px] mt-[24px] font-lora text-[24px] md:mt-0">{name}</h5>
                <p className="font-[14px] mb-[20px] font-[350]">{position}</p>
                <a href={`mailto:${email}`} className="mb-[8px] font-[325]">
                  <span className="">{email}</span>
                </a>
                <div className="mb-[24px] flex items-center">
                  <a href={`tel:${phone}`}>
                    <span className="mr-2 block w-full pt-1 font-[325]">{phone}</span>
                  </a>
                  {" · "}
                  {linkedin && (
                    <a
                      className="ml-2 mt-[5px]"
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedinBlueIcon />
                    </a>
                  )}
                </div>
                <span className="flex w-full justify-between">
                  <button className="flex items-center text-dark-green" onClick={handleClick}>
                    Läs bio <PlusIcon className="ml-3" />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isActive && (
        <div
          className="fixed top-0 left-0 z-60 flex h-screen w-screen items-center justify-center bg-[#00000080]"
          onClick={handleClick}
        >
          <div className="mx-[20px] max-h-[602px] min-w-[335px] overflow-auto bg-light-beige md:mx-0 md:max-h-[616px] md:min-w-[656px]">
            <div className="relative h-16 shrink-0">
              <div
                style={{ backgroundImage: `url(${coverPhoto.src})` }}
                className="absolute flex h-[60px] w-full flex-col items-end justify-center md:h-[92px]"
              >
                <button className="mr-[22.9px] md:hidden" onClick={handleClick}>
                  <Close />
                </button>
              </div>
              <div className="absolute top-7 left-1/2 aspect-square w-[72px] -translate-x-1/2  overflow-hidden rounded-full  border border-white md:w-[120px]">
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
            <h5 className="app-h4 mt-[52px] text-center md:mt-[110px]">{name}</h5>
            <span className="pre-title mt-4 block text-center font-[350] uppercase tracking-[0.15em]">
              {position}
            </span>
            <Wysiwyg
              content={bio}
              className="prose-p:body-m prose flex-1 px-[20px] py-[24px] md:px-[60px] md:pb-[32px]"
            />

            <div className="mb-[24px] flex justify-center md:mb-[60px]">
              <button
                className="flex items-center text-dark-green hover:text-dark-blue"
                onClick={handleClick}
              >
                Stäng <DismissIcon className="ml-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
