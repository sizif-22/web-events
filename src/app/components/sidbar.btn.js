"use client";
import Link from "next/link";

export default function SideBarBTN({ btnName, path, currentpage }) {
  return (
    <Link
      href={`./${path}`}
      className={`cursor-pointer p-3 underline md:mr-3 md:ml-3 md:no-underline inline-block rounded-md text-gray-800 md:block transition-colors duration-300 ${
        currentpage === btnName ? "md:bg-blue-500 md:text-white text-blue-500 " : "md:bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {btnName}
    </Link>
  );
}
