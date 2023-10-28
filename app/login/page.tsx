"use client";
import FormLayout from "@/components/forms/FormLayout";
import FormInput from "@/components/forms/FormInput";
import { useRouter } from "next/navigation";
import FormHeader from "@/components/forms/FormHeader";
import FormButton from "@/components/forms/FormButton";
import FormError from "@/components/forms/FormError";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const router = useRouter();

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/login?email=${email}&password=${password}`
    )
      .then((res) => {
        if (res.status === 200) {
          router.push("/");
        } else {
          setDisplayError(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setDisplayError(true);
      });
  };

  return (
    <>
      <FormLayout onSubmit={(event) => handleOnSubmit(event)}>
        {displayError && (
          <FormError onClick={() => setDisplayError(false)}>
            Ha ocurrido un error
          </FormError>
        )}
        <FormHeader>Iniciar sesión</FormHeader>
        <FormInput
          label="Correo electrónico"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <FormInput
          label="Contraseña"
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
