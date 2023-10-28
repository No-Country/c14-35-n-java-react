import { InputHTMLAttributes } from "react";
import PasswordInput from "./FormPassword";
type FormInputType = "email" | "password" | "text" | "tel" | "textarea";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: FormInputType;
  errorMessage?: string;
}

const FormInput = ({
  label,
  type = "text",
  errorMessage,
  placeholder,
  ...props
}: Props) => {
  const inputPlaceholder = placeholder ?? label;
  const className = "input input-bordered input-success w-full";

  const inputProps = {
    ...props,
    placeholder: inputPlaceholder,
  };

  return (
    <>
      <label className="mt-4 lg:mt-10 label">
        <span className="font-semibold label-text">{label}</span>
      </label>
      {type === "textarea" ? (
        <textarea className="h-24 textarea textarea-bordered textarea-success"></textarea>
      ) : type === "password" ? (
        <PasswordInput {...inputProps} className={className} />
      ) : (
        <input {...inputProps} type={type} className={className} />
      )}
      <div className="text-error">{errorMessage}</div>
    </>
  );
};

export default FormInput;
