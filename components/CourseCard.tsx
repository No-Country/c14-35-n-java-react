import { CourseData } from "@/types/courses.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  course: CourseData;
}

const CourseCard = ({ course }: Props) => {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="overflow-hidden rounded-lg shadow-lg"
    >
      <Image
        src={course.url_imagen_presentacion}
        alt={course.nombre}
        width={600}
        height={250}
      />
      <div className="p-5">
        <h3 className="text-xl font-bold truncate text-slate-700">
          {course.nombre}
        </h3>
        <p className="mt-2 font-normal text-gray-600 line-clamp-3">
          {course.descripcion}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;
