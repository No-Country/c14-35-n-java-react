"use client";
import React, { useState } from "react";
import Pdocente from "@/public/avatar_male.svg"
import Image from "next/image";


const Docente = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("profileImage", selectedFile);

      fetch("/upload-profile-image", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  };
  return (
    <div>
      <h1> Bienvenido</h1>

      <div className="avatar flex justify-center items-center">
  <div className="w-60 rounded-full items-center">
    <Image src={Pdocente} alt="" />
  </div>
</div>

{/* DATOS */}
      <div className="collapse collapse-arrow bg-base-200 mt-8">
        <input type="radio" name="my-accordion-2" />
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
            placeholder="Titulo o Profesión"
          />
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200 mt-8">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Foto de perfil</div>
        <div className="collapse-content">
 
        <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-3"
            
          />
          {selectedFile && (
            <div>
            <button onClick={handleUpload} className="ml-3">Subir Imagen</button>
            </div>
          )}
 
         </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200 mt-8">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Mi Colección</div>
        <div className="collapse-content">
          <p>aca deben estar los cursos</p>
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-200 mt-8">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">Mis Cursos</div>
        <div className="collapse-content">
          <p>hello</p>
        </div>
      </div>
    </div>
  );
};

export default Docente;
