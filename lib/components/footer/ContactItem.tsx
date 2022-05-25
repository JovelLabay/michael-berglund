import Image from "next/image"
import Link from "next/link"

import { WPMedia } from "@models/common"

export interface ContactItemProps {
  icon: WPMedia
  text: string
  link?: string
}

export const ContactItem = ({ icon, text, link }: ContactItemProps) => {
  const info = (
    <>
      <Image src={icon.mediaItemUrl} alt={icon.altText} width={16} height={16} />
      <span>{text}</span>
    </>
  )

  return link ? (
    <Link href={`mailto:info@michaelberglund.se`}>
      <a className="icon-text">{info}</a>
    </Link>
  ) : (
    <div className="icon-text">{info}</div>
  )
}
