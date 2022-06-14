import classNames from "classnames"

interface WysiwygProps {
  content: string
  className?: string
  hasWysiwyg?:boolean
}

export const Wysiwyg = ({ content, className, hasWysiwyg = true }: WysiwygProps) => {
  return (
    <div
      className={classNames(hasWysiwyg ? "wysiwyg" : '', className)}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  )
}
