import { Lecture } from "@/types/section.types";
import { useState } from "react";
import AddItemButton from "./AddItemButton";

interface Props {
  blockId: number;
  onCancel: () => void;
  onSave(blockId: number, lecture: Lecture): void;
}

const AddLectureForm: React.FC<Props> = ({ blockId, onCancel, onSave }) => {
  const [displayForm, setDisplaForm] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(blockId, { title, content });
    setTitle("");
    setContent("");
    setDisplaForm(false);
  };

  return displayForm ? (
    <form
      onSubmit={handleFormSubmit}
      className="border-2 rounded-none border-neutral transition-all"
    >
      <h2>{displayForm}</h2>
      <div className="text-lg p-4 flex justify-between space-x-4">
        <input
          value={title}
          autoFocus={true}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Título de la lección"
          className="w-full px-0 text-lg border-0 input h-fit text-neutral font-medium"
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
      <div className="px-4 pb-4">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={2}
          className="textarea w-full p-2 text-base border-2 border-gray-200"
          placeholder="Contenido de la lección"
        ></textarea>
      </div>
    </form>
  ) : (
    <AddItemButton
      type="LECTURE"
      onClick={() => setDisplaForm(true)}
    />
  );
};

export default AddLectureForm;
