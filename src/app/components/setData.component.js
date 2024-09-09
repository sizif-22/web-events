"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
const SetData = () => {
  const pathName = usePathname();
  useEffect(() => {
    console.log(pathName);
  }, [pathName]);
  return <></>;
};
export default SetData;