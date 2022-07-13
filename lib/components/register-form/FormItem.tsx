import classNames from "classnames"
import React, { ReactElement, useId } from "react"
import { FieldError, UseFormRegisterReturn } from "react-hook-form"

export interface FormItemProps {
  label: string | ReactElement
  inputType: "text" | "tel" | "email" | "checkbox" | "textarea"
  formRegister: UseFormRegisterReturn
  isDefaultChecked?: boolean
  hasInputError?: FieldError
  onCheck?: () => void
}

export const FormItem = ({
  label,
  inputType,
  formRegister,
  isDefaultChecked,
  hasInputError,
  onCheck,
}: FormItemProps) => {
  const formId = useId()
  let formItem = null

  switch (inputType) {
    case "checkbox":
      formItem = (
        <div className="mb-4 flex flex-col last-of-type:mb-0">
          <div className="flex items-center">
            <input
              id={formId}
              type="checkbox"
              {...formRegister}
              className={classNames("form-chk mr-5 h-6 w-6 ", {
                "outline outline-dark-red": hasInputError,
              })}
              onChange={onCheck}
              checked={isDefaultChecked}
            />
            <label htmlFor={formId} className="body-s text-white">
              {label}
            </label>
          </div>
          {hasInputError && (
            <small className="mt-2 text-dark-red">Du måste godkänna villkoren.</small>
          )}
        </div>
      )
      break

    default:
      formItem = (
        <div className="relative">
          <input
            type="text"
            id={formId}
            className={classNames("form-input peer w-full placeholder-transparent", {
              "outline outline-dark-red": hasInputError,
            })}
            placeholder=" "
            {...formRegister}
          />
          <label className="form-label" htmlFor={formId}>
            {label}
          </label>

          {hasInputError && <small className="text-dark-red">Vänligen fyll i detta fält.</small>}
        </div>
      )
      break
  }

  return formItem
}
