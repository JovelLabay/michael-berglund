import { GlobalContext } from "@context/global"
import { motion } from "framer-motion"
import { useContext } from "react"

import { MenuItem } from "./MenuItem"

export const MenuContent = () => {
  const {
    acfGlobal: {
      menu: { menuLinks },
    },
  } = useContext(GlobalContext)

  return (
    <motion.div
      key="menuContent"
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ ease: "easeInOut" }}
      className="absolute top-0 z-10 flex h-full w-full items-center justify-between bg-dark-green px-12 text-white"
    >
      <div className="app-h2 relative flex w-full flex-col space-y-10">
        {menuLinks &&
          menuLinks.map(link => (
            <MenuItem
              key={link.text}
              text={link.text}
              link="#"
              image={link.pagelink.featuredImage.node}
            />
          ))}
      </div>
    </motion.div>
  )
}
