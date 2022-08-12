import { Listbox, Transition } from "@headlessui/react"
import classNames from "classnames"
import Link from "next/link"
import { useEffect, useState } from "react"
import { UseFormRegister, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form"

import { AddFileIcon } from "@icons/AddFileIcon"
import { DropdownArrow } from "@icons/DropdownArrow"
import { IDropDown } from "@models/common"

import { FormItem } from "./FormItem"
import { UploadCV } from "./UploadCV"

interface ProfInfoFieldsProps {
  infoDropdown: IDropDown[]
  showCoverLetter: "0" | "1"
  register: any
  watch: any
  setValue: any
  errors: any
  pageLocation: string
}

export const ProfInfoFields = ({
  infoDropdown,
  showCoverLetter,
  register,
  watch,
  setValue,
  errors,
  pageLocation,
}: ProfInfoFieldsProps) => {
  const [hasConfirmedNewsletter, setHasConfirmedNewsletter] = useState(true)
  const [selectedOption, setSelectedOptions] = useState([])
  const handleConfirmNewsletter = () => setHasConfirmedNewsletter(!hasConfirmedNewsletter)

  const onChangeHandler = (dropdown: IDropDown, value: any): any => {
    setSelectedOptions(data => data.concat(value))
    setValue(
      "arrayOptions",
      selectedOption.filter((value, index, array) => {
        return array.indexOf(value) === index
      })
    )
  }

  const gdprLabel = (
    <label htmlFor="privacy" className="body-s text-white">
      Jag godkänner villkoren i Michaël Berglunds
      {/* TODO: Add policy page href */}
      <Link href="/privacy-policy">
        <a className="font-[350]"> integritetspolicy.</a>
      </Link>
    </label>
  )

  return (
    <div className="mb-10 flex flex-col">
      {/* LinkedIn */}
      {pageLocation === "/executive-search" && (
        <div className="mb-4">
          <FormItem
            label="Länk till LinkedIn-profil"
            inputType="text"
            formRegister={register("linkedIn")}
            hasInputError={errors.linkedIn}
          />
        </div>
      )}

      {/* Dropdowns */}
      <div className="mb-4 flex flex-col">
        {infoDropdown.map(option => (
          <Listbox
            value={watch("arrayOptions")}
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
                <Transition
                  show={open}
                  enter="transition ease-in duration-75"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute top-12 z-30 w-full overflow-auto rounded-sm bg-white px-4 pb-5 shadow-lg">
                    {option.multiValueDropDown?.map(obj => (
                      <Listbox.Option
                        key={obj.value}
                        value={obj.value}
                        className=" mb-4 cursor-pointer last-of-type:mb-0"
                      >
                        {({ selected, active }) => (
                          <span
                            className={`${
                              active || selected ? "text-dark-beige" : "text-dark-blue"
                            } link-m font-[325]`}
                          >
                            {obj.label}
                          </span>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            )}
          </Listbox>
        ))}
      </div>

      {/* Add cv & letter*/}
      <div className="mb-10 flex flex-col">
        <h4 className="pre-title mb-4 uppercase text-light-green">
          {showCoverLetter === "1" ? "Ladda upp CV & Personligt brev" : "Ladda upp ditt CV"}
        </h4>
        <UploadCV forId="cv" formRegister={register("cvFile")} classname="mb-5" />

        {showCoverLetter === "1" && (
          <UploadCV forId="letter" formRegister={register("coverLetter")} />
        )}
      </div>

      {/* Newsletter */}
      <div>
        <FormItem
          label="Ja, jag vill anmäla mig till Michaël Berglunds nyhetsbrev."
          inputType="checkbox"
          formRegister={register("newsletter")}
          isDefaultChecked={hasConfirmedNewsletter}
          onCheck={handleConfirmNewsletter}
        />

        {/* Privacy policy */}
        <FormItem
          label={gdprLabel}
          inputType="checkbox"
          formRegister={register("privacyPolicy", { required: true })}
          hasInputError={errors.privacyPolicy}
        />
      </div>
    </div>
  )
}
