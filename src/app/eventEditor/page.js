"use client";
import Template1 from "../template/template1/main";
import { useSearchParams } from "next/navigation";
export default function EventCreation() {
  const searchParams = useSearchParams();
  const template = searchParams.get("template");
  return (
    <div>
      <h1>Event Creation for {template}</h1>
      <Template1 />
    </div>
  );
}
