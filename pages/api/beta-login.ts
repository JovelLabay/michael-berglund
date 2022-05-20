import { loginHandler } from "@storyofams/next-password-protect"

export default loginHandler(process.env.WP_BETA_PASSWORD!, {
  cookieName: "next-password-protect",
  cookieSecure: process.env.APP_ENV === "production",
})
