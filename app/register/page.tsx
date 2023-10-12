import FormInput from "@/components/FormInput";
import FormLayout from "@/components/FormLayout";

const registerPage = () => {
  return (
    <FormLayout>
      <h1 className="mx-auto text-4xl font-bold text-center lg:text-5xl">
        Registrate
      </h1>
      <form className="px-8 pt-6 mb-4 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4">
          <div>
            <FormInput>Nombre</FormInput>
          </div>
          <div>
            <FormInput>Apellido</FormInput>
          </div>
        </div>
        <FormInput type="email">Correo</FormInput>
        <FormInput type="password">Contraseña</FormInput>
        <p className="mt-5 text-sm text-center text-info">
          Al registrarte, aceptas nuestras{" "}
          <a href="" className="font-bold hover:underline">
            Condiciones de uso
          </a>{" "}
          y nuestra{" "}
          <a href="" className="font-bold hover:underline">
            Politica de privacidad.
          </a>
        </p>

        <button
          type="button"
          className="text-white bg-gradient-to-r from-success via-success to-accent hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-success font-medium text-sm px-5 py-2.5 text-center mb-2 block w-full rounded"
        >
          Iniciar sesión
        </button>

        <p className="mt-6 font-bold text-center text-info hover:underline">
          {" "}
          <a href="" className="font-bold hover:underline">
            ¿Ya tienes cuenta?. Inicia sesión
          </a>
        </p>
      </form>
    </FormLayout>
  );
};

export default registerPage;