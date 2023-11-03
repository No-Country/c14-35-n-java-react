import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { LuTimer } from "react-icons/lu";
import { RiFileDownloadLine } from "react-icons/ri";
import { PiVideoDuotone } from "react-icons/pi";
import { AiOutlineMobile } from "react-icons/ai";
import { CourseData } from "@/types/courses.types";
import FluentCollapse from "@/components/sections/FluentCollapse";

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Course",
  description: "Edtech project by c14-35-n-java-react team.",
};


interface Props {
  params: {
    id: string;
  };
}

interface FeatureItem {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const FeatureItem = ({ icon, children }: FeatureItem) => (
  <span className="flex items-center space-x-2 text-sm">
    {icon}
    <p>{children}</p>
  </span>
);

const CoursesPage = async ({ params: { id } }: Props) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/cursos/${id}`,
    { cache: "no-store" }
  );
  const course: CourseData = await res.json();
  const blocks = course.bloques;

  if (!course || !blocks) {
    return notFound();
  }

  const numLectures = blocks.reduce((total, block) => {
    return total + (block.lecciones ? block.lecciones.length : 0);
  }, 0);

  if (numLectures === 0) {
    return notFound();
  }

  const features = [
    {
      icon: <RiFileDownloadLine size={20} />,
      text: "Recursos descargables",
    },
    {
      icon: <AiOutlineMobile size={20} />,
      text: "Accede desde cualquier dispositivo",
    },
    {
      icon: <PiVideoDuotone size={20} />,
      text: numLectures + " Lecciones",
    },
  ];

  return (
    <div className="mt-12">
      <div className="md:w-1/2">
        <Image
          priority={true}
          src={course.url_imagen_presentacion}
          alt={course.nombre}
          width={640}
          height={360}
          className="w-full shadow-lg"
        />
        <h1 className="font-semibold text-2xl mt-6">{course.nombre}</h1>
        {/* //! HARDCODED subtitle */}
        <h2 className="text-lg text-base-content">
          Domina la tecnología con nuestro curso
        </h2>
      </div>

      <div className="flex lg:flex-row mt-4 flex-col-reverse">
        <div className="w-full">
          <h2 className="text-lg font-bold mt-8 lg:mt-auto">
            Este curso incluye
          </h2>
          <div className="space-y-0.5 mt-1">
            {features.map((feature) => (
              <FeatureItem
                icon={feature.icon}
                key={feature.text}
              >
                {feature.text}
              </FeatureItem>
            ))}
          </div>
          <h2 className="text-lg mt-6 font-bold">Categorías</h2>
          <ul className="list-disc list-inside">
            {course &&
              course.categorias.map((categoria) => (
                <li key={categoria.id}>{categoria.nombre}</li>
              ))}
          </ul>
          <h2 className="text-lg mt-6 font-bold">Descripción</h2>
          <p>{course.descripcion}</p>
        </div>

        <div className="join join-vertical w-full lg:-mt-16 border-t-2 border-neutral rounded-none">
          {blocks &&
            blocks.map((block) => (
              <FluentCollapse
                key={block.id}
                title={block.nombre}
                openByDefault={block.id === blocks[0].id}
              >
                <ul className="px-4 -mt-2">
                  {block.lecciones &&
                    block.lecciones
                      .sort((a, b) => a.num_leccion - b.num_leccion)
                      .map((lecture) => (
                        <li
                          key={lecture.num_leccion}
                          className="list-decimal list-outside"
                        >
                          <p>{lecture.titulo}</p>
                        </li>
                      ))}
                </ul>
              </FluentCollapse>
            ))}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="px-24 btn btn-active btn-neutral mt-8">
          Añadir a mi colección
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
