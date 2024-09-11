"use client";
import { useEffect, useState } from "react";
import Editor from "../template/template1/editor";
import Loading from "../components/loading/loading";
import { useRouter } from "next/navigation";
import { createEventAsync, handleShowFormEditor } from "@/lib/editor.data";
import { useDispatch, useSelector } from "react-redux";
import FormEditor from "./formEditor";
export default function EventCreation() {
  const dispatch = useDispatch();
  const router = useRouter();
  const valid = useSelector((state) => state.editor.valid);
  const showFormEditor = useSelector((state) => state.editor.showFormEditor);
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
    <div className="bg-slate-500 relative">
      {/* form */}
      <div
        onClick={() => {
          dispatch(handleShowFormEditor(!showFormEditor));
        }}
        className={`absolute w-screen h-screen bg-black z-10 opacity-50 ${
          !showFormEditor && "hidden"
        }`}
      ></div>
      <div
        className={`absolute w-1/2 left-1/4 h-screen bg-white z-20 rounded-md p-2  ${
          !showFormEditor && "hidden"
        }`}
      >
        <FormEditor />
      </div>

      <div className="grid grid-cols-5">
        <div className="col-span-1 h-screen relative">
          {!valid && (
            <h1 className=" font-bold text-red-700 bg-white inline-flex absolute top-5 left-2 p-1 rounded-md">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#F00"
              >
                <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
              </svg>{" "}
              this title is already token ...
            </h1>
          )}
          <div className="mt-20 p-3">
            <button
              className="bg-slate-400 text-black p-3 pt-1 pb-1 active:scale-105 rounded-md transition-all hover:opacity-80"
              onClick={() => {
                dispatch(handleShowFormEditor(!showFormEditor));
              }}
            >
              showFormEditor
            </button>
          </div>
          {valid && (
            <button
              className="bg-slate-400 text-black p-3 pt-1 pb-1 active:scale-105 rounded-md transition-all hover:opacity-80 absolute bottom-5 right-5"
              onClick={() => dispatch(createEventAsync())}
            >
              Save
            </button>
          )}
        </div>
        <div className="col-span-4">
          <Editor />
        </div>
      </div>
    </div>
  );
}
