import { Listbox } from "@headlessui/react"
import classNames from "classnames"
import Link from "next/link"
import { SyntheticEvent, useState } from "react"

import { AddFileIcon } from "@icons/AddFileIcon"
import { DropdownArrow } from "@icons/DropdownArrow"
import { IDropDown } from "@models/common"

import { UploadCV } from "./UploadCV"

interface ProfInfoFieldsProps {
  infoDropdown: IDropDown[]
  register: any
  watch: any
  setValue: any
  errors: any
  pageLocation: string
  uploadCvhandler: (e: SyntheticEvent) => void
}

export const ProfInfoFields = ({
  infoDropdown,
  register,
  watch,
  setValue,
  errors,
  pageLocation,
  uploadCvhandler,
}: ProfInfoFieldsProps) => {
  const [hasConfirmedPolicy, setHasConfirmedPolicy] = useState(true)

  const handleConfirmPolicy = () => setHasConfirmedPolicy(!hasConfirmedPolicy)

  const onChangeHandler = (dropdown: IDropDown, value: string): any => {
    setValue(dropdown.fieldName, value)
  }

  return (
    <div className="mb-10 flex flex-col">
      {pageLocation === "/executive-search" && (
        <div className=" mb-4">
          <input
            type="text"
            className="form-input w-full"
            placeholder="Link to LinkedIn"
            {...register("linkedIn", { pattern: /^[A-Za-z]+$/i })}
          />
          {errors.linkedIn && "Please add a valid link"}
        </div>
      )}

      <div className="mb-4 flex flex-col">
        {infoDropdown.map(option => (
          <Listbox
            value={watch(option.fieldName)}
            onChange={value => onChangeHandler(option, value)}
            key={option.title}
          >
            {({ open }) => (
              <div className="relative">
                <Listbox.Button className="mb-5 flex w-full items-center justify-between rounded-sm bg-white p-4 text-left">
                  <span className="link-m font-[325] text-dark-blue opacity-50">
                    {option.title}
                  </span>
                  <DropdownArrow className={classNames({ "rotate-180": open })} />
                </Listbox.Button>
                <Listbox.Options className="absolute top-12 z-30 w-full overflow-auto rounded-sm bg-white px-4 pb-5 shadow-lg">
                  {option.values.map(value => (
                    <Listbox.Option
                      key={value}
                      value={value}
                      className="link-m mb-4 cursor-pointer text-dark-blue last-of-type:mb-0"
                    >
                      {value}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
        ))}
      </div>

      {/* Add cv */}
      {pageLocation === "/executive-search" && <UploadCV upload={uploadCvhandler} />}

      {/* checkboxes */}
      <div>
        <div className="mb-4 flex items-center">
          <input
            id="newsletter"
            type="checkbox"
            {...register("newsletter")}
            className="form-chk mr-5 h-6 w-6 "
            onChange={handleConfirmPolicy}
            checked={hasConfirmedPolicy}
          />
          <label htmlFor="newsletter" className="body-s text-white">
            Yes, I would like to receive the Michaël Berglund newsletter.
          </label>
        </div>

        <div className="flex items-center">
          <input
            id="privacy"
            type="checkbox"
            className="form-chk mr-5 h-6 w-6"
            {...register("privacyPolicy", { required: true })}
          />
          <label htmlFor="privacy" className="body-s text-white">
            I agree to the terms and conditions of Michaël Berglund’s{" "}
            {/* TODO: Add policy page href */}
            <Link href="">
              <a className="font-[350]">Privacy Policy.</a>
            </Link>
          </label>
        </div>
        {errors.privacyPolicy && "Please agree to policy"}
      </div>
    </div>
  )
}
