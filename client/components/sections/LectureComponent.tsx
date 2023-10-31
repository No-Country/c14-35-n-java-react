import { LectureData } from "@/types/courses.types";
import Collapse from "./Collapse";

export interface Props extends LectureData {}

const LectureComponent: React.FC<Props> = ({ title, url_recurso }) => {
  return (
    <Collapse
      title={title}
      openByDefault={true}
    >
      <p>URL: {url_recurso}</p>
    </Collapse>
  );
};

export default LectureComponent;
