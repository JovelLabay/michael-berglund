import classNames from "classnames"
import Image from "next/image"
import React, { useState } from "react"

import { Wysiwyg } from "@components/shared/Wysiwyg"
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
    <div className="relative min-h-[550px] sm:min-h-[650px] md:min-h-[485px] lg:min-h-[485px]">
      <style jsx>{`
          .card { perspective: 500px;}
          .content { transform-style: preserve-3d;}
          .transform { transform: rotateY( 180deg ); transition: transform 0.5s;}
          .front, .back {  backface-visibility: hidden; }
          .back {  transform: rotateY( 180deg ); }
      }
      `}</style>
      <div className="card absolute w-full float-left">
        <div className={classNames(isActive ? 'transform' : '', 'content w-full h-full absolute transition-transform duration-1000 ease-in-out')} >
          <div className={classNames(isActive ? 'z-0' : '', 'front absolute w-full h-full')}>
            <div className="relative mb-5 aspect-square  w-full shrink-0  ">
              <div className="absolute top-0 z-0 h-full w-full bg-light-beige"></div>
              <div className=" w-full translate-x-0.5 -translate-y-0.5 transition ease-in-out hover:translate-x-1 hover:-translate-y-1">
                {image && (
                  <div className="relative aspect-video w-full">
                    <Image  src={image.mediaItemUrl}  alt={image.altText} layout="fill" objectFit="cover" />
                  </div>
                )}
                <div className='p-8 min-h-[268px]'>
                  <h5 className="app-h4">{name}</h5>
                  <span className="pre-title mt-4 mb-5  uppercase  font-medium tracking-[0.15em] w-full block">{position}</span>
                  <span className="pre-title mt-4 mb-2  font-medium tracking-[0.15em] w-full block break-all"> {email} </span>
                  <span className="pre-title  mb-5  font-medium tracking-[0.15em] w-full block"> {phone} </span>
                  <span className="w-full flex">
                    <span className="pre-title w-40 font-medium tracking-[0.15em]  inline-flex cursor-pointer" onClick={handleClick}>
                      Read Bio  &nbsp; <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.59355 0.503308C7.29505 0.527 7.02552 0.697377 6.87333 0.976127L0.427208 12.795C0.210958 13.1912 0.218764 13.6591 0.44918 14.0474C0.67918 14.4353 1.0868 14.6667 1.53805 14.6667H6.29147C7.5548 14.6667 8.58313 13.6388 8.58313 12.3751V1.41233C8.58313 0.989409 8.30749 0.634747 7.89791 0.530164C7.7952 0.504018 7.69305 0.495411 7.59355 0.503308ZM10.2408 0.508191C10.1936 0.51169 10.1472 0.51879 10.1025 0.530164C9.74494 0.621152 9.41647 0.986422 9.41647 1.41233V12.3751C9.41647 13.6333 10.4499 14.6667 11.7081 14.6667H16.4616C17.3941 14.6667 18.0201 13.6136 17.5732 12.795L11.1271 0.976941C10.9488 0.649701 10.5718 0.483697 10.2408 0.508191ZM10.6665 2.74371L16.4754 13.3931C16.4757 13.3934 16.4759 13.3937 16.4762 13.3939C16.4951 13.4287 16.5015 13.4167 16.4616 13.4167H11.7081C11.1255 13.4167 10.6665 12.9576 10.6665 12.3751V2.74371Z" fill="#3E5C58"/></svg>
                    </span>
                    <span className="pre-title w-full text-right font-medium tracking-[0.15em] " >
                      <a href={linkedin} target="_blank">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="float-right">
                        <path d="M15.25 0H2.75C1.234 0 0 1.234 0 2.75V15.25C0 16.766 1.234 18 2.75 18H15.25C16.766 18 18 16.766 18 15.25V2.75C18 1.234 16.766 0 15.25 0ZM6 14C6 14.2765 5.7765 14.5 5.5 14.5H4C3.7235 14.5 3.5 14.2765 3.5 14V7.5C3.5 7.2235 3.7235 7 4 7H5.5C5.7765 7 6 7.2235 6 7.5V14ZM4.75 6C4.0595 6 3.5 5.4405 3.5 4.75C3.5 4.0595 4.0595 3.5 4.75 3.5C5.4405 3.5 6 4.0595 6 4.75C6 5.4405 5.4405 6 4.75 6ZM14.5 14C14.5 14.2765 14.2765 14.5 14 14.5H12.5C12.2235 14.5 12 14.2765 12 14V10.25C12 9.5605 11.4395 9 10.75 9C10.0605 9 9.5 9.5605 9.5 10.25V14C9.5 14.2765 9.2765 14.5 9 14.5H7.5C7.2235 14.5 7 14.2765 7 14V7.5C7 7.2235 7.2235 7 7.5 7H9C9.2765 7 9.5 7.2235 9.5 7.5V7.7705C10.0315 7.293 10.731 7 11.5 7C13.1545 7 14.5 8.3455 14.5 10V14Z" fill="#3E5C58"/>
                        </svg>
                        </a>
                    </span>
                  </span>
                </div>
                </div>
            </div>
          </div>
          <div className="back absolute w-full inline-block">
            <div className="relative mb-5 aspect-square  w-full shrink-0 bg-light-beige">
                <div style={{backgroundImage: `url(${coverPhoto.src})`}} className='h-14 absolute w-full -top-px'></div><br/> 
                <div className="relative aspect-square w-[57px]  shrink-0 overflow-hidden rounded-full  m-auto border-2 border-white">
                      {image && (
                        <Image src={image.mediaItemUrl} alt={image.altText} layout="fill"  objectFit="cover"/>
                      )}
                    
                  </div>
                  <span className="pre-title p-8  text-center uppercase break-all font-medium tracking-[0.15em] w-full block">
                    <h5 className="app-h4 text-center pb-5">{name}</h5>
                    {position}
                  </span>
                  <Wysiwyg content={bio} hasWysiwyg={false}  className=" text-dark-blue p-8 max-h-52 min-h-[171px]  md:min-h-[139px] lg:min-h-[230px] overflow-auto"/>
                  <span className="p-8 pre-title font-medium tracking-[0.15em] inline-flex cursor-pointer" onClick={handleClick}>
                      Contact Info  &nbsp; <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.59355 0.503308C7.29505 0.527 7.02552 0.697377 6.87333 0.976127L0.427208 12.795C0.210958 13.1912 0.218764 13.6591 0.44918 14.0474C0.67918 14.4353 1.0868 14.6667 1.53805 14.6667H6.29147C7.5548 14.6667 8.58313 13.6388 8.58313 12.3751V1.41233C8.58313 0.989409 8.30749 0.634747 7.89791 0.530164C7.7952 0.504018 7.69305 0.495411 7.59355 0.503308ZM10.2408 0.508191C10.1936 0.51169 10.1472 0.51879 10.1025 0.530164C9.74494 0.621152 9.41647 0.986422 9.41647 1.41233V12.3751C9.41647 13.6333 10.4499 14.6667 11.7081 14.6667H16.4616C17.3941 14.6667 18.0201 13.6136 17.5732 12.795L11.1271 0.976941C10.9488 0.649701 10.5718 0.483697 10.2408 0.508191ZM10.6665 2.74371L16.4754 13.3931C16.4757 13.3934 16.4759 13.3937 16.4762 13.3939C16.4951 13.4287 16.5015 13.4167 16.4616 13.4167H11.7081C11.1255 13.4167 10.6665 12.9576 10.6665 12.3751V2.74371Z" fill="#3E5C58"/></svg>
                    </span>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
