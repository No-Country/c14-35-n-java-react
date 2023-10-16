import { FormHTMLAttributes, HTMLAttributes } from 'react'

const FormError = ({ children = "Ha ocurrido un error", ...props }: FormHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="mb-8 alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span {...props}>{children}</span>
    </div>
  )
}

export default FormError