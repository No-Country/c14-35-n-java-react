import { FormHTMLAttributes } from "react";

const FormLayout = ({ className: additionalClasses, ...props }: FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form
      {...props}
      className={`mx-auto max-w-xl lg:mt-22 form-control md:px-8 ${additionalClasses}`}
    />
  );
};

export default FormLayout;
