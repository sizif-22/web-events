"use client";
import { useState } from "react";
import SideBarBTN from "./sidbar.btn";

export default function SideBar() {
  const [activeBtn, setActiveBtn] = useState(""); // Manage the active state here

  return (
    <div className="relative h-screen bg-red-900">
      <SideBarBTN
        btnName={""}
        active={activeBtn}
        setActive={setActiveBtn}
      />
      <SideBarBTN
        btnName={"eventCreation"}
        active={activeBtn}
        setActive={setActiveBtn}
      />
      <div className="absolute bottom-2 left-5">Login</div>
    </div>
  );
}
