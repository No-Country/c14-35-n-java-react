"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AiOutlineSearch } from 'react-icons/ai';
import Carousel from '../carrousel';

interface CardData {
  img: string;
  nombre: string;
  descripcion: string;
}

const Home = () => {
  const [jsonData, setJsonData] = useState<CardData[]>([]);

  useEffect(() => {
    fetch('/fakedata.json')
      .then((response) => response.json())
      .then((data: CardData[]) => {
        setJsonData(data);
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
      });
  }, []);

  return (
    <div className="mt-10">
      {/* Buscador */}
      <form className="w-500 relative">
        <div className="relative">
          <input
            type="search"
            placeholder="Buscar por categoria"
            className="w-full p-4 rounded-full bg-slate-300"
            name=""
            id=""
          />
          <button className="absolute right-1 mt-4 h-5 -translate-y-1/2 p-4 bg-slate-300 rounded-full">
            <AiOutlineSearch className="sm:text-3xl mt-0" />
          </button>
        </div>
      </form>

      {/* Destacados */}
      <h2 className="mt-8 font-bold text-[40px]">Destacados</h2>

      <Carousel />
      <div>
        <h1 className="mt-8 font-bold text-[40px] text-center">Nuestros Cursos</h1>
      </div>

      {/* CURSOS */}
      <div className="container mx-auto py-10 px-8">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 grid-cols-1">
          {jsonData.map((card, index) => (
            <div key={index} className="shadow-lg rounded-lg">
              <Image
                className="rounded-t-lg"
                src={card.img}
                alt=""
                width={600}
                height={250}
              />
              <div className="p-5">
                <h3 className="text-3xl font-bold text-slate-700 mb-3">
                  {card.nombre}
                </h3>
                <p className="text-lg font-normal text-gray-600">
                  {card.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OBTENER */}
      <div>
        <h1 className="mt-8 font-bold text-[40px] text-center">
          Esto es lo que obtienes en Learning Simplified
        </h1>
      </div>

      <section className="container mx-auto py-5 grid grid-cols-1 gap-6 sm:grid-cols-1 px-40 lg:grid-cols-3 border-solid border-4">
        <div className="card w-96 bg-base-100 sm:items-center sm:justify-center md:flex">
          <figure className="px-10 pt-10">
            <Image src="/images/books.jpg" alt="Books" className="rounded-xl" width={500} height={250} />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Aprende desde Cero</h2>
            <p>
              Aprender no tiene que ser tan difícil. Aprende los fundamentos
              desde cero y obtén una base sólida.
            </p>
            <div className="card-actions"></div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 sm:items-center sm:justify-center md:flex">
          <figure className="px-10 pt-10">
            <Image src="/images/kindle.jpg" alt="Kindle" className="rounded-xl"  width={500} height={250}/>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Aprende a tu ritmo</h2>
            <p>
              Contamos con más de +1500 horas de contenido para que aprendas más
              allá de lo básico. Cursos teóricos y prácticos con proyectos.
            </p>
            <div className="card-actions"></div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 sm:items-center sm:justify-center md:flex">
          <figure className="px-10 pt-10">
            <Image src="/images/manos.jpg" alt="Manos" className="rounded-xl"  width={500} height={250} />
          </figure>
          <div className="card-body items-center text-center">
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