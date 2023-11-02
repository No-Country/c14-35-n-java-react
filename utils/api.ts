import { BlockData, CourseData } from "@/types/courses.types";

interface AddUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: "ADMIN" | "USER";
}

const addUser = async ({
  firstName,
  lastName,
  email,
  password,
  passwordConfirmation,
  role,
}: AddUserParams): Promise<any> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/registro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: firstName,
      apellido: lastName,
      email,
      password,
      password2: passwordConfirmation,
      rol: role,
    }),
  });
  return res;
};

interface LoginParams {
  email: string;
  password: string;
}

const loginUser = async ({ email, password }: LoginParams): Promise<any> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return res;
};

interface AddCourseParams {
  name: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
  categories: { nombre: string }[];
}

const addCourse = async ({
  name,
  description,
  videoUrl,
  imageUrl,
  categories,
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
        categorias: categories,
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

export {
  addUser,
  loginUser,
  addCourse,
  addBlock,
  addLecture,
  activateCourse,
};
