"use client";
import React from "react";
import PasswordInput from "@/components/PasswordInput";
import FormLayout from "@/components/FormLayout";
import FormInput from "@/components/FormInput";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }

    fetch("http://localhost:8080/usuario/login", {
      method: "GET",
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
    });
  };

  return (
    <FormLayout onSubmit={(event) => handleOnSubmit(event)}>
      <h1 className="mx-auto text-4xl font-bold lg:text-5xl">Inicia sesión</h1>
      <FormInput
        type="email"
        onChange={(event) => setEmail(event.target.value)}
        required={true}
      >
        Correo electrónico
      </FormInput>
      <FormInput
        type="password"
        onChange={(event) => setPassword(event.target.value)}
        required={true}
      >
        Contraseña
      </FormInput>
      <button
        className="mt-12 text-lg normal-case lg:mt-16 btn btn-success hover:underline hover:bg-success-content hover:text-white hover"
        type="submit"
      >
        Iniciar sesión
      </button>

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
  );
};

export default LoginPage;
