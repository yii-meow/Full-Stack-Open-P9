import { CoursePart } from "../types";

const Part = ({ content }: { content: CoursePart }) => {
  const { kind } = content;
  return (
    <div>
      <h2>
        {content.name} {content.exerciseCount}
      </h2>

      {kind === "basic" && <div>{content.description}</div>}
      {kind === "group" && (
        <div>project exercises {content.groupProjectCount}</div>
      )}
      {kind === "background" && (
        <div>
          {content.description} {content.backgroundMaterial}
        </div>
      )}
      {kind === "special" && (
        <div>
          {content.description}
          <br />
          required skills: {content.requirements?.join(", ")}
        </div>
      )}
    </div>
  );
};

export default Part;
