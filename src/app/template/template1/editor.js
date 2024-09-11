"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  createEventAsync,
  handleDescription,
  handleTitle,
  handleValid,
} from "@/lib/editor.data";
import { useState } from "react";
import { checkIfEventExist } from "@/app/firebase/firestore.events";
const Editor = () => {
  const [theTitle, setTheTitle] = useState("test");
  const valid = useSelector((state) => state.editor.valid);

  const handletitle = async (e) => {
    setTheTitle(e.target.value);
    const id = String(e.target.value).toLowerCase();
    const exist = await checkIfEventExist(id);
    dispatch(handleValid(!exist));
    dispatch(handleTitle(e.target.value));
  };
  const { description } = useSelector((state) => state.editor);
  const dispatch = useDispatch();

  return (
    <div className="bg-white h-screen">
      <div className="flex flex-col h-screen w-full p-8 bg-gray-900 text-gray-200">
        <h2 className="mb-4 border-b border-gray-600 pb-2 text-2xl font-semibold">
          <input
            className="bg-transparent"
            name="title"
            onChange={handletitle}
            value={theTitle}
          />
        </h2>
        <div className="flex flex-1 justify-between items-start">
          <div className="flex-1 mr-4 bg-gray-800 p-4 rounded-lg overflow-auto">
            <input
              name="description"
              className="bg-transparent"
              onChange={(e) => dispatch(handleDescription(e.target.value))}
              value={description}
            />
          </div>
          <div className="flex-1 max-w-xs bg-gray-800 p-4 rounded-lg">
            ## upload img
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
