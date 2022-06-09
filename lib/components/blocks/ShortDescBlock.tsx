import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ShortDescData } from "@models/blocks"

export const ShortDescBlock = ({ description, quote }: ShortDescData) => {
  return (
    <section className="section-padding flex flex-col bg-light-beige pb-[60px] md:flex-row lg:pb-[120px]">
      <div className="flex-1">
        <Wysiwyg content={description} className="mb-10 text-dark-blue md:pr-8 lg:mb-0" />
      </div>
      <div className="flex flex-1 md:justify-center">
        <p className="quote-l max-w-[425px] text-dark-beige">{quote}</p>
      </div>
    </section>
  )
}
