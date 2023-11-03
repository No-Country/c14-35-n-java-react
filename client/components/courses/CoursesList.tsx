'use client'

import React, { useEffect, useState } from 'react'
import Carousel from '@/app/Carousel';
import { AiOutlineSearch } from 'react-icons/ai';
import CourseCard from './CourseCard';
// import initialCourses, { initialCoursesTest } from '@/assets/InitialCourses';
import LoadMessage from './LoadMessage';

const CoursesList =  () => {
  // # La url base de la llamada a ala api para la lista de cursos
  const baseUrlCoursesList: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/cursos/allCourses`
  // # Guardar 
  const coursePagesList = React.useMemo(() => [
    { page: '?page=0&?sort=alta,DESC' },
    { page: '?page=1&?sort=alta,DESC' },
    { page: '?page=2&?sort=alta,DESC' },
    { page: '?page=3&?sort=alta,DESC' },
    { page: '?page=4&?sort=alta,DESC' },
    //{ page: '?page=5&?sort=alta,DESC' },
  ], []);
  // ##   
  const [ apiPageNumber, setApiPageNumber ] = useState<number>(0)
  // ## Es el arreglo inicial, en caso de no haberse establecido un estado inicial no cargará nada.
  const [ myCourses, setMyCourses ] = useState<CoursesType[]>( [] )
  // ## La carga que debería hacer al inicio, en caso de no poder hacer la carga devolverá en la consola en mensaje de error.
  const loadData = async ( apiUrl: string ) => {
    const courses: CoursesType[] = [];
      try {
        const response = await fetch( apiUrl, { 
          method: 'GET',
          cache: 'no-store',
          // # To send credentials in fetch, we need to add the option credentials: "include"
          // credentials: 'include', // # same-origin, include
          headers: {
            'Content-Type':'application/json',
            // 'API-Key': 'secret'
          },
        })
        const data = await response.json();
        courses.push(...data.content);
      } catch (error) {
        console.error("An error occurred while fetching the API: " + error);
      }
    setMyCourses(courses)
  }
  // # Leer los datos al momento de cargar
  useEffect(()=>{
    loadData(`${baseUrlCoursesList}${coursePagesList[apiPageNumber].page}`)
  },[ apiPageNumber, baseUrlCoursesList, coursePagesList ])

  const handleClickBack = () => {
    setMyCourses([])
    if (apiPageNumber == 0 ) {
      setApiPageNumber( coursePagesList.length -1 )
      loadData(`${baseUrlCoursesList}${coursePagesList[coursePagesList.length -1].page}`)
    } else {
      setApiPageNumber(apiPageNumber -1 )
      loadData(`${baseUrlCoursesList}${coursePagesList[apiPageNumber -1].page}`)
    }
  }
  
  const handleClickNext = () => {
    setMyCourses([])
    if (apiPageNumber == (coursePagesList.length -1)) {
      setApiPageNumber(0)
      loadData(`${baseUrlCoursesList}${coursePagesList[0].page}`)
    } else {
      setApiPageNumber(apiPageNumber + 1)
      loadData(`${baseUrlCoursesList}${coursePagesList[apiPageNumber+1].page}`)
    }
  }
  return (
    <React.Fragment>
      {/* 
        Buscador 
        npm, Desabilitado temporalmente desabilitado
      */}
      <form hidden className="relative flex items-center w-500">
        <input
          // # Aquí hay que programar la funcion que sirve para establecer la busqueda de cursos
          disabled
          type="search"
          placeholder="Buscar"
          className="w-full p-4 rounded-full bg-base-300 placeholder:text-neutral"
        />
        <button disabled className="absolute bg-transparent rounded-full right-4 bg-slate-300">
          <AiOutlineSearch size={28} />
        </button>
      </form>


      {/* Destacados */}
      <h2 className="mt-10 text-3xl font-bold">Destacados</h2>
      <Carousel />
      <h1 className="mt-10 -mb-2 text-3xl font-bold text-center">
        { `Nuestros Cursos`  }
      </h1>
      <div className="container w-full py-10 mx-auto">
        <div className=" mb-4 flex justify-between items-center p-2">
          <button
            type="button"
            className="px-4 py-3 bg-indigo-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
            onClick={handleClickBack}>
            { 'Anterior' } 
          </button>
          <h2 className="text-2xl font-bold text-center"> { `Lista ${apiPageNumber+1}/${coursePagesList.length}` } </h2>
          <button 
            type="button"
            className="px-4 py-3 bg-indigo-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
            onClick={handleClickNext}>
            { 'Siguiente' } 
          </button>
        </div>


          {
            (myCourses.length != 0)? 
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
                {
                  myCourses.map((item, index) => (
                    // Habilitado para definir un criterio de busqueda 
                  <CourseCard key={index} id={item.id} nombre={item.nombre} descripcion={item.descripcion} url_imagen_presentacion={ item.url_imagen_presentacion } />
                  ))
                }
              </div>
              :
              <LoadMessage/>
          }
      </div>  
    </React.Fragment>
  )
}

export default CoursesList
