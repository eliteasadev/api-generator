"use client";
import { useEffect } from "react";

import { useCompletion } from "ai/react";

import { Editor } from "@monaco-editor/react";

import { CodeBlock, MethodsSelected, NavBar } from "@/components";
import { Button } from "@/components/ui";
import { Clipboard, CloudCode } from "@/icons";
import { schema } from "@/lib";
import { useStore } from "@/store/methods";

export default function Home() {
  const { methods } = useStore((state) => ({
    methods: state.methods,
  }));

  const { completion, input, setInput, handleSubmit, isLoading } =
    useCompletion({
      api: "/api/completion",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        methods: methods,
      },
    });

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(completion);
  };

  useEffect(() => {
    setInput(schema);
  }, []);

  return (
    <div className="p-4 ">
      {/* NavBar */}
      <NavBar />

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {/* Editor */}
        <Editor
          height={280}
          defaultLanguage="prisma"
          value={input}
          onChange={(value) => setInput(value || "")}
          theme="vs-dark"
          options={{
            tabSize: 2,
            fontFamily: "Cascadia Code, Fira Code, monospace",
            fontSize: 14,
            fontLigatures: true,
          }}
        />
        {/* Methods */}
        <div className="flex items-center gap-4">
          <MethodsSelected />
          <span>
            Nota: Si no se selecciona ninguna opción, se generarán todos los
            métodos disponibles.
          </span>
        </div>
        {/* Buttons */}
        <div className="grid md:grid-cols-2 gap-2">
          <Button type="submit" disabled={!!completion}>
            <CloudCode />
            <span className="ml-2">Generar</span>
          </Button>
          <Button disabled={isLoading || !completion} onClick={copyToClipboard}>
            <Clipboard />
            <span className="ml-2">Copiar código</span>
          </Button>
        </div>
        {/* Code */}
        <CodeBlock codeString={completion} />
      </form>
    </div>
  );
}
