import { withPasswordProtect } from "@storyofams/next-password-protect"
import "swiper/css"
import "swiper/css/bundle"

import "../styles/globals.css"

import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default process.env.PASSWORD_PROTECT
  ? withPasswordProtect(MyApp, {
      loginApiUrl: "/api/beta-login",
      checkApiUrl: "/api/beta-password-check",
    })
  : MyApp
