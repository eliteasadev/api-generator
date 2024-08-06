"use client";
import { useEffect } from "react";

import { useCompletion } from "ai/react";

import { Editor } from "@monaco-editor/react";

import { CodeBlock, MethodsSelected, NavBar } from "@/components";
import { Button } from "@/components/ui";
import { AlertCircle, CheckCircle, Clipboard, CloudCode } from "@/icons";
import { isPrismaSchema, schema } from "@/lib";
import { useStore } from "@/store/methods";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export default function Home() {
  const { theme } = useTheme();
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
    toast.info(
      <div className="flex items-center gap-2">
        <Clipboard />{" "}
        <p className="font-semibold">Código copiado al portapapeles</p>
      </div>
    );
    navigator.clipboard.writeText(completion);
  };

  useEffect(() => {
    setInput(schema);
  }, []);

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPrismaSchema(input)) {
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle />{" "}
          <p className="font-semibold">
            Modelo compatible, generando código...
          </p>
        </div>
      );
      handleSubmit();
    } else {
      toast.error(
        <div className="flex items-center gap-2">
          <AlertCircle />{" "}
          <p className="font-semibold">
            Modelo incompatible, modifique el modelo de datos.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="px-8 py-4 ">
      {/* NavBar */}
      <NavBar />

      {/* Description */}
      <div className="w-full pb-4 ">
        <p>
          Esta página te permite generar código de API REST con{" "}
          <a
            href="https://www.prisma.io/docs/orm/prisma-schema/data-model/models"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 font-semibold"
          >
            Prisma
          </a>
          , utilizando el modelo de datos que hayas definido en tu proyecto.
        </p>
        <p>
          Copia el el modelo de datos en el siguiente campo, luego haz click en
          el botón Generar para obtener el código de API REST.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={formHandler} className="flex flex-col gap-2">
        {/* Editor */}
        <Editor
          className="border-2 border-slate-300 rounded-lg p-2"
          height={280}
          defaultLanguage="prisma"
          value={input}
          onChange={(value) => setInput(value || "")}
          theme={theme === "dark" ? "vs-dark" : "vs"}
          options={{
            tabSize: 2,
            fontFamily: "Cascadia Code, Fira Code, monospace",
            fontSize: 14,
            fontLigatures: true,
          }}
        />
        {/* Methods */}
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex items-center gap-2">
            <MethodsSelected />
          </div>
          <div>
            Nota: Si no se selecciona ninguna opción, se generarán todos los
            métodos disponibles.
          </div>
        </div>
        {/* Buttons */}
        <div className="grid md:grid-cols-2 gap-2">
          <Button type="submit" disabled={!!completion || isLoading}>
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
      {/* Toast */}
    </div>
  );
}
