import React from "react";

interface Props {
  children: React.ReactNode;
}

const FormLayout = ({ children }: Props) => {
  return (
    <div className="mx-auto max-w-xl mt-16 lg:mt-22 form-control md:px-8">
      {children}
    </div>
  );
};

export default FormLayout;
