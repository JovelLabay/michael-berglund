import classNames from "classnames"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { ArrowRight } from "@icons/ArrowRight"
import { IDropDown } from "@models/common"

import { ProfInfoFields } from "./ProfInfoFields"
import { ThankYouMsg } from "./ThankYouMsg"

interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  cvFile?: File
  newsletter?: boolean
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
    defaultValues: { firstName: "", lastName: "", email: "", phone: "" },
  })

  const onSubmit: SubmitHandler<FormDataUnion> = data => {
    console.log(data, errors)
    reset()
    nextStep()
  }

  console.log(isValid)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full pb-[100px]">
      {activeStep === 1 && (
        <div className="mb-10 flex flex-col space-y-4">
          <div>
            <input
              type="text"
              className="form-input w-full"
              placeholder="First name*"
              {...register("firstName", { required: true, pattern: /^[A-Za-z]+$/i })}
            />
            {errors.firstName && "Error"}
          </div>
          <input
            type="text"
            className="form-input "
            placeholder="Last name*"
            {...register("lastName", { required: true })}
          />
          <input
            type="email"
            className="form-input"
            placeholder="E-mail address*"
            {...register("email", { required: true })}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Phone number*"
            {...register("phone", {
              required: true,
              pattern: /^(?:(?:(?:(?:0{2}?)|(?:\+){1})46)|0)\d{8,9}$/,
            })}
          />
          {errors.phone && "phone is required or wrong format"}
          <input
            type="text"
            className="form-input"
            placeholder="City*"
            {...register("city", { required: true })}
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
        />
      )}

      {activeStep === 3 && <ThankYouMsg />}

      {/* Buttons */}
      {activeStep !== 3 && (
        <div
          className={`flex items-center ${activeStep === 1 ? "justify-end" : "justify-between"}`}
        >
          {activeStep === 1 ? (
            <button
              disabled={!isValid}
              type="button"
              onClick={nextStep}
              className="link-m flex items-center font-[350] text-white "
            >
              Next Step <ArrowRight className="ml-[10px] fill-white" />
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={prevStep}
                className="link-m flex items-center font-[350] text-white "
              >
                <ArrowRight className="mr-[10px] rotate-180 fill-white" /> Previous Step
              </button>
              <button type="submit" className={classNames("form-btn")}>
                Register
              </button>{" "}
            </>
          )}
        </div>
      )}
    </form>
  )
}
