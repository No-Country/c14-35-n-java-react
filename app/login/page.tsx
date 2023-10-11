import React from "react";
import PasswordInput from "../components/PasswordInput";

const LoginPage = () => {
  return (
    <div>
      <div className="max-w-xl mx-auto mt-16 lg:mt-22 form-control md:px-8">
        <h1 className="mx-auto text-4xl font-bold lg:text-5xl">
          Inicia sesión
        </h1>
        <label className="lg:mt-12 mt-8 label">
          <span className="font-semibold lg:text-lg label-text lg:font-bold">
            Correo electrónico
          </span>
        </label>
        <input
          type="text"
          placeholder="Correo electrónico"
          className="w-full input input-bordered input-success"
        />
        <label className="lg:mt-12 mt-8 label">
          <span className="font-semibold lg:text-lg label-text lg:font-bold">
            Contraseña
          </span>
        </label>
        <PasswordInput className="w-full input input-bordered input-success" />
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
      </div>
    </div>
  );
};

export default LoginPage;
