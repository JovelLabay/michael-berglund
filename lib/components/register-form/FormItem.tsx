import classNames from "classnames"
import React, { useId } from "react"
import { FieldError, UseFormRegisterReturn } from "react-hook-form"

export interface FormItemProps {
  label: string
  inputType: "text" | "tel" | "email" | "checkbox" | "textarea"
  formRegister: UseFormRegisterReturn
  isDefaultChecked?: boolean
  hasInputError?: FieldError
}

export const FormItem = ({
  label,
  inputType,
  formRegister,
  isDefaultChecked,
  hasInputError,
}: FormItemProps) => {
  const formId = useId()
  let formItem = null

  switch (inputType) {
    case "checkbox":
      formItem = (
        <div className="mb-4 flex items-center">
          <input
            id={formId}
            type="checkbox"
            {...formRegister}
            className="form-chk mr-5 h-6 w-6 "
            // onChange={handleConfirmPolicy}
            checked={isDefaultChecked}
          />
          <label htmlFor={formId} className="body-s text-white">
            {label}
          </label>
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
              "!outline !outline-dark-red": hasInputError,
            })}
            placeholder={label}
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
