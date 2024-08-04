"use client";
import { CodeBlock } from "@/components";
import { Editor } from "@monaco-editor/react";
import { useCompletion } from "ai/react";
import { useEffect } from "react";

export default function Page() {
  const schema = `model Tag {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  food      Food[]   @relation("Food_Tags")
}`;
  const { completion, input, setInput, handleSubmit } = useCompletion({
    api: "/api/completion",
  });

  useEffect(() => {
    setInput(schema);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Editor
        height={300}
        defaultLanguage="prisma"
        value={input}
        onChange={(value) => setInput(value || "")}
        //Monokai
        theme="vs-dark"
        options={{
          tabSize: 2,
          fontFamily: "Cascadia Code, Fira Code, monospace",
          fontSize: 14,
          fontLigatures: true,
        }}
      />
      <button type="submit">Submit</button>
      <CodeBlock codeString={completion} />
    </form>
  );
}
