import classNames from "classnames"
import { SyntheticEvent, useEffect, useState } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

import { AddFileIcon } from "@icons/AddFileIcon"
import { CloseIcon } from "@icons/CloseIcon"

interface UploadCVProps {
  classname?: string
  formRegister: UseFormRegisterReturn
  forId: string
}

export const UploadCV = ({ classname, formRegister, forId }: UploadCVProps) => {
  const [cvFileName, setCvFileName] = useState("")
  const [isFiles, setIsFiles] = useState(false)

  const { onChange, ...params } = formRegister

  const handleCvUpload = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement

    if (target.files && target.files.length > 0) {
      setCvFileName(target.files[0].name)
      setIsFiles(true)
    }
    onChange(e)
  }

  const removeFile = (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsFiles(false)
  }

  return (
    <label
      htmlFor={forId}
      className={classNames(
        "flex cursor-pointer flex-col items-center justify-center rounded-sm py-4 px-4 text-white outline outline-white xl:flex-row",
        classname
      )}
    >
      <div className="mb-1 flex lg:mb-0">
        <AddFileIcon className="mr-[10px]" />
        <span className="link-m pr-2">
          {isFiles ? cvFileName : "Ladda upp eller lägg till fil"}
        </span>
      </div>
      <span className="link-s text-medium-green">
        {isFiles ? (
          <button onClick={removeFile} className="flex items-center">
            <CloseIcon />
          </button>
        ) : (
          "pdf, doc, doxc, jpg · max 10 mb"
        )}
      </span>
      <input
        id={forId}
        {...params}
        type="file"
        multiple={false}
        accept=".doc,.docx,.pdf,.jpeg,.jpg,.png"
        className="hidden"
        onChange={handleCvUpload}
      />
    </label>
  )
}
