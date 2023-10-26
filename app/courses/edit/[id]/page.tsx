import FormButton from "@/components/forms/FormButton";
import FormHeader from "@/components/forms/FormHeader";
import FormInput from "@/components/forms/FormInput";
import FormLayout from "@/components/forms/FormLayout";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const CourseEditPage: React.FC<Props> = ({ params: id }) => {
  return (
    <FormLayout>
      <FormHeader>Editar Curso</FormHeader>
      <FormInput label="Nombre" />
      <FormInput label="Subtítulo" />
      <FormInput
        label="Descripción"
        type="textarea"
      />
      <FormInput
        label="Imagen de presentación"
        type="file"
      />
      <FormButton>Guardar</FormButton>
    </FormLayout>
  );
};

export default CourseEditPage;
