import { Listbox } from "@headlessui/react"

import { DropdownArrow } from "@icons/DropdownArrow"
import { IDropDown } from "@models/common"

interface ProfInfoFieldsProps {
  infoDropdown: IDropDown[]
  ChangeHandler?: () => void
  register: any
  watch: any
  pageLocation: string
}

export const ProfInfoFields = ({
  infoDropdown,
  ChangeHandler,
  register,
  watch,
  pageLocation,
}: ProfInfoFieldsProps) => {
  return (
    <div className="mb-10 flex flex-col">
      {pageLocation === "/executive-search" && (
        <input
          type="text"
          className="form-input mb-4"
          placeholder="Link to LinkedIn"
          {...register("linkedIn")}
        />
      )}

      <div className="flex flex-col">
        {infoDropdown.map((option, i) => (
          <Listbox
            value={watch("fieldName")}
            onChange={() => {}}
            name="dropdown"
            key={option.title}
          >
            <Listbox.Button className="mb-5 flex items-center justify-between rounded-sm bg-white p-4 text-left">
              <span className="link-m font-[325] text-dark-blue opacity-50">{option.title}</span>
              <DropdownArrow />
            </Listbox.Button>
            <Listbox.Options>
              {option.values.map(value => (
                <Listbox.Option key={value} value={value} className="text-white">
                  {value}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        ))}
      </div>

      {/* Add cv */}
      <div className="mb-10 flex flex-col">
        <h4 className="pre-title mb-6 uppercase text-light-green"> Upload your cv</h4>
        <input type="file" />
      </div>

      {/* checkboxes */}
      <div>
        <div className="mb-4 flex items-center">
          <input type="checkbox" {...register("newsletter")} className="mr-5 h-6 w-6 " />
          <label className="body-s text-white">
            Yes, I would like to receive the Michaël Berglund newsletter.
          </label>
        </div>

        <div className="flex items-center">
          <input type="checkbox" className="mr-5 h-6 w-6" />
          <label className="body-s text-white">
            I agree to the terms and conditions of Michaël Berglund’s Privacy Policy.
          </label>
        </div>
      </div>
    </div>
  )
}
