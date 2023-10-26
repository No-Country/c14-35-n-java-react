import { Lecture } from "@/types/section.types";
import Collapse from "./Collapse";

export interface Props extends Lecture {}

const LectureComponent: React.FC<Props> = ({ title, content }) => {
  return (
    <Collapse
      title={title}
      openByDefault={true}
    >
      <p>{content}</p>
    </Collapse>
  );
};

export default LectureComponent;
