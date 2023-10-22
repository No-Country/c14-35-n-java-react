"use client";

import FormLayout from "@/components/forms/FormLayout";
import FormInput from "@/components/forms/FormInput";
import { useRouter } from "next/navigation";
import FormHeader from "@/components/forms/FormHeader";
import FormButton from "@/components/forms/FormButton";
import FormError from "@/components/forms/FormError";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }

    fetch("http://localhost:8080/usuario/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => {
      if (res.status === 201) {
        router.push("/");
      }
    }).catch((error) => {
      console.error(error);
      setError(true);
    });
  };

  return (
    <>
      <FormLayout onSubmit={(event) => handleOnSubmit(event)}>
        {error &&
          <FormError>Ha ocurrido un error</FormError>
        }
        <FormHeader>Iniciar sesión</FormHeader>
        <FormInput
          label="Correo electrónico"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <FormInput label="Contraseña"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <FormButton type="submit">Iniciar sesión</FormButton>
        <a
          href=""
          className="mt-6 font-bold text-center lg:mt-8 text-info hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </a>
        <p className="mt-5 text-sm text-center text-info">
          Al continuar con tu correo o tu red social aceptas los{" "}
          <a href="" className="font-bold hover:underline">
            terminos y condiciones
          </a>{" "}
          y el{" "}
          <a href="" className="font-bold hover:underline">
            aviso de privacidad.
          </a>
        </p>
      </FormLayout>
    </>
  );
};

export default LoginPage;
