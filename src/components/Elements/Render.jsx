import "highlight.js/styles/atom-one-dark.css";
import { useEffect, useState } from "react";
import Data from "../Data/Data.json";
import PropTypes from "prop-types";
import { parseAndSanitizeMarkdown } from "../../utils/markdownProcessor.js";

const Render = ({ id }) => {
  const [markedElement, setMarkedElement] = useState("");

  useEffect(() => {
    const project = Data.projects.find((p) => p.id === id);
    if (!project || !project.brief) {
      setMarkedElement("");
      return;
    }

    const parseMarkdown = async () => {
      const cleanHtml = await parseAndSanitizeMarkdown(project.brief);
      setMarkedElement(cleanHtml);
    };

    parseMarkdown();
  }, [id]);

  return (
    <div
      className="prose prose-base max-sm:prose-sm flex flex-col w-full"
      dangerouslySetInnerHTML={{ __html: markedElement }}
    ></div>
  );
};

Render.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Render;
