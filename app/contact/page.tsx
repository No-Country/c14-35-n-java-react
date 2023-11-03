"use client";
import FormAlert from "@/components/forms/FormAlert";
import FormButton from "@/components/forms/FormButton";
import FormHeader from "@/components/forms/FormHeader";
import FormInput from "@/components/forms/FormInput";
import FormLayout from "@/components/forms/FormLayout";
import FormTextarea from "@/components/forms/FormTextarea";
import React, { useEffect, useState } from "react";
import Spinner from "@/components/forms/Spinner";
import { sendContactForm } from "@/utils/api";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  message: string;
  phoneNumber: string;
}

const ContactPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    if (isLoading) {
      setDisplayError(false);
    }
  }, [isLoading]);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    setIsLoading(true);
    try {
      const res: any = await sendContactForm(data);
      if (res.ok) {
        setTimeout(() => {
        alert("El formulario se ha enviado exitosamente");
        }, 500);
        router.push("/");
      }
      console.log(res);
    } catch (error) {
      setDisplayError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>Contáctanos</FormHeader>
      {isLoading && <Spinner />}
      {displayError && (
        <div className="mt-7">
          <FormAlert
            dismissible={true}
            onClick={() => setDisplayError(false)}
          >
            Ha ocurrido un error
          </FormAlert>
        </div>
      )}

      <FormInput
        {...register("name")}
        label="Nombre"
        maxLength={20}
        required
      />
      <FormInput
        {...register("email")}
        label="Correo"
        type="email"
        maxLength={40}
        required
      />
      <FormInput
        {...register("phoneNumber")}
        label="Teléfono"
        type="tel"
        required
      />
      <FormTextarea
        {...register("message")}
        label="Mensaje"
        type="textarea"
        required
      />
      <FormButton type="submit">Enviar</FormButton>
    </FormLayout>
  );
};

export default ContactPage;
