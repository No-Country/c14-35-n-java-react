import { useState } from "react";
import AddItemButton from "./AddItemButton";
import { useForm } from "react-hook-form";

interface Props {
  onCancel?: () => void;
  onSave: (title: string) => void;
}

interface FormData {
  title: string;
}

const AddBlockForm: React.FC<Props> = ({ onCancel = () => {}, onSave }) => {
  const [displayForm, setDisplaForm] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    onSave(data.title);
    setDisplaForm(false);
    reset();
  };

  return displayForm ? (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-2 rounded-none border-neutral transition-all mt-4"
    >
      <div className="text-lg p-4 flex justify-between space-x-4">
        <input
          tabIndex={1}
          placeholder="Título de la sección"
          className="w-full px-0 text-lg border-0 input h-fit text-neutral font-medium"
          autoFocus={true}
          required
          {...register("title")}
        />
        <button
          tabIndex={3}
          type="button"
          onClick={() => {
            setDisplaForm(false);
            onCancel();
          }}
          className="btn btn-sm btn-error btn-outline"
        >
          Cancelar
        </button>
        <button
          tabIndex={2}
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
