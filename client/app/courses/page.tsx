import Image from "next/image";
import Cero from "@/public/desde_Cero.svg";
import Ritmo from "@/public/ritmo.svg";
import Futuro from "@/public/futuro.svg";
import CoursesList from "@/components/courses/CoursesList";

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Courses",
  description: "Edtech project by c14-35-n-java-react team.",
};

const Home =() => {
  return (
    <div className="mt-10">
      <CoursesList />

      {/* OBTENER */}
      <h1 className="mt-8 text-3xl font-semibold text-center">
        <p>Esto es lo que obtienes en</p>
        <div className="[&>p]:first-letter:font-extrabold [&>p]:inline-block">
          <p>Learning</p> <p>Simplified</p>
        </div>
      </h1>

      <section className="container grid w-full grid-cols-1 mx-auto border-4 border-solid sm:grid-cols-1 lg:grid-cols-3 mt-2">
        <div className="card bg-base-100 sm:items-center sm:justify-center md:flex">
          <figure className="px-10 pt-10">
            <Image
              src={Cero}
              alt="..."
              className="rounded-xl w-[500px] h-[250px]"
            />
          </figure>
          <div className="items-center text-center card-body">
            <h2 className="card-title">Aprende desde Cero</h2>
            <p>
              Aprender no tiene que ser tan difícil. Aprende los fundamentos
              desde cero y obtén una base sólida.
            </p>
            <div className="card-actions"></div>
          </div>
        </div>

        <div className="card bg-base-100 sm:items-center sm:justify-center md:flex">
          <figure className="px-10 pt-10">
            <Image
              src={Ritmo}
              alt="..."
              className="rounded-xl w-[500px] h-[250px]"
            />
          </figure>
          <div className="items-center text-center card-body">
            <h2 className="card-title">Aprende a tu ritmo</h2>
            <p>
              Contamos con más de +1500 horas de contenido para que aprendas más
              allá de lo básico. Cursos teóricos y prácticos con proyectos.
            </p>
            <div className="card-actions"></div>
          </div>
        </div>

        <div className="card bg-base-100 sm:items-center sm:justify-center md:flex">
          <figure className="px-10 pt-10">
            <Image
              src={Futuro}
              alt="..."
              className="rounded-xl w-[500px] h-[250px]"
            />
          </figure>
          <div className="items-center text-center card-body">
            <h2 className="card-title">Prepárate para el futuro</h2>
            <p>
              Consigue las habilidades que tu carrera profesional necesita e
              impúlsate para un futuro próspero en tecnología.
            </p>
            <div className="card-actions"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
