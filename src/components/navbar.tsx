import { ChangeTheme } from "./change-theme";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between w-full">
      <h1 className="text-2xl font-bold">Generador de API</h1>
      <ChangeTheme />
    </nav>
  );
}