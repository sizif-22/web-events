"use client";
import Link from "next/link";

export default function SideBarBTN({ btnName: name, active, setActive }) {
  const handleLink = () => {
    setActive(name);
  };
  return (
    <Link
      onClick={handleLink}
      href={`./${name}`}
      className={`cursor-pointer p-2 m-6 rounded-md text-red-900 block ${
        active == name ? "bg-red-600" : "bg-black"
      }`}
    >
      {name === "" ? "overview" : name}
    </Link>
  );
}
