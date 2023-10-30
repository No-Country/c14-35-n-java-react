"use client";
import FormButton from "../forms/FormButton";
import FormHeader from "../forms/FormHeader";
import FormInput from "../forms/FormInput";
import FormLayout from "../forms/FormLayout";
import FormTextarea from "../forms/FormTextarea";
import { useForm } from "react-hook-form";

interface FormData {
  name: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
}

interface Props {
  onSave: (
    name: string,
    description: string,
    videoUrl: string,
    imageUrl: string
  ) => void;
}

const AddCourseForm: React.FC<Props> = ({ onSave }) => {
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    onSave(data.name, data.description, data.videoUrl, data.imageUrl);
  };

  return (
    <FormLayout
      className="w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormHeader className="mx-auto">Crear Curso</FormHeader>
      <FormInput
        {...register("name")}
        label="Nombre del curso"
        required
      />
      <FormTextarea
        {...register("description")}
        label="Descripción del curso"
        required
      />
      <FormInput
        {...register("videoUrl")}
        label="URL del vídeo de la presentación"
        placeholder="URL del vídeo"
        required
      />
      <FormInput
        {...register("imageUrl")}
        label="URL de la imagen de presentación"
        placeholder="URL de la imagen"
        required
      />
      <FormButton type="submit">Crear curso</FormButton>
    </FormLayout>
  );
};

export default AddCourseForm;
