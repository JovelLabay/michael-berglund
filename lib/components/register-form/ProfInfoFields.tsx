import { Listbox } from "@headlessui/react"
import Link from "next/link"
import { SyntheticEvent, useState } from "react"

import { AddFileIcon } from "@icons/AddFileIcon"
import { DropdownArrow } from "@icons/DropdownArrow"
import { IDropDown } from "@models/common"

interface ProfInfoFieldsProps {
  infoDropdown: IDropDown[]
  register: any
  watch: any
  setValue: any
  errors: any
  pageLocation: string
}

export const ProfInfoFields = ({
  infoDropdown,
  register,
  watch,
  setValue,
  errors,
  pageLocation,
}: ProfInfoFieldsProps) => {
  const [hasConfirmedPolicy, setHasConfirmedPolicy] = useState(true)

  const handleConfirmPolicy = () => setHasConfirmedPolicy(!hasConfirmedPolicy)

  const onChangeHandler = (dropdown: IDropDown, value: string): any => {
    setValue(dropdown.fieldName, value)
  }

  const handleCvUpload = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement

    if (target.files && target.files.length > 0) {
      setValue("cvFile", target.files[0])
    }
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
            <div className="relative">
              <Listbox.Button className="mb-5 flex w-full items-center justify-between rounded-sm bg-white p-4 text-left">
                <span className="link-m font-[325] text-dark-blue opacity-50">{option.title}</span>
                <DropdownArrow />
              </Listbox.Button>
              <Listbox.Options className="absolute top-14 z-30 w-full overflow-auto rounded-sm bg-white p-2 shadow-lg">
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
          className="form-input flex cursor-pointer flex-col items-center justify-center text-white outline outline-white xl:flex-row"
        >
          <div className="mb-1 flex lg:mb-0">
            <AddFileIcon className="mr-[10px]" />
            <span className="link-m pr-2">Add file or drop files here</span>{" "}
          </div>
          <span className="link-s text-medium-green"> pdf, doc, doxc, jpg · max 10 mb</span>
          <input
            id="uploadCv"
            type="file"
            multiple={false}
            accept=".doc,.docx,.pdf,.jpeg,.jpg,.png"
            onChange={handleCvUpload}
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
