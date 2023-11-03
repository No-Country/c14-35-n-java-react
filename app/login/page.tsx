"use client";
import FormLayout from "@/components/forms/FormLayout";
import FormInput from "@/components/forms/FormInput";
import { useRouter } from "next/navigation";
import FormHeader from "@/components/forms/FormHeader";
import FormButton from "@/components/forms/FormButton";
import FormAlert from "@/components/forms/FormAlert";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiLoginUser } from "@/utils/api";
import { UserData } from "@/types/courses.types";
import { useAuthStore } from "@/state/authStore";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { logIn, logOut } = useAuthStore();
  const [displayError, setDisplayError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  useEffect(() => {
    logOut();
  }, [logOut]);

  useEffect(() => {
    if (isLoading) {
      setDisplayError(false);
    }
  }, [isLoading]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const user: UserData = await apiLoginUser(data);
      logIn(user);
      router.push("/");
    } catch (error) {
      console.error(error);
      setDisplayError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormLayout onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>Iniciar sesión</FormHeader>
        {isLoading && (
          <span className="loading loading-spinner text-info mx-auto mt-10 w-10"></span>
        )}
        {displayError && (
          <div className="mt-7">
            <FormAlert
              dismissible={true}
              onClick={() => setDisplayError(false)}
            >
              Las credenciales ingresadas son incorrectas
            </FormAlert>
          </div>
        )}

        <FormInput
          {...register("email")}
          label="Correo electrónico"
          type="email"
          maxLength={40}
          required
        />
        <FormInput
          {...register("password")}
          label="Contraseña"
          type="password"
          maxLength={20}
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
          <a
            href=""
            className="font-bold hover:underline"
          >
            terminos y condiciones
          </a>{" "}
          y el{" "}
          <a
            href=""
            className="font-bold hover:underline"
          >
            aviso de privacidad.
          </a>
        </p>
      </FormLayout>
    </>
  );
};

export default LoginPage;
