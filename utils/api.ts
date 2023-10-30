import { BlockData, CourseData } from "@/types/courses.types";

interface AddCourseParams {
  name: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
}

const addCourse = async ({
  name,
  description,
  videoUrl,
  imageUrl,
}: AddCourseParams): Promise<CourseData> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/cursos/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: name,
        descripcion: description,
        usuario: [],
        id_profesor: 1,
        subtitle: "",
        categorias: [
          { nombre: "Tecnología" },
          { nombre: "Desarrollo Web" },
          { nombre: "Programación" },
        ],
        url_video_presentacion: videoUrl,
        url_imagen_presentacion: imageUrl,
      }),
    }
  );
  return res.json();
};

interface AddBlockParams {
  name: string;
  courseId: number;
}
const addBlock = async (params: AddBlockParams): Promise<BlockData> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/bloque/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: params.name,
        id_curso: params.courseId,
      }),
    }
  );
  const data = await res.json();
  return data.bloques.at(-1);
};

interface AddLectureParams {
  lectureNum: number;
  title: string;
  urlResource: string;
  courseId: number;
  blockId: number;
}

const addLecture = async (params: AddLectureParams): Promise<any> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/leccion/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num_leccion: params.lectureNum,
        titulo: params.title,
        url_recurso: params.urlResource,
        id_curso: params.courseId,
        id_bloque: params.blockId,
      }),
    }
  );
  const blocks = (await res.json()).bloques;
  const block = blocks.find((block: BlockData) => block.id === params.blockId);
  return block.lecciones.at(-1);
};

const activateCourse = async (courseId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/cursos/activate`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: courseId,
      }),
    }
  );
  return res.json();
};

export { addCourse, addBlock, addLecture, activateCourse };
