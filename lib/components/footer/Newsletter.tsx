import { useGlobalContext } from "@context/global"
import classNames from "classnames"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { Wysiwyg } from "@components/shared/Wysiwyg"
import { SendEmail } from "@icons/SendEmail"
import { NewsletterFormValues } from "@models/forms"

export const NewsLetter = () => {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    acf: {
      acfGlobal: { newsletter },
    },
  } = useGlobalContext()

  const { title, description, emailPlaceholder, privacyPolicy } = newsletter

  const { register, handleSubmit, reset } = useForm<NewsletterFormValues>()
  const onSubmit: SubmitHandler<NewsletterFormValues> = async data => {
    try {
      setIsSubmitting(true)

      const response = await fetch("api/newsletter", {
        method: "POST",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        console.log("newsletter submit [success!]")
        reset()
        setSubmitted(true)
      }
    } catch (error) {
      console.log("newsletter submit [failed!]")
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-light-beige pt-[100px] pb-[120px] text-center">
      <div className="mx-auto max-w-[650px] ">
        <h3 className="app-h3">{title}</h3>
        <span className="mt-10 mb-8 inline-block">
          <Wysiwyg content={description} />
        </span>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5 flex items-center justify-center overflow-hidden rounded-sm">
            <input
              type="email"
              required
              disabled={isSubmitting}
              className="input-link-text w-full px-4 py-[17px] outline-none"
              placeholder={emailPlaceholder}
              {...register("email")}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={classNames(
                "app-hover flex h-[52px] w-[64px] items-center justify-center bg-orange outline-none hover:opacity-75",
                { "pointer-events-none opacity-50": isSubmitting }
              )}
            >
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
