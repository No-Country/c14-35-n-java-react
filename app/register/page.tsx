"use client";
import FormButton from "@/components/forms/FormButton";
import FormAlert from "@/components/forms/FormAlert";
import FormHeader from "@/components/forms/FormHeader";
import FormInput from "@/components/forms/FormInput";
import FormLayout from "@/components/forms/FormLayout";
import { addUser } from "@/utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UseFormRegister, useForm } from "react-hook-form";
import { useAuthStore } from "@/state/authStore";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: "ADMIN" | "USER";
}

const RoleSelector: React.FC<{
  register: UseFormRegister<FormData>;
}> = ({ register }) => {
  return (
    <div className="mt-12">
      <input
        {...register("role")}
        name="role"
        className="hidden peer/student"
        id="student"
        type="radio"
        value="USER"
      />
      <label
        htmlFor="student"
        className="w-1/2 rounded-r-none btn btn-sm peer-checked/student:btn-success"
      >
        Soy estudiante
      </label>
      <input
        {...register("role")}
        name="role"
        className="hidden peer/educator"
        id="educator"
        type="radio"
        value="ADMIN"
      />
      <label
        htmlFor="educator"
        className="w-1/2 rounded-l-none btn btn-sm peer-checked/educator:btn-success"
      >
        Soy profesor
      </label>
    </div>
  );
};

const RegisterPage: React.FC = () => {
  const { logIn } = useAuthStore();
  const [displayError, setDisplayError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      role: "USER",
    },
  });
  const router = useRouter();
  const password = watch("password");
  const passwordConfirmation = watch("passwordConfirmation");

  useEffect(() => {
    if (isLoading) {
      setDisplayError(false);
    }
  }, [isLoading]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    console.log(data);

    try {
      const res = await addUser(data);
      if (res.ok) {
        logIn({
          id: 1,
          nombre: data.firstName,
          apellido: data.lastName,
          email: data.email,
          password: data.password,
          rol: data.role,
          curso: [],
        });
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setDisplayError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>Registrate</FormHeader>
      {isLoading && (
        <span className="loading loading-spinner text-info mx-auto mt-10 w-10"></span>
      )}
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

      <RoleSelector register={register} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <div>
          <FormInput
            {...register("firstName")}
            label="Nombre"
            maxLength={20}
            required
          />
        </div>
        <div>
          <FormInput
            {...register("lastName")}
            label="Apellido"
            maxLength={20}
            required
          />
        </div>
      </div>
      <FormInput
        {...register("email")}
        label="Correo"
        type="email"
        maxLength={40}
        required
      />
      <FormInput
        {...register("password")}
        label="Contraseña"
        type="password"
        maxLength={20}
        minLength={8}
        required
      />
      {password !== passwordConfirmation && (
        <p className="mt-2 text-sm font-medium text-error -mb-7">
          Las contraseñas no coinciden
        </p>
      )}
      <FormInput
        {...register("passwordConfirmation")}
        label="Confirmar contraseña"
        type="password"
        maxLength={20}
        minLength={8}
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
