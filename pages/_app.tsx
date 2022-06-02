import { withPasswordProtect } from "@storyofams/next-password-protect"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import "swiper/css"
import "swiper/css/pagination"

import { ProgressBar } from "@components/progressbar"

import "../styles/globals.css"

import type { AppProps } from "next/app"
function MyApp({ Component, pageProps }: AppProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  // add custom route change animation
  useEffect(() => {
    const handleStart = () => setIsAnimating(true)
    const handleStop = () => setIsAnimating(false)

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleStop)
    router.events.on("routeChangeError", handleStop)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleStop)
      router.events.off("routeChangeError", handleStop)
    }
  }, [router])

  return <>
    <ProgressBar isAnimating={isAnimating} />
    <Component {...pageProps} />
  </>
}

export default process.env.PASSWORD_PROTECT
  ? withPasswordProtect(MyApp, {
      loginApiUrl: "/api/beta-login",
      checkApiUrl: "/api/beta-password-check",
    })
  : MyApp
