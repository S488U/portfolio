import { marked } from "marked"
import hljs from "highlight.js";
import DOMPurify from "dompurify";
import { html_beautify, css_beautify, js_beautify } from "js-beautify";

const formatCode = (code, lang) => {
    const lowerLang = lang.toLowerCase();
    const jsLangs = ["javascript", "js", "json", "node", "react", "jsx", "ts", "typescript"];
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
            const highlightedCode = hljs.highlight(formattedCode, { language }).value;

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