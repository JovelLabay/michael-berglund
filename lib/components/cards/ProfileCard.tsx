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

export const ProfileCard = ({ image, name, position, phone, email, bio, coverPhoto, linkedin }: ProfileItemProps) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(current => !current);
  }

  return (
    <div className="relative h-[650px] bg-light-beige">
      <div className="profile-card absolute w-full float-left">
        <div className={classNames(isActive ? 'transform' : '', 'content w-full h-full absolute transition-transform duration-1000 ease-in-out')} >
          <div className={classNames(isActive ? 'z-0' : '', 'front absolute w-full h-full')}>
            <div className="relative mb-5 aspect-square  w-full shrink-0  ">
              <div className="absolute top-0 z-0 h-full w-full "></div>
              <div className=" w-full translate-x-0.5 -translate-y-0.5 transition ease-in-out hover:translate-x-1 hover:-translate-y-1">
                {image && (
                  <div className="relative aspect-video w-full h-[390px]">
                    <Image  src={image.mediaItemUrl}  alt={image.altText} layout="fill" objectFit="cover" />
                  </div>
                )}
                <div className='p-8 min-h-[228px]'>
                  <h5 className="app-h4">{name}</h5>
                  <span className="pre-title mt-4 mb-5  uppercase  font-medium tracking-[0.15em] w-full block">{position}</span>
                  <span className="pre-title mt-4 mb-2  tracking-[0.15em] w-full block break-all"> {email} </span>
                  <span className="pre-title  mb-5  tracking-[0.15em] w-full block"> {phone} </span>
                  <span className="w-full flex">
                    <span className="w-40 font-medium text-base pt-6 inline-flex cursor-pointer" onClick={handleClick}>
                      Read Bio  &nbsp; <FlipIcon className="top-1 relative"/>
                    </span>
                    <span className="pre-title  w-full text-right pt-6 text-base font-mediumfont-medium tracking-[0.15em] " >
                      <a href={linkedin} target="_blank">
                          <LinkedinIcon className="float-right"/> 
                        </a>
                    </span>
                  </span>
                </div>
                </div>
            </div>
          </div>
          <div className="back absolute w-full h-full inline-block">
            <div className=" mb-5 aspect-square  h-full w-full shrink-0 bg-light-beige">
                <div style={{backgroundImage: `url(${coverPhoto.src})`}} className='h-14 absolute w-full -top-px'></div><br/> 
                <div className="relative aspect-square w-[57px]  shrink-0 overflow-hidden rounded-full  m-auto border-2 border-white">
                      {image && (
                        <Image src={image.mediaItemUrl} alt={image.altText} layout="fill"  objectFit="cover"/>
                      )}
                    
                  </div>
                  <span className=" p-8  text-center uppercase break-all font-medium tracking-[0.15em] w-full block">
                    <h5 className="app-h4 text-center pb-5">{name}</h5>
                    {position}
                  </span>
                  <Wysiwyg content={bio} hasWysiwyg={false}  className=" text-dark-blue p-8  min-h-[330px] overflow-auto"/>
                  <span className="absolute p-8 pre-title font-medium  text-base inline-flex cursor-pointer" onClick={handleClick}>
                      Contact Info  &nbsp; <FlipIcon className="top-0 relative"/>
                    </span>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
