import "highlight.js/styles/atom-one-dark.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { parseAndSanitizeMarkdown } from "../../utils/markdownProcessor.js";

const markdownCache = new Map();

const Render = ({ content }) => {
  const [markedElement, setMarkedElement] = useState(
    () => markdownCache.get(content) ?? "",
  );

  useEffect(() => {
    if (!content) return;

    if (markdownCache.has(content)) {
      setMarkedElement(markdownCache.get(content));
      return;
    }

    let cancelled = false;

    const parseMarkdown = async () => {
      const cleanHtml = await parseAndSanitizeMarkdown(content);

      if (cancelled) return;

      markdownCache.set(content, cleanHtml);
      setMarkedElement(cleanHtml);
    };

    parseMarkdown();

    return () => {
      cancelled = true;
    };
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
