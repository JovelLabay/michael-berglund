import classNames from "classnames"

import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ShortDescData } from "@models/blocks"

export const ShortDescBlock = ({ description, quote, backgroundColor }: ShortDescData) => {
  return (
    <>
      <section
        className={classNames(
          "section-padding flex flex-col  bg-light-beige pb-[60px] md:flex-row lg:pb-[120px]",
          { "bg-light-beige": backgroundColor === "beige" }
        )}
      >
        <div className="flex-1">
          <Wysiwyg content={description} className="mb-10 text-dark-blue md:pr-8 lg:mb-0" />
        </div>
        <div className="flex flex-1 md:justify-center">
          <p className="quote-l max-w-[425px] text-dark-beige">{quote}</p>
        </div>
      </section>
      {/* {backgroundColor === "white" && (
        <div className="h-[1px] w-full bg-white">
          <hr className="mx-auto w-[95%] bg-normal-beige" />
        </div>
      )} */}
    </>
  )
}
