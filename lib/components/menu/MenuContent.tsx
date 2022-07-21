import { useGlobalContext } from "@context/global"
import { BaseBlock, isDescWithImageData, isRelatedArticlesData } from "@models/blocks"
import { motion } from "framer-motion"

import { MenuItem } from "./MenuItem"
import { DescWithImageData } from "@models/blocks"
import { DescWithImgBlock } from "@components/blocks"
import { getPostLinkIds } from "@/lib/utils/BlockParser"

export const MenuContent = ({ blocks }: { blocks: BaseBlock[] }) => {
  const {
    acf: {
      acfGlobal: {
        menu: { menuLinks },
      },
    },
  } = useGlobalContext()

  return (
    <motion.div
      key="menuContent"
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ ease: "easeInOut" }}
      className="absolute top-0 z-50 flex h-full w-full items-center justify-between bg-dark-green px-12 text-white"
    >
      <div className="app-h2 relative flex w-full flex-col space-y-3 md:space-y-10">
        {menuLinks &&
          menuLinks.map((link, index) => (
            <MenuItem
              key={index}
              text={link.text}
              link={link.pagelink.uri}
              image={link.pagelink.featuredImage.node}
              blocks={blocks}
              description={link.description}
            />
          ))}
      </div>
    </motion.div>
  )
}
