"use client";
import FormButton from "../forms/FormButton";
import FormHeader from "../forms/FormHeader";
import FormInput from "../forms/FormInput";
import FormLayout from "../forms/FormLayout";
import FormTextarea from "../forms/FormTextarea";
import { Controller, useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { GroupBase } from "react-select";

interface FormData {
  name: string;
  description: string;
  videoUrl: string;
  categories: { label: string; value: string }[];
}

interface Props {
  onSave: (
    name: string,
    description: string,
    videoUrl: string,
    imageUrl: string,
    categories: { nombre: string }[]
  ) => void;
}

const AddCourseForm: React.FC<Props> = ({ onSave }) => {
  const { register, handleSubmit, control } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    const match = data.videoUrl.match(/v=([^&]+)/);
    if (!match) {
      throw new Error("Invalid YouTube URL");
    }
    const videoId = match[1];
    const imageUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    onSave(
      data.name,
      data.description,
      data.videoUrl,
      imageUrl,
      data.categories.map((category) => ({
        nombre:
          category.value.charAt(0).toUpperCase() + category.value.slice(1),
      }))
    );
  };

  const defaultCategories = [
    { value: "Inglés", label: "Inglés" },
    { value: "Programación", label: "Programación" },
    { value: "Diseño", label: "Diseño" },
    { value: "Marketing", label: "Marketing" },
    { value: "Matemáticas", label: "Matemáticas" },
  ];

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
        maxLength={125}
        required
      />
      <label className="mt-4 lg:mt-10 label">
        <span className="font-semibold label-text">Categorías</span>
      </label>
      <Controller
        name="categories"
        control={control}
        render={({ field }) => (
          <CreatableSelect
            instanceId={"categories"}
            {...field}
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                neutral20: "#36d399",
              },
            })}
            formatCreateLabel={(inputValue) =>
              `Crear categoría "${inputValue}"`
            }
            placeholder="Seleccionar categorías"
            components={makeAnimated()}
            options={defaultCategories}
            isMulti={true}
          />
        )}
      />
      <FormInput
        {...register("videoUrl")}
        label="URL del vídeo de la presentación"
        placeholder="URL del vídeo"
        required
      />
      <FormButton type="submit">Crear curso</FormButton>
    </FormLayout>
  );
};

export default AddCourseForm;
