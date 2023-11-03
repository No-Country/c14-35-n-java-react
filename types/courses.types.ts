interface Category {
  id: number;
  nombre: string;
}

export interface UserData {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  alta?: Date;
  rol: "ADMIN" | "USER";
  curso: [];
  imagen?: string;
}

export type Section = "BLOCK" | "LECTURE";

export interface LectureData {
  id_curso?: number;
  id_bloque: number;
  num_leccion: number;
  titulo: string;
  url_recurso: string;
}

export interface BlockData {
  id: number;
  nombre: string;
  lecciones?: LectureData[];
}

export interface CourseData {
  id: number;
  nombre: string;
  subtitle: string;
  descripcion: string;
  rutaAprendizaje?: string;
  usuario?: [];
  profesor: UserData;
  activo: boolean;
  categorias: Category[];
  bloques: BlockData[] | [];
  alta?: Date;
  url_imagen_presentacion: string;
  url_video_presentacion: string;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface CourseResponseData {
  content: CourseData[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
