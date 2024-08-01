import { ChangeTheme } from "@/components";
import { Button, Checkbox, Textarea } from "@/components/ui";

const api_methods = [
  {
    name: "GET",
    id: "checkgetmethod",
    description: "Generate GET method",
  },
  {
    name: "POST",
    id: "checkpostmethod",
    description: "Generate POST method",
  },
  {
    name: "PUT",
    id: "checkputmethod",
    description: "Generate PUT method",
  },
  {
    name: "DELETE",
    id: "checkdeletemethod",
    description: "Generate DELETE method",
  },
];

export default function Home() {


  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <nav className="flex items-center justify-between mb-4 w-full">
        <h1 className="text-2xl font-bold">API Generator</h1>
        <ChangeTheme /></nav>
      <form action="" className="flex flex-col gap-4 min-w-[350px] md:min-w-[700px] max-w-[800px]">
        <Textarea placeholder="Enter your prisma schema" className="w-full" rows={10} />

        {/* API Methods */}
        <div className="flex flex-row gap-2">
          <div className="flex space-x-2 items-center">
            <Checkbox id="checkgetmethod" />
            <label
              htmlFor="checkgetmethod"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
        <Button>Submit</Button>
      </form>
    </div>
  )
}
