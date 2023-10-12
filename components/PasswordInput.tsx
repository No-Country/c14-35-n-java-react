"use client";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface Props {
  children: React.ReactNode;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = ({ children, placeholder, onChange }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const icon = showPassword ? (
    <AiOutlineEyeInvisible size={28} />
  ) : (
    <AiOutlineEye size={28} />
  );

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className="input input-bordered input-success w-full"
        onChange={onChange}
      />
      <div
        className="mt-2 absolute right-3 top-0.5"
        onClick={() => setShowPassword(!showPassword)}
      >
        {icon}
      </div>
    </div>
  );
};

export default PasswordInput;
