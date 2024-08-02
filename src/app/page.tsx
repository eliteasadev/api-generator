"use client";
import { ChangeTheme } from "@/components";
import { Button, Checkbox, Toaster } from "@/components/ui";
import { AlertTriangle, CheckCircle } from "@/icons";
import { isPrismaSchema } from "@/lib";
import Editor from "@monaco-editor/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();

  const [schema, setSchema] = useState(`model Tag {
  id        String   @id @default(cuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  food      Food[]   @relation("Food_Tags")
}`);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPrismaSchema(schema)) {
      toast(
        <div className="flex gap-2 items-center">
          <CheckCircle />
          <p className="text-sm">Schema is valid</p>
        </div>,
        {
          action: {
            label: "Clear schema input",
            onClick: () => setSchema(""),
          },
        }
      );
      const schemaURL = btoa(schema);
      router.push(`/code/${schemaURL}/`);
    } else {
      toast(
        <div className="flex gap-2 items-center">
          <AlertTriangle />
          <p className="text-sm">Schema is invalid</p>
        </div>,
        {
          action: {
            label: "Clear schema input",
            onClick: () => setSchema(""),
          },
        }
      );
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <nav className="flex items-center justify-between mb-4 w-full">
        <h1 className="text-2xl font-bold">API Generator</h1>
        <ChangeTheme />
      </nav>
      <form
        action=""
        className="flex flex-col gap-4 min-w-[350px] md:min-w-[700px] max-w-[800px]"
      >
        <Toaster />
        <Editor
          height={400}
          defaultLanguage="prisma"
          defaultValue={schema}
          onChange={(value) => setSchema(value ?? "")}
          theme="vs-dark"
          options={{
            tabSize: 2,
            fontFamily: "Cascadia Code, Fira Code, monospace",
            fontSize: 14,
            fontLigatures: true,
          }}
        />
        {/* API Methods */}
        <div className="flex flex-row gap-2">
          <div className="flex space-x-2 items-center">
            <Checkbox id="checkgetmethod" />
            <label
              htmlFor="checkgetmethod"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-emerald-600 dark:text-emerald-300"
            >
              GET
            </label>
          </div>

          <div className="flex space-x-2 items-center">
            <Checkbox id="checkpostmethod" />
            <label
              htmlFor="checkpostmethod"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
            >
              POST
            </label>
          </div>

          <div className="flex space-x-2 items-center">
            <Checkbox id="checkputmethod" />
            <label
              htmlFor="checkputmethod"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
            >
              PUT
            </label>
          </div>

          <div className="flex space-x-2 items-center">
            <Checkbox id="checkdeletemethod" />
            <label
              htmlFor="checkdeletemethod"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
            >
              DELETE
            </label>
          </div>
        </div>
        <Button onClick={handleSubmit as any}>Submit</Button>
      </form>
    </div>
  );
}
