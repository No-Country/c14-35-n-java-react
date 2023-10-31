import { InputHTMLAttributes, forwardRef } from "react";
import PasswordInput from "./FormPassword";
type FormInputType = "email" | "password" | "text" | "tel" | "textarea";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: FormInputType;
  errorMessage?: string;
}

const FormInput = forwardRef<HTMLInputElement, Props>(function FormInput(
  { errorMessage, ...props },
  ref
) {
  const className = `input input-bordered input-success w-full ${props.className}`;

  const inputProps = {
    ...props,
    placeholder: props.placeholder ?? props.label,
  };

  return (
    <>
      <label className="mt-4 lg:mt-10 label">
        <span className="font-semibold label-text">{props.label}</span>
      </label>
      {props.type === "password" ? (
        <PasswordInput {...inputProps} />
      ) : (
        <input
          {...inputProps}
          className={className}
          ref={ref}
        />
      )}
    </>
  );
});

export default FormInput;
