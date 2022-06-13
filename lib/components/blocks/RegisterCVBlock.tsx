import { useGlobalContext } from "@context/global"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

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
  const [activeStep, setActiveStep] = useState(1)
  const router = useRouter()

  const handleNextStep = useCallback(() => {
    setActiveStep(prev => prev + 1)
  }, [activeStep])

  const handlePrevStep = useCallback(() => {
    setActiveStep(prev => prev - 1)
  }, [activeStep])

  const { infoDropdown } = professionalInfo

  const pageLocation = router.asPath

  return (
    <section className="flex bg-dark-green ">
      <div className="w-1/2 flex-1 bg-register-pattern pt-[100px] pl-12 pr-20">
        <h3 className="app-h3 mb-[60px] text-white">{heading}</h3>
        <Wysiwyg content={description} className="body-m mb-[26px] text-white" />

        <a
          href={files![downloadFile]}
          className="link-m flex items-center font-[350] text-white"
          download
        >
          {downloadLinkTitle}
          <DownloadIcon className="ml-[10px]" fill="white" />
        </a>
      </div>
      <div className="w-1/2 flex-1 px-[60px] pt-[100px]">
        {activeStep !== 3 && (
          <div className="mb-8 flex items-center justify-between">
            <h5 className="app-h4 text-white">
              {activeStep === 1 ? "Contact Details " : "Professional Information"}
            </h5>
            <span className="pre-title text-light-green">{activeStep} / 2</span>
          </div>
        )}

        {activeStep === 1 && (
          <p className="body-m mb-10 pr-5 text-white">
            Please fill in the form below to complete your registration. Fields marked with * are
            mandatory.
          </p>
        )}
        <RegisterForm
          infoDropdown={infoDropdown}
          activeStep={activeStep}
          nextStep={handleNextStep}
          prevStep={handlePrevStep}
          pageUrl={pageLocation}
        />
      </div>
    </section>
  )
}
