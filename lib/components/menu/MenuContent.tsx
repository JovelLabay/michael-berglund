import { useGlobalContext } from "@context/global"
import { motion } from "framer-motion"

import { BaseBlock } from "@models/blocks"

import { MenuItem } from "./MenuItem"

export const MenuContent = () => {
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
      className="absolute top-0 z-50 flex h-full w-full items-center justify-between bg-dark-green px-[20px] text-white md:px-12"
    >
      <div className="app-h2 relative flex w-full flex-col space-y-3 md:space-y-10">
        {menuLinks &&
          menuLinks.map((link, index) => (
            <MenuItem
              key={index}
              text={link.text}
              link={link.pagelink.uri}
              image={link.pagelink.featuredImage.node}
              description={link.description}
            />
          ))}
      </div>
    </motion.div>
  )
}
