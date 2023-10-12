import FormInput from "@/components/FormInput";
import FormLayout from "@/components/FormLayout";
import React from "react";

const ContactPage = () => {
  return (
    <FormLayout>
      <h1 className="mx-auto text-4xl font-bold lg:text-5xl">Contacto</h1>
      <FormInput>Nombre</FormInput>
      <FormInput type="email">Correo</FormInput>
    </FormLayout>
  );
};

export default ContactPage;
