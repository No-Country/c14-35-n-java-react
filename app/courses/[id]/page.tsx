import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { LuTimer } from "react-icons/lu";
import { RiFileDownloadLine } from "react-icons/ri";
import { PiVideoDuotone } from "react-icons/pi";
import { AiOutlineMobile } from "react-icons/ai";
import { CourseData } from "@/types/courses.types";

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

  if (!course) {
    return notFound();
  }

  const features = [
    {
      icon: <LuTimer size={20} />,
      //! HARDCODED DURATION
      text: `4 horas de contenido`,
    },
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
      text: "30 Lecciones",
    },
  ];

  return (
    <div className="mt-12">
      {/* //! HARDCODED url */}
      <Image
        src={
          course.url_imagen_presentacion ??
          "https://laquintaemprende.cl/wp-content/uploads/2021/01/cursos-online.jpg"
        }
        alt={course.nombre}
        width={640}
        height={360}
        className="md:w-1/2 w-full"
      />
      <h1 className="font-semibold text-2xl mt-6">{course.nombre}</h1>
      {/* //! HARDCODED title */}
      <h2 className="text-lg text-base-content">
        Domina la tecnología con nuestro curso
      </h2>

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
        <div className="w-full space-y-2 lg:-mt-16">
          <div className="collapse collapse-arrow bg-base-200 text-md">
            <input
              type="radio"
              name="accordion"
            />
            <div className="collapse-title text-xl font-medium">Bienvenida</div>
            <div className="collapse-content">
              <p>Presentación del curso</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input
              type="radio"
              name="accordion"
            />
            <div className="collapse-title text-xl font-medium">Lección 1</div>
            <div className="collapse-content">
              <p>En esta lección te enseñaremos a hacer un sitio web</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input
              type="radio"
              name="accordion"
            />
            <div className="collapse-title text-xl font-medium">Lección 2</div>
            <div className="collapse-content">
              <p>
                En esta lección te enseñaremos a como hacer deploy de tu sitio
                web
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input
              type="radio"
              name="accordion"
            />
            <div className="collapse-title text-xl font-medium">Lección 3</div>
            <div className="collapse-content">
              <p>
                En esta lección te enseñaremos a como hacer testing de tu sitio
                web
              </p>
            </div>
          </div>
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
