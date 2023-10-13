import React from "react";

interface Props {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormLayout = ({ children, onSubmit }: Props) => {
  return (
    <form
      className="mx-auto max-w-xl mt-16 lg:mt-22 form-control md:px-8"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default FormLayout;
