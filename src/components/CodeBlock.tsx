import { useEffect, useRef } from "react";
import hljs from "highlight.js/lib/core";
import yaml from "highlight.js/lib/languages/yaml";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import plaintext from "highlight.js/lib/languages/plaintext";
import "highlight.js/styles/github-dark.css";

hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("gherkin", (hljs) => ({
  keywords: { keyword: "Feature Scenario Given When Then And But" },
  contains: [
    { className: "string", begin: /"/, end: /"/ },
    { className: "comment", begin: /#/, end: /$/ },
  ],
}));

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ code, language = "plaintext", filename }: CodeBlockProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = code.trim();
      hljs.highlightElement(ref.current);
    }
  }, [code, language]);

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-gray-700">
      {filename && (
        <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 font-mono border-b border-gray-700">
          {filename}
        </div>
      )}
      <pre className="m-0 rounded-none">
        <code ref={ref} className={`language-${language}`} />
      </pre>
    </div>
  );
}
