import { TextareaHTMLAttributes, forwardRef } from "react";
type FormInputType = "email" | "password" | "text" | "tel" | "textarea";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  type?: FormInputType;
  errorMessage?: string;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, Props>(function FormInput(
  { label, placeholder, ...props },
  ref
) {
  const textareaProps = { ...props, placeholder: placeholder ?? label };

  return (
    <>
      <label className="mt-4 lg:mt-10 label">
        <span className="font-semibold label-text">{label}</span>
      </label>
      <textarea
        {...textareaProps}
        ref={ref}
        className="h-24 textarea textarea-bordered textarea-success"
      ></textarea>
    </>
  );
});

export default FormTextarea;
