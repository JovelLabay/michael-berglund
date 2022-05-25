import { GlobalContext } from "@context/global"
import { useContext } from "react"

import { Wysiwyg } from "@components/shared/Wysiwyg"
import { SendEmail } from "@icons/SendEmail"

export const NewsLetter = () => {
  const {
    acfGlobal: { newsletter },
  } = useContext(GlobalContext)

  const { title, description, emailPlaceholder, privacyPolicy } = newsletter

  return (
    <div className="bg-light-beige pt-[100px] pb-[120px] text-center">
      <div className="mx-auto max-w-[650px] ">
        <h3 className="app-h3">{title}</h3>
        <span className="mt-10 mb-8 inline-block">
          <Wysiwyg content={description} />
        </span>

        <form>
          <div className="mb-5 flex items-center justify-center overflow-hidden rounded-sm">
            <input
              type="text"
              className="input-link-text w-full px-4 py-[17px] outline-none"
              placeholder={emailPlaceholder}
            />
            <button className="flex h-[52px] w-[64px] items-center justify-center bg-orange duration-300 ease-in-out hover:opacity-75">
              <SendEmail />
            </button>
          </div>

          <span className="link-s text-dark-beige">
            <Wysiwyg content={privacyPolicy} />
            {/* By registering you agree to the terms of our
            <span className="body-s font-normal"> Privacy Policy</span>. */}
          </span>
        </form>
      </div>
    </div>
  )
}
