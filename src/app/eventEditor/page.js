"use client";
import { useEffect, useState } from "react";
import Template1 from "../template/template1/main";
import Loading from "../components/loading/loading";
import { useRouter } from "next/navigation";
import { createEventAsync } from "@/lib/editor.data";
import { useDispatch, useSelector } from "react-redux";
export default function EventCreation() {
  const dispatch = useDispatch();
  const router = useRouter();
  const valid = useSelector((state) => state.editor.valid);
  const [load, setLoad] = useState(false);
  const { loading, allowTochangeRoute } = useSelector((state) => state.editor);
  useEffect(() => {
    if (allowTochangeRoute) {
      router.push("./account");
    }
  }, [allowTochangeRoute]);

  useEffect(() => {
    if (!load) {
      setLoad(loading);
    }
  }, [loading]);
  return load ? (
    <Loading />
  ) : (
    <div className="bg-slate-500">
      <div className="grid grid-cols-5">
        <div className="col-span-1 h-screen relative">
          {!valid && (
            <h1 className=" font-bold text-red-700 bg-white inline absolute top-5 left-2 p-1 rounded-md">
              {" "}
              ! this title is already token ...
            </h1>
          )}

          {valid && (
            <button
              className="bg-slate-400 p-3 pt-1 pb-1 active:scale-105 rounded-md transition-all hover:opacity-80 absolute bottom-5 right-5"
              onClick={() => dispatch(createEventAsync())}
            >
              Save
            </button>
          )}
        </div>
        <div className="col-span-4">
          <Template1 Edit={true} />
        </div>
      </div>
    </div>
  );
}
