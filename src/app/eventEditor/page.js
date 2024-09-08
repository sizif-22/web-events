"use client";
import Template1 from "../template/template1/main";
// import { useSearchParams } from "next/navigation";
export default function EventCreation() {
  // const searchParams = useSearchParams();
  // const template = searchParams.get("template");
  return (
    <div className="bg-slate-500">
      {/* <h1>Event Creation for {template}</h1> */}
      <div className="grid grid-cols-5">
        <div className="col-span-1 h-screen">test</div>
        <div className="col-span-4">
          <Template1 Edit={true} />
        </div>
      </div>
    </div>
  );
}
