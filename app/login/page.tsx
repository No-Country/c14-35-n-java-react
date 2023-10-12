import React from "react";
import PasswordInput from "@/components/PasswordInput";
import FormLayout from "@/components/FormLayout";
import FormInput from "@/components/FormInput";

const LoginPage = () => {
  return (
    <FormLayout>
        <h1 className="mx-auto text-4xl font-bold lg:text-5xl">
          Inicia sesión
        </h1>
        <FormInput type="email">Correo electrónico</FormInput>
        <FormInput type="password">Contraseña</FormInput>
        <button className="lg:mt-16 mt-12 text-lg normal-case btn btn-success hover:underline hover:bg-success-content hover:text-white hover">
          Iniciar sesión
        </button>

        <a
          href=""
          className="lg:mt-8 mt-6 font-bold text-center text-info hover:underline"
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
