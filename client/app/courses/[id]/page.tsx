import Image from "next/image";
import { Course } from "../page";
import { LuTimer } from "react-icons/lu";
import { RiFileDownloadLine } from "react-icons/ri";
import { PiVideoDuotone } from "react-icons/pi";
import { AiOutlineMobile } from "react-icons/ai";
import Accordion from "@/components/forms/Accordion";

interface Props {
  params: {
    id: string
  }
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
  const course = await response.json() as Course;

  const features = [
    {
      icon: <LuTimer size={20} />,
      text: `${course.duration} horas de contenido`
    },
    {
      icon: <RiFileDownloadLine size={20} />,
      text: 'Recursos descargables'
    },
    {
      icon: <AiOutlineMobile size={20} />,
      text: 'Accede desde cualquier dispositivo'
    },
    {
      icon: <PiVideoDuotone size={20} />,
      text: '30 Lecciones'
    }
  ]

  return (
    <div className="">
      <Image src={course.img} alt={course.name} width={500} height={200} style={{ width: "50%" }} />
      <div className="flex flex-row">
        <div>
          <h1 className="font-semibold text-2xl mt-2">Curso: Angular desde 0</h1>
          <h2 className="text-lg text-base-content">{course.title}</h2>
          <h2 className="text-lg mt-6 font-bold">Este curso incluye</h2>
          <div className="space-y-0.5 mt-1">
            {features.map((feature) =>
              <FeatureItem icon={feature.icon} key={feature.text}>{feature.text}</FeatureItem>
            )}
          </div>
          <h2 className="text-lg mt-6 font-bold">Contenido</h2>
          <ul className="list-disc list-inside">
            <li>Lorem ipsum dolor</li>
            <li>Lorem ipsum dolor</li>
            <li>Lorem ipsum dolor</li>
            <li>Lorem ipsum dolor</li>
          </ul>
          <h2 className="text-lg mt-6 font-bold">Descripción</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, possimus aliquam dolorum quibusdam sit obcaecati dolores non minima, nihil vero mollitia, eum id tenetur voluptas consequuntur reiciendis adipisci tempora nostrum!</p>
        </div>
        <div className="w-screen space-y-2">
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="accordion" />
            <div className="collapse-title text-xl font-medium">
              Bienvenida
            </div>
            <div className="collapse-content">
              <p>El contenido es este</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="accordion" />
            <div className="collapse-title text-xl font-medium">
              Lección 1
            </div>
            <div className="collapse-content">
              <p>1</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="accordion" />
            <div className="collapse-title text-xl font-medium">
              Lección 2
            </div>
            <div className="collapse-content">
              <p>2</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="accordion" />
            <div className="collapse-title text-xl font-medium">
              Lección 3
            </div>
            <div className="collapse-content">
              <p>3</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="px-24 btn btn-neutral mt-8">
          Añadir a mi colección
        </div>
      </div>
    </div>
  )
}

export default CoursesPage