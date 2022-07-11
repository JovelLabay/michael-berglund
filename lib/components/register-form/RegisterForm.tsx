import classNames from "classnames"
import { SyntheticEvent } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { ArrowRight } from "@icons/ArrowRight"
import { IDropDown } from "@models/common"

import { FormItem } from "./FormItem"
import { ProfInfoFields } from "./ProfInfoFields"
import { ThankYouMsg } from "./ThankYouMsg"
import { UploadCV } from "./UploadCV"

interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  cvFile?: File
  newsletter?: boolean
  privacyPolicy: boolean
}

interface ExSearchFields extends RegisterFormData {
  linkedIn: string
  selectRole: string
  sizeOfLeaderShip: string
  internationalExperience: string
}

interface InterimEffectfields extends RegisterFormData {
  budgetResponsibility: string
  sizeOfLeaderShip: string
  language: string
  internationalExperience: string
  compensation: string
  industry: string
  availability: string
}

type FormDataUnion = RegisterFormData | ExSearchFields | InterimEffectfields

interface RegisterFormProps {
  infoDropdown: IDropDown[]
  activeStep: number
  nextStep: () => void
  prevStep: () => void
  pageUrl: string
}

export const RegisterForm = ({
  infoDropdown,
  activeStep,
  nextStep,
  prevStep,
  pageUrl,
}: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormDataUnion>({
    mode: "onBlur",
  })

  // TODO: Connect to external api.
  const onSubmit: SubmitHandler<FormDataUnion> = data => {
    console.log(data)
    reset()
    nextStep()
  }

  const handleCvUpload = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement

    if (target.files && target.files.length > 0) {
      setValue("cvFile", target.files[0])
    }
  }

  // TODO: Add styling to error messages.
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:pb-[100px]">
      {activeStep === 1 && (
        <div className="mb-10 flex flex-col space-y-4">
          <FormItem
            label="Förnamn*"
            inputType="text"
            formRegister={register("firstName", { required: true })}
            hasInputError={errors.firstName}
          />
          <FormItem
            label="Efternamn*"
            inputType="text"
            formRegister={register("lastName", { required: true })}
            hasInputError={errors.lastName}
          />
          <FormItem
            label="E-postadress*"
            inputType="email"
            formRegister={register("email", { required: true })}
            hasInputError={errors.email}
          />
          <FormItem
            label="Telefonnummer*"
            inputType="tel"
            formRegister={register("phone", { required: true })}
            hasInputError={errors.phone}
          />
          <FormItem
            label="Ort*"
            inputType="text"
            formRegister={register("city", { required: true })}
            hasInputError={errors.city}
          />
        </div>
      )}

      {/* Dropdowns */}
      {activeStep === 2 && (
        <ProfInfoFields
          infoDropdown={infoDropdown}
          register={register}
          pageLocation={pageUrl}
          watch={watch}
          setValue={setValue}
          errors={errors}
          uploadCvhandler={handleCvUpload}
        />
      )}

      {activeStep === 3 && <ThankYouMsg />}

      {/* Buttons */}
      {activeStep !== 3 && (
        <div className="flex justify-end">
          {activeStep === 1 ? (
            <button
              // disabled={!isValid}
              type="button"
              onClick={nextStep}
              className="link-m flex items-center font-[350] text-white "
            >
              <span>Nästa steg</span>
              <ArrowRight className="ml-[10px] fill-white" />
            </button>
          ) : (
            <div className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="link-m mb-8 flex items-center font-[350] text-white lg:mb-0"
              >
                <ArrowRight className="mr-[10px] rotate-180 fill-white" /> Föregående steg
              </button>
              <button type="submit" className={classNames("form-btn")}>
                Registrera
              </button>{" "}
            </div>
          )}
        </div>
      )}
    </form>
  )
}
