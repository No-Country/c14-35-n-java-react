"use client";
import Pdocente from "@/public/avatar_male.svg";
import { useAuthStore } from "@/state/authStore";
import { UserData } from "@/types/courses.types";
import Image from "next/image";

const Docente = () => {
  const { user } = useAuthStore() as { user: UserData };
  if (typeof window === "undefined") return null;
  return (
    <div>
      <h1> Bienvenido</h1>

      <div className="flex items-center justify-center avatar">
        <div className="items-center rounded-full w-60">
          <Image
            priority={true}
            src={Pdocente}
            alt="foto de perfil"
          />
        </div>
      </div>

      {/* DATOS */}
      <div className="mx-20">
        <div className="flex justify-center w-full shadow-xl card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Información Personal</h2>
            <p>
              <span className="font-bold">Nombre: </span> {user.nombre}
            </p>
            <p>
              <span className="font-bold">Apellido: </span> {user.apellido}
            </p>
            <p>
              <span className="font-bold">Email: </span> {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docente;
