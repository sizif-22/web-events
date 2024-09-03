"use client";
import { useEffect, useState } from "react";
import LoginButton from "./login.btn";
import Loading from "./loading/loading";
import UsEr from "./user";

export default function NavBar({ currentPage }) {
  const [loggedIn, setLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userState = JSON.parse(sessionStorage.getItem("userState"));
      if (userState?.isLoggedIn) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    }
  }, []);

  return (
    <nav className="m-1 rounded-md bg-gray-900 h-16 pr-2 pl-2 items-center flex justify-between">
      <h1>{currentPage}</h1>
      {loading ? (
        <div>
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
