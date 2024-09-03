"use client";
import Link from "next/link";

export default function SideBarBTN({ btnName, path, currentpage }) {
  return (
    <Link
      href={`./${path}`}
      className={`cursor-pointer p-3 mb-4 rounded-md text-gray-800 block transition-colors duration-300 ${
        currentpage === btnName ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {btnName}
    </Link>
  );
}
