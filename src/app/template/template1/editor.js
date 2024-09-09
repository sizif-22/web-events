"use client";
import { useState } from "react";
import Loading from "@/app/components/loading/loading";
// import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, handleDescription, handleTitle } from "@/lib/editor.data";

const Editor = () => {
  // const title = useSelector((state) => state.editor.title);
  const { title } = useSelector((state) => state.editor);
  const { description } = useSelector((state) => state.editor);
  const dispatch = useDispatch();
  return (
    <div className="bg-white h-screen">
      <label htmlFor="title">Title : </label>
      <input
        name="title"
        onChange={(e) => dispatch(handleTitle(e.target.value))}
        value={title}
      />
      <br />
      <label htmlFor="description">Description : </label>
      <input
        name="description"
        onChange={(e) => dispatch(handleDescription(e.target.value))}
        value={description}
      />
      <button onClick={() => dispatch(createEvent())}>Save</button>
    </div>
  );
};

export default Editor;
