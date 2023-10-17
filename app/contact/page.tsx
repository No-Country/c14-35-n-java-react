import FormInput from "@/components/forms/FormInput";
import FormLayout from "@/components/forms/FormLayout";
import React from "react";

const ContactPage = () => {
  return (
    <FormLayout>
      <h1 className="mx-auto text-4xl font-bold lg:text-5xl">Contacto</h1>
      <FormInput label="Nombre" />
      <FormInput label="Correo" type="email" />
      <FormInput label="Teléfono" type="tel" />
      <FormInput label="Mensaje" type="textarea" />
    </FormLayout>
  );
};

export default ContactPage;
