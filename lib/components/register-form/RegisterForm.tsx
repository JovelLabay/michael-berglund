import { Listbox } from "@headlessui/react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { DropdownArrow } from "@icons/DropdownArrow"
import { IDropDown } from "@models/common"

interface RegisterForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  dropdown: string[]
}

interface RegisterFormProps {
  infoDropdown: IDropDown[]
}

export const RegisterForm = ({ infoDropdown }: RegisterFormProps) => {
  const [dropDownValue, setDropDownValue] = useState<string[]>([])

  const { register, handleSubmit, reset } = useForm<RegisterForm>()
  const onSubmit: SubmitHandler<RegisterForm> = data => {
    console.log(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="mb-10 flex flex-col">
        <h4 className="pre-title mb-6 uppercase text-light-green">Contact details</h4>
        <div className="mb-5 flex w-full space-x-5">
          <input
            className="form-input flex-1"
            placeholder="First name"
            {...register("firstName")}
          />
          <input className="form-input flex-1" placeholder="Last name" {...register("firstName")} />
        </div>
        <div className="flex flex-col space-y-5">
          <input className="form-input" placeholder="Email" {...register("email")} />
          <input className="form-input" placeholder="Phone number" {...register("phone")} />
        </div>
      </div>

      {/* Add cv */}
      <div className="mb-10 flex flex-col">
        <h4 className="pre-title mb-6 uppercase text-light-green">Your cv</h4>
      </div>

      {/* Professinal info */}
      <div className="mb-10 flex flex-col">
        <h4 className="pre-title mb-6 uppercase text-light-green">professional information</h4>
        <div className="flex flex-col">
          {infoDropdown.map((option, i) => (
            <Listbox value={dropDownValue} onChange={setDropDownValue} name="dropdown">
              <Listbox.Button className="mb-5 flex items-center justify-between bg-white p-4 text-left">
                <span className="link-m opacity-25">{option.title}</span>
                <DropdownArrow />
              </Listbox.Button>
              <Listbox.Options>
                {option.values.map(value => (
                  <Listbox.Option
                    key={value}
                    value={value}
                    className="text-white"
                    {...register("dropdown")}
                  >
                    {value}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          ))}
        </div>
      </div>

      <button type="submit" className="form-btn">
        Register
      </button>
    </form>
  )
}
