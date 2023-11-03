"use client";
import Pestudiante from "@/public/avatar_famale.svg";
import Image from "next/image";

const Estudiante = () => {
  return (
    <div>
      <h1> Bienvenido</h1>

      <div className="avatar flex justify-center items-center">
        <div className="w-60 rounded-full items-center">
          <Image
            src={Pestudiante}
            alt=""
          />
        </div>
      </div>

      {/* DATOS */}
      <div className="collapse collapse-arrow bg-base-200 mt-8">
        <input
          type="radio"
          name="my-accordion-2"
        />
        <div className="collapse-title text-xl font-medium">
          Informacion Básica
        </div>
        <div className="collapse-content">
          <input
            type="text"
            className="w-full text-center"
            placeholder="Nombre"
          />
          <input
            type="text"
            className="w-full text-center mt-3"
            placeholder="Apellido"
          />
          <input
            type="text"
            className="w-full text-center mt-3"
            placeholder="Título o Profesión"
          />
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200 mt-8">
        <input
          type="radio"
          name="my-accordion-2"
        />
        <div className="collapse-title text-xl font-medium">Foto de perfil</div>
        <div className="collapse-content">
          <input
            type="file"
            accept="image/*"
            className="mt-3"
          />
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200 mt-8">
        <input
          type="radio"
          name="my-accordion-2"
        />
        <div className="collapse-title text-xl font-medium">Mi Colección</div>
        <div className="collapse-content">
          <p>aca deben estar los cursos</p>
        </div>
      </div>
    </div>
  );
};

export default Estudiante;
