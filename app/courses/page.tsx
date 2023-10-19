import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import Carousel from "../Carousel";

export interface Course {
  img: string;
  name: string;
  duration: number;
  title: string;
  description: string;
}

const Home = async () => {
  const response = await fetch(`${process.env.API_URL}/courses`);
  const courses: Course[] = await response.json();

  return (
    <div className="mt-10">
      {/* Buscador */}
      <form className="relative flex items-center w-500">
        <input
          type="search"
          placeholder="Buscar por categoria"
          className="w-full p-4 rounded-full bg-slate-300"
        />
        <button className="absolute bg-transparent rounded-full right-4 bg-slate-300">
          <AiOutlineSearch size={28} />
        </button>
      </form>

      {/* Destacados */}
      <h2 className="mt-10 text-3xl font-bold">Destacados</h2>

      <Carousel />

      <h1 className="mt-10 -mb-6 text-3xl font-bold text-center">
        Nuestros Cursos
      </h1>

      {/* CURSOS */}
      <div className="container w-full py-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
          {courses.map((course, index) => (
            <div key={index} className="rounded-lg shadow-lg overflow-hidden">
              <Image
                src={course.img}
                alt={course.name}
                width={600}
                height={250}
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-slate-700">
                  {course.name}
                </h3>
                <p className="mt-2 font-normal text-gray-600 line-clamp-3">
                  {course.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OBTENER */}
      <h1 className="mt-8 text-3xl font-semibold text-center">
        <p>Esto es lo que obtienes en</p>
        <div className="[&>p]:first-letter:font-extrabold [&>p]:inline-block">
          <p>Learning</p> <p>Simplified</p>
        </div>
      </h1>

      <section className="container grid w-full grid-cols-1 mx-auto mt-2 card-body sm:grid-cols-1 lg:grid-cols-3">
        <div className="card bg-base-100 sm:items-center sm:justify-center md:flex">
          <figure>
            <Image
              src="/images/books.jpg"
              alt="Books"
              className="rounded-xl"
              width={500}
              height={250}
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
          <figure>
            <Image
              src="/images/kindle.jpg"
              alt="Kindle"
              className="rounded-xl"
              width={500}
              height={250}
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
          <figure>
            <Image
              src="/images/manos.jpg"
              alt="Manos"
              className="rounded-xl"
              width={500}
              height={250}
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
