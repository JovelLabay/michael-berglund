import { Listbox } from "@headlessui/react"
import { useState } from "react"

import { AddFileIcon } from "@icons/AddFileIcon"
import { DropdownArrow } from "@icons/DropdownArrow"
import { IDropDown } from "@models/common"

interface ProfInfoFieldsProps {
  infoDropdown: IDropDown[]
  register: any
  watch: any
  setValue: any
  pageLocation: string
}

export const ProfInfoFields = ({
  infoDropdown,
  register,
  watch,
  setValue,
  pageLocation,
}: ProfInfoFieldsProps) => {
  const onChangeHandler = (dropdown: IDropDown, value: string): any => {
    setValue(dropdown.fieldName, value)
  }

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

      <div className="mb-4 flex flex-col">
        {infoDropdown.map(option => (
          <Listbox
            value={watch(option.fieldName)}
            onChange={value => onChangeHandler(option, value)}
            key={option.title}
          >
            <div className="relative">
              <Listbox.Button className="mb-5 flex w-full items-center justify-between rounded-sm bg-white p-4 text-left">
                <span className="link-m font-[325] text-dark-blue opacity-50">{option.title}</span>
                <DropdownArrow />
              </Listbox.Button>
              <Listbox.Options className="absolute top-0 z-30 w-full overflow-auto rounded-md bg-white p-2 shadow-lg">
                {option.values.map(value => (
                  <Listbox.Option
                    key={value}
                    value={value}
                    className="mb-2 cursor-pointer text-dark-blue"
                  >
                    {value}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        ))}
      </div>

      {/* Add cv */}
      <div className="mb-10 flex flex-col">
        <h4 className="pre-title mb-4 uppercase text-light-green"> Upload your cv</h4>
        <label
          htmlFor="uploadCv"
          className="form-input flex cursor-pointer items-center justify-center text-white outline outline-white"
        >
          <AddFileIcon className="mr-[10px]" />
          <span className="link-m pr-2">Add file or drop files here</span>{" "}
          <span className="link-s text-medium-green"> pdf, doc, doxc, jpg · max 10 mb</span>
          <input
            id="uploadCv"
            type="file"
            accept=".doc,.docx,.pdf,.jpeg,.jpg,.png"
            {...register("cvFile")}
            className="hidden"
          />
        </label>
        {/* TODO: show file name. */}
        {/* <span className="text-white">File name here</span> */}
      </div>

      {/* checkboxes */}
      <div>
        <div className="mb-4 flex items-center">
          <input
            id="newsletter"
            type="checkbox"
            {...register("newsletter")}
            className="form-chk mr-5 h-6 w-6 "
          />
          <label htmlFor="newsletter" className="body-s text-white">
            Yes, I would like to receive the Michaël Berglund newsletter.
          </label>
        </div>

        <div className="flex items-center">
          <input id="privacy" type="checkbox" className="form-chk mr-5 h-6 w-6" />
          <label htmlFor="privacy" className="body-s text-white">
            I agree to the terms and conditions of Michaël Berglund’s Privacy Policy.
          </label>
        </div>
      </div>
    </div>
  )
}
