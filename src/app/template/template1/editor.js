"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  createEventAsync,
  handleDescription,
  handleTitle,
} from "@/lib/editor.data";

const Editor = () => {
  const { title, description } = useSelector((state) => state.editor);
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
      <button onClick={() => dispatch(createEventAsync())}>Save</button>
    </div>
  );
};

export default Editor;
