import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((p) => (
        <Part key={p.name} content={p} />
      ))}
    </div>
  );
};

export default Content;
