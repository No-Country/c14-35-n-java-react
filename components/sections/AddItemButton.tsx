import { Section } from "@/types/courses.types";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type: Section;
  onClick: () => void;
}

const AddItemButton: React.FC<Props> = ({ type, ...props }) => {
  return (
    <button
      {...props}
      className="border-2 border-neutral font-semibold flex items-center justify-center p-1.5 mt-3 hover:text-base-100 hover:bg-neutral transition-colors space-x-1.5"
    >
      <AiOutlinePlus size={20} />
      <span>Añadir {type === "LECTURE" ? "lección" : "sección"}</span>
    </button>
  );
};

export default AddItemButton;
