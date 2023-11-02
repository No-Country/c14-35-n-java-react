// No es necesario exportar los types
type ProfesorType = {
  id: number,
  nombre:string,
  apellido?: string,
  email: string,
  password:  string,
  alta:  string,
  rol:  string, 
  curso?: [],
  imagen?: string
}

type categoriasType = {
  id: number,
  nombre: string
}

type bloquesType = {
  id: number,
  nombre: string,
  lecciones: {
    id: number,
    num_leccion: number,
    titulo: string,
    url_recurso: string
  }[]
}

type CoursesType = {
  id: number,
  nombre: string,
  descripcion: string,
  rutaAprendizaje?: string,
  usuario?: [],
  profesor?: ProfesorType,
  activo?: boolean,
  categorias?: categoriasType[],
  bloques?: bloquesType[],
  alta?: string,
  url_video_presentacion?: string
  url_imagen_presentacion?: string,
}
