"use client";
import { useState, useEffect } from "react";
import SideBarBTN from "./sidbar.btn";
import { checkLoggedIn } from "../firebase/firebase.auth";

export default function SideBar({ currentpage }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await checkLoggedIn();
      setLoggedIn(isLoggedIn);
    };

    checkAuth();
  }, []);

  return (
    <div className="sidebar md:pt-11">
      <hr className="my-4 border-gray-300 hidden md:block" />
      <div className="sidebar-buttons md:grid md:gap-16 ">
        <SideBarBTN btnName={"overview"} path={""} currentpage={currentpage} />
        <SideBarBTN
          btnName={"eventCreation"}
          path={loggedIn ? "template" : "plan"}
          currentpage={currentpage}
        />
        <SideBarBTN
          btnName={"explore"}
          path={"explore"}
          currentpage={currentpage}
        />
      </div>
    </div>
  );
}
