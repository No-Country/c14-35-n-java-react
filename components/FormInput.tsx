import React from "react";
import PasswordInput from "./PasswordInput";
interface Props {
  children: React.ReactNode;
  placeholder?: string;
  type?: "email" | "password" | "text" | "tel";
  errorMessage?: string;
}

const FormInput = ({
  children,
  placeholder,
  type = "text",
  errorMessage,
}: Props) => {
  placeholder =
    placeholder ?? (typeof children === "string" ? children : placeholder);

    const inputClasses = "input input-bordered input-success bg-";

  return (
    <>
      <label className="lg:mt-10 mt-6 label">
        <span className="font-semibold lg:text-lg label-text lg:font-bold">
          {children}
        </span>
      </label>
        {type === "password" ? (
          <PasswordInput placeholder={placeholder}>{children}</PasswordInput>
        ) : (
          <input type={type ?? "text"} placeholder={placeholder} className="input input-bordered input-success w-full"/>
        )}
      <div className="text-error">{errorMessage}</div>
    </>
  );
};

export default FormInput;
