"use client";

import { Badge, Checkbox } from "@/components/ui";
import { useStore } from "@/store/methods";
type CheckboxProps = {
  method: string;
  variant: "get" | "post" | "put" | "delete";
};

export function CheckMethod({ method, variant }: CheckboxProps) {
  const { methods, setMethods } = useStore();

  const handleChange = (checked: boolean) => {
    if (checked) {
      setMethods([...methods, method]);
    } else {
      setMethods(methods.filter((m) => m !== method));
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Checkbox onCheckedChange={handleChange} />
      <Badge variant={variant}>{method}</Badge>
    </div>
  );
}
