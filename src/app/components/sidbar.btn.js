"use client";
import Link from "next/link";

export default function SideBarBTN({ btnName ,path, currentpage }) {

  return (
    <Link
      href={`./${path}`}
      className={`cursor-pointer p-2 m-6 rounded-md text-red-900 block ${
        currentpage == btnName ? "bg-red-600" : "bg-black"
      }`}
    >
      {btnName}
    </Link>
  );
}
