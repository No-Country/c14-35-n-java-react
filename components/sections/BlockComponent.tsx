import Collapse from "./Collapse";
import LectureComponent from "./LectureComponent";
import AddLectureForm from "./AddLectureForm";
import { BlockData, LectureData } from "@/types/courses.types";

interface Props extends BlockData {
  onLectureSave(blockId: number, lecture: LectureData): void;
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
