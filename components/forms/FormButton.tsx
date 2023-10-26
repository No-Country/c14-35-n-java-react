import { ButtonHTMLAttributes } from "react"

const FormButton = ({ children = "Iniciar sesión", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className="w-full mt-10 text-lg normal-case rounded-lg lg:mt-18 btn btn-success hover:bg-success-content hover:text-white hover">
      {children}
    </button>
  )
}

export default FormButton