import classNames from "classnames"
import { SyntheticEvent } from "react"

import { AddFileIcon } from "@icons/AddFileIcon"

interface UploadCVProps {
  upload: (e: SyntheticEvent) => void
  classname?: string
}

export const UploadCV = ({ upload, classname }: UploadCVProps) => {
  return (
    <div className={classNames("mb-10 flex flex-col", classname)}>
      <h4 className="pre-title mb-4 uppercase text-light-green"> Ladda upp ditt CV</h4>
      <label
        htmlFor="uploadCv"
        className="form-input flex cursor-pointer flex-col items-center justify-center text-white outline outline-white xl:flex-row"
      >
        <div className="mb-1 flex lg:mb-0">
          <AddFileIcon className="mr-[10px]" />
          <span className="link-m pr-2">Ladda upp eller lägg till fil</span>{" "}
        </div>
        <span className="link-s text-medium-green"> pdf, doc, doxc, jpg · max 10 mb</span>
        <input
          id="uploadCv"
          type="file"
          multiple={false}
          accept=".doc,.docx,.pdf,.jpeg,.jpg,.png"
          onChange={upload}
          className="hidden"
        />
      </label>
      {/* TODO: show file name. */}
      {/* <span className="text-white">File name here</span> */}
    </div>
  )
}
