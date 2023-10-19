import Image from "next/image";
import { Course } from "../page";
import { LuTimer } from "react-icons/lu";
import { RiFileDownloadLine } from "react-icons/ri";
import { PiVideoDuotone } from "react-icons/pi";
import { AiOutlineMobile } from "react-icons/ai";

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
  const response = await fetch(`${process.env.API_URL}/courses/${id}`);
  const course = (await response.json()) as Course;

  const features = [
    {
      icon: <LuTimer size={20} />,
      text: `${course.duration} horas de contenido`,
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
      <Image
        src={course.img}
        alt={course.name}
        width={640}
        height={360}
        className="md:w-1/2 w-full"
      />
      <h1 className="font-semibold text-2xl mt-6">{course.name}</h1>
      <h2 className="text-lg text-base-content">{course.title}</h2>

      <div className="flex lg:flex-row mt-4 flex-col-reverse">
        <div className="w-full">
          <h2 className="text-lg font-bold mt-8 lg:mt-auto">Este curso incluye</h2>
          <div className="space-y-0.5 mt-1">
            {features.map((feature) => (
              <FeatureItem icon={feature.icon} key={feature.text}>
                {feature.text}
              </FeatureItem>
            ))}
          </div>
          <h2 className="text-lg mt-6 font-bold">Contenido</h2>
          <ul className="list-disc list-inside">
            <li>Aprenderas desde 0 a como hacer un sitio web</li>
            <li>Aprenderas sobre buenas prácticas</li>
            <li>Aprenderas testing de tu sitio web</li>
            <li>Aprenderas a hacer deploy de tu sitio web</li>
          </ul>
          <h2 className="text-lg mt-6 font-bold">Descripción</h2>
          <p>{course.description}</p>
        </div>
        <div className="w-full space-y-2 lg:-mt-16">
          <div className="collapse collapse-arrow bg-base-200 text-md">
            <input type="radio" name="accordion" />
            <div className="collapse-title text-xl font-medium">Bienvenida</div>
            <div className="collapse-content">
              <p>Presentación del curso</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="accordion" />
            <div className="collapse-title text-xl font-medium">Lección 1</div>
            <div className="collapse-content">
              <p>En esta lección te enseñaremos a hacer un sitio web</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="accordion" />
            <div className="collapse-title text-xl font-medium">Lección 2</div>
            <div className="collapse-content">
              <p>
                En esta lección te enseñaremos a como hacer deploy de tu sitio
                web
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="accordion" />
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
