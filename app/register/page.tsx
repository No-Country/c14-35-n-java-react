"use client";
import FormButton from "@/components/forms/FormButton";
import FormError from "@/components/forms/FormError";
import FormHeader from "@/components/forms/FormHeader";
import FormInput from "@/components/forms/FormInput";
import FormLayout from "@/components/forms/FormLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName || !lastName || !email || !password || !passwordConfirmation) return;

    fetch("http://localhost:8080/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        rol: {
          "estudiante": true,
          "educador": false,
          "administrador": false,
        }
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
    <FormLayout onSubmit={(event) => handleOnSubmit(event)}>
      {error &&
        <FormError>Ha ocurrido un error</FormError>
      }
      <FormHeader>Registrate</FormHeader>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
        <div>
          <FormInput label="Nombre"
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </div>
        <div>
          <FormInput label="Apellido"
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
      </div>
      <FormInput label="Correo"
        type="email"
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <FormInput label="Contraseña"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <FormInput label="Confirmar contraseña"
        type="password"
        onChange={(event) => setPasswordConfirmation(event.target.value)}
        required
      />
      <p className="mt-5 text-sm text-center text-info">
        Al registrarte, aceptas nuestras<br />
        <a href="" className="font-bold hover:underline">
          Condiciones de uso
        </a>{" "}
        y nuestra{" "}
        <a href="" className="font-bold hover:underline">
          Politica de privacidad.
        </a>
      </p>
      <FormButton disabled={password !== passwordConfirmation} type="submit">Crear cuenta</FormButton>
      <p className="mt-6 text-center text-info">
        ¿Ya tienes cuenta? <Link href="/login" className="font-bold hover:underline">
          Inicia sesión
        </Link>
      </p>
    </FormLayout >
  );
};

export default RegisterPage;
