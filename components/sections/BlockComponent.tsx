import Collapse from "./Collapse";
import LectureComponent from "./LectureComponent";
import AddLectureForm from "./AddLectureForm";
import { BlockData, LectureData } from "@/types/courses.types";

interface Props extends BlockData {
  lectures: LectureData[];
  onLectureSave(blockId: number, title: string, url_recurso: string): void;
}

const BlockComponent: React.FC<Props> = ({
  id: blockId,
  nombre: title,
  lectures,
  onLectureSave,
}) => {
  lectures?.sort((a, b) => a.num_leccion - b.num_leccion);
  return (
    <Collapse
      title={title}
      openByDefault={true}
    >
      {lectures &&
        lectures.map((lecture) => (
          <LectureComponent
            {...lecture}
            key={lecture.num_leccion + blockId}
          />
        ))}

      <AddLectureForm
        blockId={blockId}
        onSave={onLectureSave}
        onCancel={() => {}}
      />
    </Collapse>
  );
};

export default BlockComponent;
