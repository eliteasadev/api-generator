"use client";

import { Editor } from "@monaco-editor/react";
import { useCompletion } from "ai/react";
import { useEffect } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const schema = atob(params.slug.slice(0, -6));
  const { completion, handleSubmit } = useCompletion({
    api: "/api/completion",
    body: {
      prompt: schema,
    },
  });

  useEffect(() => {
    // Trigger the handleSubmit to perform the request automatically
    handleSubmit();
  }, [handleSubmit]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent the form from actually submitting
        handleSubmit();
      }}
    >
      <button type="submit">Submit</button>
      <Editor
        height={400}
        defaultLanguage="javascript"
        defaultValue={completion}
        value={completion}
        theme="vs-dark"
        options={{
          tabSize: 2,
          fontFamily: "Cascadia Code, Fira Code, monospace",
          fontSize: 14,
          fontLigatures: true,
        }}
      />
    </form>
  );
}
