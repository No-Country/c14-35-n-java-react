import React from "react";
interface Props {
  children: React.ReactNode;
  placeholder?: string;
  type?: string;
}

const FormInput = ({ children, placeholder, type }: Props) => {
  return (
    <>
      <label className="lg:mt-12 mt-8 label">
        <span className="font-semibold lg:text-lg label-text lg:font-bold">
          {children}
        </span>
      </label>
      <input
        type={type ?? "text"}
        placeholder={typeof children === "string" ? children : placeholder}
        className="w-full input input-bordered input-success"
      />
    </>
  );
};

export default FormInput;
