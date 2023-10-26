export type Section = "BLOCK" | "LECTURE";

export interface Lecture {
  num_leccion: number;
  title: string;
  url_recurso: string;
  content: string;
  id_curso: number;
  id_bloque: number;
}

export interface Block {
  id: number;
  nombre: string;
  lectures?: Lecture[];
}
