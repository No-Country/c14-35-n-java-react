import React, { HtmlHTMLAttributes } from 'react'

const FormHeader = ({ className: additionalClasses, ...props }: HtmlHTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1 className={`mx-auto text-4xl font-bold lg:text-5xl ${additionalClasses}`} {...props} />
  )
}

export default FormHeader