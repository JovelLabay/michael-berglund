import Image from "next/image"
import Link from "next/link"

import { WPMedia } from "@models/common"

export interface FooterContactItemProps {
  icon: WPMedia
  text: string
  link?: string
}

export const FooterContactItem = ({ icon, text, link }: FooterContactItemProps) => {
  const info = (
    <>
      <Image src={icon.mediaItemUrl} alt={icon.altText} width={16} height={16} />
      <span>{text}</span>
    </>
  )

  return link ? (
    <a href={`mailto:info@michaelberglund.se`} className="icon-text hover-text-white">
      {info}
    </a>
  ) : (
    <div className="icon-text">{info}</div>
  )
}
