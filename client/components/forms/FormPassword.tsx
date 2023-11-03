"use client";
import { InputHTMLAttributes, forwardRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  function PasswordInput({ ...props }, ref) {
    const [showPassword, setShowPassword] = useState(false);
    const icon = showPassword ? (
      <AiOutlineEyeInvisible size={28} />
    ) : (
      <AiOutlineEye size={28} />
    );

    return (
      <div className="relative">
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className="w-full input input-bordered input-success"
          ref={ref}
        />
        <div
          className="mt-2 absolute right-3 top-0.5"
          onClick={() => setShowPassword(!showPassword)}
        >
          {icon}
        </div>
      </div>
    );
  }
);

export default PasswordInput;
