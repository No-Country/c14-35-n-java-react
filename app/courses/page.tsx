"use client"

import Image from "next/image";
import { redirect } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import Carousel from "../Carousel";
import Cero from "@/public/desde_Cero.svg";
import Ritmo from "@/public/ritmo.svg";
import Futuro from "@/public/futuro.svg";
import Link from "next/link";
import { MyCourseType } from "@/types";
import MyCourses from "@/components/containers/MyCourses";
import { useEffect } from "react";


const Home = async () => {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_COURSES}`  );

 // const courses: Course[] = await response.json();
  const courses = response.json


  useEffect(()=>{
    console.log( {courses} )
  })
  
  /*
  
  [
    
    {
      id: 1,
      img: "/vercel.svg",
      name: "HTML pro",
      duration: 31,
      title: "Hello world HTML",
      description: `En este curso aprederás cómo empenzar a diseñar desde cero una página wueb y l
      os protocolos necesarios para desplegarla.`
    },

    {
      id: 2,
      img: "/vercel.svg",
      name: "Full Git/Hub",
      duration: 25,
      title: "Hello world HTML",
      description: `En este curso aprederás cómo empenzar a diseñar desde cero una página wueb y l
      os protocolos necesarios para desplegarla.`
    },

    {
      id: 3,
      img: "/vercel.svg",
      name: "Practicando NEXT",
      duration: 25,
      title: "Hello world HTML",
      description: `En este curso aprederás cómo empenzar a diseñar desde cero una página wueb y l
      os protocolos necesarios para desplegarla.`
    },
  {
      id: 4,
      img: "/next.svg",
      name: "HTML pro",
      duration: 31,
      title: "Hello world HTML",
      description: `En este curso aprederás cómo empenzar a diseñar desde cero una página wueb y l
      os protocolos necesarios para desplegarla.`
    },

    {
      id: 5,
      img: "/ritmo.svg",
      name: "Full Git/Hub",
      duration: 25,
      title: "Hello world HTML",
      description: `En este curso aprederás cómo empenzar a diseñar desde cero una página wueb y l
      os protocolos necesarios para desplegarla.`
    },

    {
      id: 6,
      img: "/vercel.svg",
      name: "Linux desde cero",
      duration: 25,
      title: "Hello world HTML",
      description: `En este curso aprederás cómo empenzar a diseñar desde cero una página wueb y l
      os protocolos necesarios para desplegarla.`
    }


  ] */ 

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
          {/*
          { courses.map((course: MyCourseType  , index: number) => 
            <MyCourses key={index}  name={ course.name } description={ course.description } />
          )}
          */}
        </div>
      </div>

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
