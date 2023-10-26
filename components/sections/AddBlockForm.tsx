import { Block } from "@/types/section.types";
import { useEffect, useState } from "react";
import AddItemButton from "./AddItemButton";

interface Props {
  onCancel: () => void;
  onSave: (title: string) => void;
}

const AddBlockForm: React.FC<Props> = ({ onCancel, onSave }) => {
  const [displayForm, setDisplaForm] = useState(false);
  const [title, setTitle] = useState("");

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(title);
    setTitle("");
    setDisplaForm(false);
  };

  return displayForm ? (
    <form
      onSubmit={handleFormSubmit}
      className="border-2 rounded-none border-neutral transition-all mt-4"
      tabIndex={0}
    >
      <div className="text-lg p-4 flex justify-between space-x-4">
        <input
          placeholder="Título de la sección"
          className="w-full px-0 text-lg border-0 input h-fit text-neutral font-medium"
          value={title}
          autoFocus={true}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-sm btn-error btn-outline"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn btn-sm btn-neutral btn-outline btn-active"
        >
          Guardar
        </button>
      </div>
    </form>
  ) : (
    <AddItemButton
      type="BLOCK"
      onClick={() => setDisplaForm(true)}
    />
  );
};

export default AddBlockForm;
