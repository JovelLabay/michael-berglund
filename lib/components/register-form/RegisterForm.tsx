import { zodResolver } from "@hookform/resolvers/zod"
import classNames from "classnames"
import { SubmitHandler, useForm } from "react-hook-form"
import { any, z } from "zod"

import { FormURLParse, makeid } from "@/lib/utils/http-invenias"
import { ArrowRight } from "@icons/ArrowRight"
import { WarningIcon } from "@icons/WarningIcon"
import { IDropDown } from "@models/common"

import { FormItem } from "./FormItem"
import { ProfInfoFields } from "./ProfInfoFields"

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1).email(),
  phone: z.string().regex(/^(?:(?:(?:(?:0{2}?)|(?:\+){1})46)|0)\d{8,9}$/),
  city: z.string().min(1),
  cvFile: z.any().optional(),
  coverLetter: z.any().optional(),
  newsletter: z.boolean(),
  privacyPolicy: z.literal(true),
  linkedIn: z.string().optional(),
  budgetResponsibility: z.string().optional(),
  language: z.string().optional(),
  compensation: z.string().optional(),
  industry: z.string().optional(),
  availability: z.string().optional(),
  arrayOptions: z.string().array().optional(),
})

interface RegisterFormProps {
  type: any
  infoDropdown: IDropDown[]
  activeStep: number
  nextStep: () => void
  prevStep: () => void
  pageUrl: string
}

export const RegisterForm = ({
  type,
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
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.output<typeof schema>>({ mode: "onBlur", resolver: zodResolver(schema) })
  const onSubmit: SubmitHandler<z.output<typeof schema>> = async data => {
    const formData = new FormData()
    formData.append("file", data["cvFile"][0])
    formData.append("type", type)
    Object.entries(data).forEach(([key, value]) => {
      if (key != "cvFile") {
        formData.append(key, value)
      }
    })

    try {
      const response = await fetch(`/api/register-cv`, {
        method: "POST",
        body: formData,
      })
      if (response.ok) {
        reset()
        nextStep()
      } else {
        throw new Error(response.statusText)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const validateStep1 = async () => {
    const validate = await trigger(["firstName", "lastName", "email", "phone", "city"])

    if (validate === false) {
      return
    } else {
      nextStep()
    }
  }

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
        />
      )}

      {/* Buttons */}
      {activeStep !== 3 && (
        <div className="flex justify-end">
          {activeStep === 1 ? (
            <button
              type="button"
              onClick={validateStep1}
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
              <button
                type="submit"
                className={classNames("form-btn", { "bg-red-400": Object.keys(errors).length > 0 })}
              >
                {Object.keys(errors).length > 0 ? (
                  <div className="flex items-center justify-center">
                    <WarningIcon />
                    <span className="ml-2.5">Granska formuläret</span>
                  </div>
                ) : (
                  "Registrera"
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </form>
  )
}
