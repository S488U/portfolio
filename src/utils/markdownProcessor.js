import { marked } from "marked"
import DOMPurify from "dompurify";
import { html_beautify, css_beautify, js_beautify } from "js-beautify";

import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";

// Register languages
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("jsx", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("python", python);
hljs.registerLanguage("typescript", typescript);

const formatCode = (code, lang) => {
    const lowerLang = lang.toLowerCase();
    const jsLangs = ["javascript", "js", "json", "node", "react", "jsx", "typescript"];
    const htmlLangs = ["html", "xml", "markup"];
    const cssLangs = ["css", "scss", "less"];
    const indentSize = 2;

    if (jsLangs.includes(lowerLang)) {
        return js_beautify(code, { indent_size: indentSize, space_in_empty_paren: true });
    }
    if (htmlLangs.includes(lowerLang)) {
        return html_beautify(code, { indent_size: indentSize });
    }
    if (cssLangs.includes(lowerLang)) {
        return css_beautify(code, { indent_size: indentSize });
    }
    return code;
};

marked.setOptions({
    gfm: true,
    breaks: true,
});

marked.use({
    renderer: {
        link(token) {
            return `<a href="${token.href}" target="_blank" rel="noopener noreferrer">${token.text}</a>`;
        },
        image(token) {
            return `<a target="_blank" href="${token.href}"><img src="${token.href}" alt="${token.text}" loading="lazy" /></a>`;
        },
        code(token) {
            const lang = token.lang || "plaintext";
            const formattedCode = formatCode(token.text, lang);
            const language = hljs.getLanguage(lang) ? lang : "plaintext";

            let highlightedCode;
            try {
                highlightedCode = hljs.highlight(formattedCode, { language }).value;
            } catch {
                highlightedCode = formattedCode;
            }

            return `<pre><code class="hljs language-${language} remove-scroll">${highlightedCode}</code></pre>\n`;
        },
    },
});

export const parseAndSanitizeMarkdown = async (markdownText) => {
    if (!markdownText) return "";

    const rawHtml = await marked.parse(markdownText);
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
        USE_PROFILES: { html: true },
        ADD_TAGS: ["span", "pre", "code", "a", "img"],
        ADD_ATTR: ["class", "target", "rel", "href", "src", "alt", "loading"],
    });

    return cleanHtml;
};