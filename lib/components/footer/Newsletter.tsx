import { useGlobalContext } from "@context/global"
import classNames from "classnames"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { Wysiwyg } from "@components/shared/Wysiwyg"
import DismissIcon from "@icons/DismissIcon"
import { SendEmail } from "@icons/SendEmail"
import { NewsletterFormValues } from "@models/forms"

export const NewsLetter = (props: any) => {
  const { showPopUp, setShowPopUp } = props

  const closePopUp = () => {
    setShowPopUp(false)
    localStorage.setItem("newsLetterPopUp", "true")
  }

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [email, setEmail] = useState<string>("your email")

  const {
    acf: {
      acfGlobal: { newsletter },
    },
  } = useGlobalContext()

  const {
    title,
    description,
    emailPlaceholder,
    privacyPolicy,
    successTitle,
    successMessage,
    successSubMessage,
    successSubTitle,
    closeLabel,
  } = newsletter

  const { register, handleSubmit, reset } = useForm<NewsletterFormValues>()
  const onSubmit: SubmitHandler<NewsletterFormValues> = async data => {
    try {
      setIsSubmitting(true)
      setSubmitError(false)

      const response = await fetch("api/newsletter", {
        method: "POST",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        console.log("newsletter submit [success!]")
        setEmail(data.email)
        reset()
        setSubmitted(true)
      } else {
        setSubmitError(true)
      }
    } catch (error) {
      console.log("newsletter submit [failed!]")
      console.log(error)
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="newsletterSection"
      className={
        showPopUp
          ? "relative m-5 bg-light-beige px-[25px] py-[60px] text-center md:m-0 md:p-[60px]"
          : "section-padding relative bg-light-beige pb-[120px] text-center"
      }
    >
      {showPopUp && (
        <div className="absolute top-[22.91px] right-[22.91px]">
          <button onClick={closePopUp}>
            <DismissIcon />
          </button>
        </div>
      )}

      <div className="mx-auto max-w-[650px] ">
        {!submitted && (
          <>
            <h3 className="app-h3 text-dark-blue">{title}</h3>
            <span className="mt-10 mb-8 inline-block">
              <Wysiwyg className="prose-p:body-m prose text-dark-blue" content={description} />
            </span>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                className={classNames(
                  "mb-5 flex items-center justify-center overflow-hidden rounded-sm",
                  { "border border-red-500": submitError }
                )}
              >
                <input
                  type="email"
                  required
                  disabled={isSubmitting}
                  className="first-letter:input-link-text w-full px-4 py-[17px] font-[350] text-dark-blue outline-none "
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
                <Wysiwyg className="privacy-policy text-[14px]" content={privacyPolicy} />
              </span>
            </form>
          </>
        )}
        {submitted &&
          (showPopUp ? (
            <>
              <h3 className="mt-10 text-[24px] font-normal text-[#69857D]">{successSubTitle}</h3>
              <span className="mt-10 mb-8 inline-block">
                <Wysiwyg
                  className="prose-p:body-m newsletter prose text-[16px] font-medium text-dark-blue md:text-[18px]"
                  content={successMessage.replace(
                    "&lt;email&gt;",
                    `<strong classname="text-red-500 font-bold">${email}</strong>`
                  )}
                />
              </span>

              <div className="flex justify-center">
                <button
                  onClick={closePopUp}
                  className="flex items-center justify-center text-dark-green"
                >
                  {closeLabel} <DismissIcon className="ml-[11px]" />
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="app-h3 text-dark-blue">{successTitle}</h3>
              <p className="mt-10 text-dark-blue">{successSubMessage}</p>
              <h3 className="app-h3 mt-10 text-[#69857D]">{successSubTitle}</h3>
              <span className="mt-10 mb-8 inline-block">
                <Wysiwyg
                  className="newsletter prose-p:body-m prose text-[#69857D]"
                  content={successMessage.replace(
                    "&lt;email&gt;",
                    `<strong classname="text-[#69857D] font-bold">${email}</strong>`
                  )}
                />
              </span>
            </>
          ))}
      </div>
    </section>
  )
}
