import { withPasswordProtect } from "@storyofams/next-password-protect"

import type { AppProps } from "next/app"

import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default process.env.PASSWORD_PROTECT
  ? withPasswordProtect(MyApp, {
      loginApiUrl: "/api/beta-login",
      checkApiUrl: "/api/beta-password-check",
    })
  : MyApp
