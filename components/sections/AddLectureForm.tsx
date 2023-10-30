import { useState } from "react";
import AddItemButton from "./AddItemButton";
import { useForm } from "react-hook-form";

interface Props {
  blockId: number;
  onCancel: () => void;
  onSave(blockId: number, title: string, url_recurso: string): void;
}

interface FormData {
  title: string;
  url_recurso: string;
}

const AddLectureForm: React.FC<Props> = ({ blockId, onCancel, onSave }) => {
  const [displayForm, setDisplaForm] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    onSave(blockId, data.title, data.url_recurso);
    reset();
    setDisplaForm(false);
  };

  const handleCancel = () => {
    setDisplaForm(false);
    reset();
    onCancel();
  };

  return displayForm ? (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-2 rounded-none border-neutral transition-all"
    >
      <h2>{displayForm}</h2>
      <div className="text-lg p-4 flex justify-between space-x-4">
        <input
          {...register("title")}
          tabIndex={1}
          autoFocus={true}
          placeholder="Título de la lección"
          className="w-full px-0 text-lg border-0 input h-fit text-neutral font-medium"
          required
        />
        <button
          tabIndex={5}
          type="button"
          onClick={handleCancel}
          className="btn btn-sm btn-error btn-outline"
        >
          Cancelar
        </button>
        <button
          tabIndex={4}
          type="submit"
          className="btn btn-sm btn-neutral btn-outline btn-active"
        >
          Guardar
        </button>
      </div>
      <div className="px-4 pb-4 space-y-4">
        <input
          {...register("url_recurso")}
          tabIndex={2}
          placeholder="URL del vídeo"
          className="w-full px-2 text-base input font-medium h-fit rounded-md border-gray-200 border-2 py-1"
          required
        />
      </div>
    </form>
  ) : (
    <AddItemButton
      type="LECTURE"
      autoFocus={true}
      onClick={() => setDisplaForm(true)}
    />
  );
};

export default AddLectureForm;
