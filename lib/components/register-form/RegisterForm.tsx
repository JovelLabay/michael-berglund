import { Listbox } from "@headlessui/react"
import classNames from "classnames"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { ArrowRight } from "@icons/ArrowRight"
import { DropdownArrow } from "@icons/DropdownArrow"
import { IDropDown } from "@models/common"

import { ProfInfoFields } from "./ProfInfoFields"

interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  newsletter: boolean
}

interface ExSearchFields extends RegisterFormData {
  linkedIn: string
  selectRole: string
  sizeOfLeaderShip: string
  intExperience: string
}

interface InterimEffectfields extends RegisterFormData {
  budgetResponsibility: string
  sizeOfLeaderShip: string
  language: string
  intExperience: string
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
  const { register, handleSubmit, reset, watch } = useForm<FormDataUnion>()
  const onSubmit: SubmitHandler<FormDataUnion> = data => {
    console.log(data)
    reset()
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full pb-[100px]">
      {activeStep === 1 && (
        <div className="mb-10 flex flex-col space-y-4">
          <input
            type="text"
            className="form-input"
            placeholder="First name*"
            {...register("firstName", { required: true })}
          />
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
            {...register("phone", { required: true })}
          />
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
        />
      )}

      {activeStep === 3 && <p>Thank you!!</p>}

      {/* Buttons */}
      {activeStep !== 3 && (
        <div
          className={classNames("flex items-center justify-between", {
            "justify-end": activeStep === 1,
          })}
        >
          {activeStep === 1 ? (
            <button
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
              <button type="submit" className="form-btn">
                Register
              </button>{" "}
            </>
          )}
        </div>
      )}
    </form>
  )
}
