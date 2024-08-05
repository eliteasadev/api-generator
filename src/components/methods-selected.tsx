"use client";
import { CheckMethod } from "./checkbox";

export function MethodsSelected() {
  return (
    <>
      <CheckMethod method="GET" variant="get" />
      <CheckMethod method="POST" variant="post" />
      <CheckMethod method="PUT" variant="put" />
      <CheckMethod method="DELETE" variant="delete" />
    </>
  );
}
