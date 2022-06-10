import React, { useEffect, useState } from "react"

import { EmailLogo } from "@logos/EmailLogo"
import { FacebookLogo } from "@logos/FacebookLogo"
import { LinkedinLogo } from "@logos/LinkedinLogo"
import { TwitterLogo } from "@logos/TwitterLogo"

interface ArticleLinksProps {
  title?: string
}

export const ArticleShareLinks = ({ title }: ArticleLinksProps) => {
  const [postUrl, setPostUrl] = useState<string>(null!)
  const [postTitle, setPostTitle] = useState<string>(null!)

  useEffect(() => {
    setPostUrl(window.location.href)
    setPostTitle(title ?? document.title)
  }, [title])

  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`
  const twitterHref = `https://twitter.com/share?text=${postTitle}&url=${postUrl}`
  const linkedInHref = `https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}`
  const emailHref = `mailto:?subject=${postTitle}&body=${postUrl}`

  //'mailto:test@example.com?subject=subject&body=body')

  return (
    <div className="mt-10 flex items-center">
      <h6 className="mr-[18px]">Dela Artikleln:</h6>
      <div className="flex items-center space-x-4">
        <a href={facebookHref} target="_blank" rel="noopener noreferer">
          <FacebookLogo />
        </a>
        <a href={twitterHref} target="_blank" rel="noopener noreferer">
          <TwitterLogo />
        </a>
        <a href={linkedInHref} target="_blank" rel="noopener noreferer">
          <LinkedinLogo />
        </a>
        <a href={emailHref}>
          <EmailLogo />
        </a>
      </div>
    </div>
  )
}
