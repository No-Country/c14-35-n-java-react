interface Category {
  id: number;
  nombre: string;
}

interface EducatorData {
  id: number;
  nombre: string;
  apellido?: string;
  email: string;
  password: string;
  alta: Date;
  rol?: "ADMIN" | "USER";
  curso: [];
  imagen?: string;
}

export interface CourseData {
  id: number;
  nombre: string;
  // subtitle?: string;
  descripcion: string;
  rutaAprendizaje?: string;
  usuario?: [];
  profesor?: EducatorData;
  activo: boolean;
  categorias: Category[];
  bloques?: [];
  alta?: Date;
  url_imagen_presentacion: string;
  url_video_presentacion?: string;
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