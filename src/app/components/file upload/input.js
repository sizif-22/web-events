"use client";
import React, { useRef, useState } from "react";
import { handleLogo } from "@/lib/editor.data";
import { useDispatch } from "react-redux";
const Input = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(handleLogo(file));
      setFileName(file.name);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="relative inline-block">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleClick}
          title="Add New File"
          className="group cursor-pointer outline-none hover:rotate-90 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
          >
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              strokeWidth={1.5}
            />
            <path d="M8 12H16" strokeWidth={1.5} />
            <path d="M12 16V8" strokeWidth={1.5} />
          </svg>
        </button>
      </div>
      {fileName && (
        <span className="text-zinc-600 truncate max-w-xs">{fileName}</span>
      )}
    </div>
  );
};

export default Input;
