import { InputHTMLAttributes } from "react";
import PasswordInput from "./FormPassword";
type FormInputType =
  | "email"
  | "password"
  | "text"
  | "tel"
  | "textarea"
  | "file";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: FormInputType;
  errorMessage?: string;
}

const FormInput = ({ label, type = "text", errorMessage, ...props }: Props) => {
  const className = "w-full input input-bordered input-success";

  props = {
    ...props,
    placeholder: props.placeholder ?? label,
    className,
  };

  let inputElement: React.ReactNode;
  switch (type) {
    case "textarea":
      inputElement = (
        <textarea className="h-24 textarea textarea-bordered textarea-success"></textarea>
      );
      break;
    case "password":
      inputElement = <PasswordInput {...props} />;
      break;
    case "file":
      inputElement = (
        <input
          {...props}
          type="file"
          className="file-input file-input-bordered file-input-success w-full"
        />
      );
      break;
    default:
      inputElement = (
        <input
          {...props}
          type={type}
        />
      );
      break;
  }

  return (
    <>
      <label
        className="mt-4 lg:mt-10 label"
        htmlFor={label}
      >
        <span className="font-semibold label-text">{label}</span>
      </label>
      {inputElement}
      <div className="text-error">{errorMessage}</div>
    </>
  );
};

export default FormInput;
