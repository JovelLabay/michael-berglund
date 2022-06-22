import { Card } from "@components/cards"
import { AppLink } from "@components/shared/AppLink"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { ExternalUrlIcon } from "@icons/ExternalUrlIcon"
import { NewsPaper } from "@icons/NewsPaper"
import { PlusIcon } from "@icons/PlusIcon"
import { PressFeedData } from "@models/blocks"

export const PressFeedBlock = ({ title, pressList }: PressFeedData) => {
  const pressCardList = pressList.map(({ title, details, url, titleId }) => {
    const cardBody = (
      <div className="p-8">
        <NewsPaper />
        <h4 className="app-h4 mt-[21px]">{title}</h4>
        <Wysiwyg content={details} className="my-5" />
        {url && (
          <AppLink href={url} className="flex items-center space-x-[10px]">
            <span className="link-m font-[350] text-dark-green">Go to article</span>
            <ExternalUrlIcon />
          </AppLink>
        )}
      </div>
    )
    return <Card key={titleId} link={url} body={cardBody} />
  })

  return (
    <section className="section-padding  bg-white pb-[120px]">
      <h3 className="app-h3 mb-[60px]">{title}</h3>
      <div className="grid grid-cols-1 gap-5 md:gap-8 md:grid-cols-2 lg:grid-cols-2">{pressCardList}</div>
      <div className="link-m mt-[60px] flex w-full cursor-pointer items-center justify-center space-x-[10px] text-center font-[350] text-dark-green">
        <span>Load more</span>
        <PlusIcon />
      </div>
    </section>
  )
}
