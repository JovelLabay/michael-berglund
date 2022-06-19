import classNames from "classnames"

interface WysiwygProps {
  content: string
  className?: string
}

export const Wysiwyg = ({ content, className }: WysiwygProps) => {
  return (
    <div
      className={classNames("wysiwyg", className)}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  )
}
