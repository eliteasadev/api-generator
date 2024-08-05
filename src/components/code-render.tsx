import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.min.css";
import "prismjs/themes/prism-okaidia.min.css";
import { useEffect } from "react";

export const CodeBlock: React.FC<{ codeString: string }> = ({ codeString }) => {
  useEffect(() => {
    Prism.highlightAll(); // Resalta el código al montar el componente
  }, [codeString]); // Dependencia para volver a resaltar si cambia el código

  return (
    <pre
      className="line-numbers"
      data-prismjs-copy="Copy"
      data-prismjs-copy-success="Copied!"
      data-prismjs-copy-error="Failed!"
      onClick={() => navigator.clipboard.writeText(codeString)}
    >
      <code className="language-javascript">{codeString}</code>
    </pre>
  );
};
