import { useGlobalContext } from "@context/global"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"

import { RegisterForm, ThankYouMsg } from "@components/register-form"
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
  }, [])

  const handlePrevStep = useCallback(() => {
    setActiveStep(prev => prev - 1)
  }, [])

  const { infoDropdown } = professionalInfo

  const pageLocation = router.asPath

  return (
    <section id="register-cv" className="flex flex-col bg-dark-green lg:flex-row ">
      <div className="w-full flex-1 bg-register-pattern py-[60px] px-5 lg:w-1/2 lg:py-[100px] lg:pl-12 lg:pr-20">
        <h3 className="app-h3 mb-[60px] text-white">{heading}</h3>
        <Wysiwyg content={description} className="cv-form body-m mb-[26px]" />
        {downloadLinkTitle && (
          <a
            href={files![downloadFile!]}
            className="link-m flex items-center font-[350] text-white"
            download
          >
            {downloadLinkTitle}
            <DownloadIcon className="ml-[10px]" fill="white" />
          </a>
        )}
      </div>
      <div className="w-full flex-1 px-5 py-[60px] lg:w-1/2 lg:py-[100px] lg:px-[60px]">
        {activeStep !== 3 && (
          <div className="mb-8 flex items-center justify-between">
            <h5 className="app-h4 text-white">
              {activeStep === 1 ? "Kontaktuppgifter" : "Professionell information"}
            </h5>
            <span className="pre-title text-light-green">{activeStep} / 2</span>
          </div>
        )}

        {activeStep === 1 && (
          <p className="body-m mb-10 pr-5 text-white">
            Vänligen fyll i formuläret för att slutföra din registrering. Fält markerade med * är
            obligatoriska.
          </p>
        )}

        {activeStep !== 3 && (
          <RegisterForm
            infoDropdown={infoDropdown}
            activeStep={activeStep}
            nextStep={handleNextStep}
            prevStep={handlePrevStep}
            pageUrl={pageLocation}
          />
        )}

        {activeStep === 3 && <ThankYouMsg />}
      </div>
    </section>
  )
}
