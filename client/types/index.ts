export type MyCourseType = {
  data: {
    id: number,
    nombre: string,
    descripcion: string,
    rutaAprendizaje?: string,
    usuario?: [],
    profesor?: {
      id: number,
      nombre: string,
      apellido?: string,
      email: string,
      password: string,
      alta: Date
      rol?: 'ADMIN' | "PROFESOR" | "ESTUDIANTE" ,
      curso: [
      ],
      imagen?: string
    },
    activo?: boolean,
    categorias?: string[],
    bloques?: [],
    alta?: Date,
    url_imagen_presentacion: string,
    url_video_presentacion?: string
  }

}

/*

[
  {
    id: 1,
    nombre: 'HTML desde cero',
    descripcion: 'Aprende HTML que es un lenguaje de etiquetados para crear páginas web',
    rutaAprendizaje: null,
    usuario: [],
    profesor: {
      id: 1,
      nombre: 'Carlos',
      apellido: null,
      email: 'carlos@mail.com',
      password: '$2a$10$bPaQTNfoDT/jyT0bVDBj1uAVfgzq3gPxAkoG3D5RIgegec8gi1duO',
      alta: '2023-10-19',
      rol: 'ADMIN',
      curso: [],
      imagen: null
    },
    activo: false,
    categorias: [ [Object], [Object] ],
    bloques: [],
    alta: '2023-10-19',
    url_imagen_presentacion: 'https://i3.ytimg.com/vi/FYvoBi89wsE/maxresdefault.jpg',
    url_video_presentacion: 'https://www.youtube.com/watch?v=FYvoBi89wsE'
  }
]


*/
