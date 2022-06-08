import { useGlobalContext } from "@context/global"

import { Wysiwyg } from "@components/shared/Wysiwyg"
import { SendEmail } from "@icons/SendEmail"

export const NewsLetter = () => {
  const {
    acf: {
      acfGlobal: { newsletter },
    },
  } = useGlobalContext()

  const { title, description, emailPlaceholder, privacyPolicy } = newsletter

  return (
    <section className="section-padding bg-light-beige pb-[120px] text-center">
      <div className="mx-auto max-w-[650px] ">
        <h3 className="app-h3">{title}</h3>
        <span className="mt-10 mb-8 inline-block">
          <Wysiwyg className="body-m" content={description} />
        </span>

        <form>
          <div className="mb-5 flex items-center justify-center overflow-hidden rounded-sm">
            <input
              type="text"
              className="input-link-text w-full px-4 py-[17px] outline-none"
              placeholder={emailPlaceholder}
            />
            <button className="app-hover flex h-[52px] w-[64px] items-center justify-center bg-orange outline-none hover:opacity-75">
              <SendEmail />
            </button>
          </div>

          <span className="link-s text-dark-beige">
            <Wysiwyg className="privacy-policy" content={privacyPolicy} />
          </span>
        </form>
      </div>
    </section>
  )
}
