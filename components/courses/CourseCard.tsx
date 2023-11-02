import React, { FC } from 'react'
import Link from "next/link";
import Image from "next/image";

const MyCourseCard:FC<CoursesType> = ( props ) => {
  const { id, nombre, descripcion, url_imagen_presentacion } = props
  return (
    <Link href={`/courses/${id}`} className="rounded-lg shadow-lg overflow-hidden">
      {/*//! HARCODED URL  */}
      <Image
        src={ url_imagen_presentacion? url_imagen_presentacion:"https://laquintaemprende.cl/wp-content/uploads/2021/01/cursos-online.jpg"  }
        alt={nombre}
        width={600}
        height={250}
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-slate-700">{nombre}</h3>
        <p className="mt-2 font-normal text-gray-600 line-clamp-3">
          { descripcion }
        </p>
      </div>
    </Link>
  );
};

export default MyCourseCard
