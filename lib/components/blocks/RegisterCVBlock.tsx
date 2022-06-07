import { useGlobalContext } from "@context/global"

import { RegisterForm } from "@components/register-form"
import { Wysiwyg } from "@components/shared/Wysiwyg"
import { DownloadIcon } from "@icons/DownloadIcon"
import { RegisterCvData } from "@models/blocks"

export const RegisterCVBlock = ({
  heading,
  description,
  downloadFile,
  downloadLinkTitle,
  professionalInfo,
}: RegisterCvData) => {
  const { files } = useGlobalContext()

  const { infoDropdown } = professionalInfo

  return (
    <section className="flex h-[1042px] bg-dark-green">
      <div className="w-1/2 flex-1 bg-register-pattern pt-[100px] pl-12 pr-20">
        <h3 className="app-h3 mb-[60px] text-white">{heading}</h3>
        <Wysiwyg content={description} className="body-m mb-[26px] text-white" />

        <a href={files![downloadFile]} className="link-m flex items-center text-white" download>
          {downloadLinkTitle}
          <DownloadIcon className="ml-[10px]" fill="white" />
        </a>
      </div>
      <div className="w-1/2 flex-1 px-[60px] pt-[100px]">
        <RegisterForm infoDropdown={infoDropdown} />
      </div>
    </section>
  )
}
