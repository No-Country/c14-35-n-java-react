import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import FormLayout from "@/components/forms/FormLayout";
import React from "react";

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Edtech project by c14-35-n-java-react team.",
};


const ContactPage = () => {
  return (
    <FormLayout>
      <h1 className="mx-auto text-4xl font-bold lg:text-5xl">Contáctanos</h1>
      <FormInput label="Nombre" />
      <FormInput label="Correo" type="email" />
      <FormInput label="Teléfono" type="tel" />
      <FormInput label="Mensaje" type="textarea" />
      <FormButton>Enviar</FormButton>
    </FormLayout>
  );
};

export default ContactPage;
