"use client";
import FormButton from "@/components/forms/FormButton";
import FormError from "@/components/forms/FormError";
import FormHeader from "@/components/forms/FormHeader";
import FormInput from "@/components/forms/FormInput";
import FormLayout from "@/components/forms/FormLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const router = useRouter();

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName || !lastName || !email || !password || !passwordConfirmation)
      return;

    // fetch(process.env.NEXT_API_BASE_URL + "/usuario", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //     rol: {
    //       estudiante: true,
    //       educador: false,
    //       administrador: false,
    //     },
    //   }),
    // })
    fetch(
      `${process.env.NEXT_API_BASE_URL}/registro?nombre=${
        firstName + " " + lastName
      }&email=${email}&password=${password}&password2=${passwordConfirmation}"`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.status === 201) {
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

  interface UserRoleButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
    className: string;
  }

  const UserRoleButtons: React.FC<UserRoleButtonsProps> = ({
    className,
    ...props
  }) => {
    return (
      <div
        {...props}
        className={`grid w-full grid-cols-2 text-center gap-x-4 ${className} radio-group`}
      >
        <span>
          <input
            className="hidden peer"
            id="studentRole"
            name="role"
            type="radio"
            defaultChecked={true}
          />
          <label
            htmlFor="studentRole"
            className="w-full btn btn-sm peer-checked:btn-info"
          >
            Soy estudiante
          </label>
        </span>
        <span>
          <input
            className="hidden peer"
            id="educatorRole"
            name="role"
            type="radio"
          />
          <label
            htmlFor="educatorRole"
            className="w-full btn btn-sm peer-checked:btn-info"
          >
            Soy profesor
          </label>
        </span>
      </div>
    );
  };

  return (
    <FormLayout onSubmit={(event) => handleOnSubmit(event)}>
      {displayError && (
        <FormError onClick={() => setDisplayError(false)}>
          Ha ocurrido un error
        </FormError>
      )}
      <FormHeader>Registrate</FormHeader>
      <UserRoleButtons className="mt-12 -mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <div>
          <FormInput
            label="Nombre"
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </div>
        <div>
          <FormInput
            label="Apellido"
            required
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
      </div>
      <FormInput
        className="mt-2"
        label="Correo"
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
      {password !== passwordConfirmation && (
        <p className="mt-2 text-sm font-medium text-error -mb-7">
          Las contraseñas no coinciden
        </p>
      )}
      <FormInput
        label="Confirmar contraseña"
        type="password"
        onChange={(event) => setPasswordConfirmation(event.target.value)}
        required
      />
      <p className="mt-5 text-sm text-center text-info">
        Al registrarte, aceptas nuestras
        <br />
        <a
          href=""
          className="font-bold hover:underline"
        >
          Condiciones de uso
        </a>{" "}
        y nuestra{" "}
        <a
          href=""
          className="font-bold hover:underline"
        >
          Politica de privacidad.
        </a>
      </p>
      <FormButton
        disabled={password !== passwordConfirmation}
        type="submit"
      >
        Crear cuenta
      </FormButton>
      <p className="mt-6 text-center text-info">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="font-bold hover:underline"
        >
          Inicia sesión
        </Link>
      </p>
    </FormLayout>
  );
};

export default RegisterPage;
