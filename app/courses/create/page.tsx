"use client";
import AddBlockForm from "@/components/sections/AddBlockForm";
import AddCourseForm from "@/components/sections/AddCourseForm";
import BlockComponent from "@/components/sections/BlockComponent";
import { BlockData, LectureData } from "@/types/courses.types";
import { FormEvent, useState } from "react";

const CreateCoursesPage = () => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);

  const handleCourseCreation = async (
    name: string,
    subtitle: string,
    description: string,
    imageUrl: string
  ) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cursos/add`, {
      method: 'POST',
      body: JSON.stringify({
        nombre: name,
        subtitulo: subtitle,
        descripcion: description,
        usuario: 1,
        id_profesor: 1,

        imagen: imageUrl,
        bloques: blocks,
      }),
    })
  };

  const handleBlockCreation = (title: string) => {
    setBlocks([
      ...blocks,
      {
        id: blocks.length + 1,
        nombre: title,
        lectures: [],
      },
    ]);
  };

  const handleLectureCreation = (blockId: number, lecture: LectureData) => {
    const newBlocks = blocks.map((block) => {
      if (block.id === blockId) {
        return {
          ...block,
          lectures: block.lectures ? [...block.lectures, lecture] : [lecture],
        };
      }
      return block;
    });
    setBlocks(newBlocks);
  };

  return (
    <div className="grid grid-cols-2">
      <AddCourseForm onSave={handleCourseCreation} />
      <div>
        {blocks && (
          <div className="space-y-4">
            {blocks.map((block) => (
              <BlockComponent
                id={block.id}
                key={block.id}
                nombre={block.nombre}
                lectures={block.lectures}
                onLectureSave={handleLectureCreation}
              />
            ))}
          </div>
        )}

        <AddBlockForm
          onSave={handleBlockCreation}
          onCancel={() => alert("canceled creation")}
        />
      </div>
    </div>
  );
};

export default CreateCoursesPage;
