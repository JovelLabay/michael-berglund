import { useGlobalContext } from "@context/global"
import { motion } from "framer-motion"

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
      className="absolute top-0 z-50 flex h-full w-full items-center justify-between bg-dark-green px-12 text-white"
    >
      <div className="app-h2 relative flex w-full flex-col space-y-10">
        {menuLinks &&
          menuLinks.map(link => (
            <MenuItem
              key={link.text}
              text={link.text}
              link={link.pagelink.uri}
              image={link.pagelink.featuredImage.node}
            />
          ))}
      </div>
    </motion.div>
  )
}
