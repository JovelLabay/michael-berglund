import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ShortDescData } from "@models/blocks"

export const ShortDescBlock = ({ description, quote }: ShortDescData) => {
  return (
    <section className="flex bg-white px-12 pt-[100px] pb-[120px]">
      <Wysiwyg content={description} className="flex-1 pr-[147px] text-dark-blue" />
      <div className="flex-1">
        <p className="quote-l max-w-[425px] text-dark-beige">{quote}</p>
      </div>
    </section>
  )
}
