import "highlight.js/styles/atom-one-dark.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { parseAndSanitizeMarkdown } from "../../utils/markdownProcessor.js";

const Render = ({ content }) => {
  const [markedElement, setMarkedElement] = useState("");

  useEffect(() => {
    const parseMarkdown = async () => {
      const cleanHtml = await parseAndSanitizeMarkdown(content);
      setMarkedElement(cleanHtml);
    };

    parseMarkdown();
  }, [content]);

  return (
    <div
      className="prose prose-base max-sm:prose-sm flex flex-col w-full"
      dangerouslySetInnerHTML={{ __html: markedElement }}
    ></div>
  );
};

Render.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Render;
