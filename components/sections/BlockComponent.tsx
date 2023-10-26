import { Block, Lecture } from "@/types/section.types";
import Collapse from "./Collapse";
import LectureComponent from "./LectureComponent";
import AddLectureForm from "./AddLectureForm";

interface Props extends Block {
  onLectureSave(blockId: number, lecture: Lecture): void;
}

const BlockComponent: React.FC<Props> = ({
  id,
  nombre: title,
  lectures,
  onLectureSave,
}) => {
  return (
    <Collapse
      title={title}
    >
      {lectures &&
        lectures.map((lecture) => (
          <LectureComponent
            key={lecture.title}
            title={lecture.title}
            content={lecture.content}
          />
        ))}

      <AddLectureForm
        blockId={id}
        onSave={onLectureSave}
        onCancel={() => {}}
      />
    </Collapse>
  );
};

export default BlockComponent;
