"use client";
import { useEffect, useState } from "react";
import { checkLoggedIn } from "../firebase/firebase.auth";
import LoginButton from "./login.btn";
import Loading from "./loading/loading";
import LogIN from "../login/page";
import UsEr from "../body/user";
export default function NavBar({ currentPage }) {
  const [loggedIn, setLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await checkLoggedIn();
      setLoggedIn(isLoggedIn);
      setLoading(false);
    };

    checkAuth();
  }, []);
  return (
    <nav className="m-1 rounded-md bg-gray-900 h-16 pr-2 pl-2 items-center flex justify-between">
      <h1>{currentPage}</h1>
      {loading ? (
        <div className="">
          {" "}
          <Loading />
        </div>
      ) : loggedIn ? (
        <UsEr />
      ) : (
        <LoginButton />
      )}
    </nav>
  );
}
