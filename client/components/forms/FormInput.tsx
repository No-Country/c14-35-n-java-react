import React, { InputHTMLAttributes } from "react";
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
  placeholder = placeholder ?? label;
  const inputClasses = "input input-bordered input-success w-full";

  return (
    <React.Fragment>
      <label className="mt-4 lg:mt-10 label">
        <span className="font-semibold label-text">
          {label}
        </span>
      </label>
      {type === "textarea" ? (
        <textarea className="h-24 textarea textarea-bordered textarea-success"></textarea>
      ) : type === "password" ? (
        <PasswordInput {...props} className={inputClasses} />
      ) : (
        <input
          {...props}
          type={type}
          className={inputClasses}
        />
      )}
      <div className="text-error">{errorMessage}</div>
    </React.Fragment>
  );
};

export default FormInput;
