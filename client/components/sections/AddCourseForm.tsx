"use client";
import { useState } from "react";
import FormButton from "../forms/FormButton";
import FormHeader from "../forms/FormHeader";
import FormInput from "../forms/FormInput";
import FormLayout from "../forms/FormLayout";

interface Props {
  onSave: (
    name: string,
    subtitle: string,
    description: string,
    imageUrl: string
  ) => void;
}

const AddCourseForm: React.FC<Props> = ({ onSave }) => {
  const [name, setName] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(name, subtitle, description, imageUrl);
  };

  return (
    <FormLayout
      className="w-full"
      onSubmit={handleFormSubmit}
    >
      <FormHeader>Crear Curso</FormHeader>
      <FormInput
        label="Nombre"
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
      <FormInput
        label="Subtítulo"
        onChange={(event) => setSubtitle(event.target.value)}
        value={subtitle}
      />
      <FormInput
        label="Descripción"
        onChange={(event) => setDescription(event.target.value)}
        value={description}
        type="textarea"
      />
      <FormInput
        label="URL de la imagen de presentación"
        onChange={(event) => setDescription(event.target.value)}
        value={description}
        placeholder="URL"
      />
      <FormButton type="submit">Crear curso</FormButton>
    </FormLayout>
  );
};

export default AddCourseForm;
