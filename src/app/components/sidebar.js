"use client";
import { useState ,useEffect } from "react";
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
    <div className="max-h-screen m-1 rounded-md bg-gray-900 pt-44">
      <hr className="m-3 border-t-red-900" />

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
  );
}
