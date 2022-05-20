import { passwordCheckHandler } from "@storyofams/next-password-protect"

export default passwordCheckHandler(process.env.WP_BETA_PASSWORD!, {
  cookieName: "next-password-protect",
})
