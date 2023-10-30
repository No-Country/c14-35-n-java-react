"use client";
import AddBlockForm from "@/components/sections/AddBlockForm";
import AddCourseForm from "@/components/sections/AddCourseForm";
import BlockComponent from "@/components/sections/BlockComponent";
import { BlockData, CourseData, LectureData } from "@/types/courses.types";
import { activateCourse, addBlock, addCourse, addLecture } from "@/utils/api";
import { useState } from "react";

const CreateCoursesPage = () => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [lectures, setLectures] = useState<LectureData[]>([]);
  const handleCourseCreation = async (
    name: string,
    description: string,
    videoUrl: string,
    imageUrl: string
  ) => {
    const course: CourseData = await addCourse({
      name,
      description,
      videoUrl,
      imageUrl,
    });
    console.log(course);
    for (const block of blocks) {
      // Wait for a block to be created before assigning a lecture
      const newBlock = await addBlock({
        name: block.nombre,
        courseId: course.id,
      });

      // Start creating a lecture and inmediatly create the next one
      for (const lecture of lectures.filter(
        (lecture) => lecture.id_bloque === block.id
      )) {
        const newLecture = addLecture({
          courseId: course.id,
          blockId: newBlock.id,
          lectureNum: lecture.num_leccion,
          title: lecture.title,
          urlResource: lecture.url_recurso,
        });
      }
    }
    activateCourse(course.id);
  };

  const handleBlockCreation = (title: string) => {
    setBlocks([
      ...blocks,
      {
        id: blocks.length + 1,
        nombre: title,
      },
    ]);
  };

  const handleLectureCreation = (
    blockId: number,
    title: string,
    url_recurso: string
  ) => {
    setLectures([
      ...lectures,
      {
        id_bloque: blockId,
        num_leccion: lectures.length + 1,
        title,
        url_recurso: url_recurso,
      },
    ]);
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
                lectures={
                  lectures &&
                  lectures.filter((lecture) => lecture.id_bloque === block.id)
                }
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
