"use client";
import FormButton from "@/components/forms/FormButton";
import FormHeader from "@/components/forms/FormHeader";
import FormInput from "@/components/forms/FormInput";
import FormLayout from "@/components/forms/FormLayout";
import AddBlockForm from "@/components/sections/AddBlockForm";
import BlockComponent from "@/components/sections/BlockComponent";
import { Block, Lecture } from "@/types/section.types";
import { useState } from "react";

const lectures: Lecture[] = [
  {
    title: "Lección 1",
    content: "Contenido de la lección 1",
  },
  {
    title: "Lección 2",
    content: "Contenido de la lección 2",
  },
  {
    title: "Lección 3",
    content: "Contenido de la lección 3",
  },
  {
    title: "Lección 4",
    content: "Contenido de la lección 4",
  },
  {
    title: "Lección 5",
    content: "Contenido de la lección 5",
  },
  {
    title: "Lección 6",
    content: "Contenido de la lección 6",
  },
  {
    title: "Lección 7",
    content: "Contenido de la lección 7",
  },
  {
    title: "Lección 8",
    content: "Contenido de la lección 8",
  },
  {
    title: "Lección 9",
    content: "Contenido de la lección 9",
  },
];

// const blocks: Block[] = [
//   {
//     id: 1,
//     title: "Sección 1",
//     lectures: lectures.slice(0, 3),
//   },
//   {
//     id: 2,
//     title: "Sección 2",
//     lectures: lectures.slice(3, 6),
//   },
//   {
//     id: 3,
//     title: "Sección 3",
//     lectures: lectures.slice(6, 9),
//   },
// ];

const CreateCoursesPage = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
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

  const handleLectureCreation = (blockId: number, lecture: Lecture) => {
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
      <FormLayout className="w-full">
        <FormHeader>Crear Curso</FormHeader>
        <FormInput label="Nombre" />
        <FormInput label="Subtítulo" />
        <FormInput
          label="Descripción"
          type="textarea"
        />
        <FormInput
          label="URL de la imagen de presentación"
          placeholder="URL"
        />
        <FormButton>Crear curso</FormButton>
      </FormLayout>

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
