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
    <nav className="bg-blue-500 h-16 flex items-center justify-between px-4 shadow-md text-white">
      <h1 className="text-xl font-semibold">{currentPage}</h1>
      {loading ? (
        <Loading />
      ) : loggedIn ? (
        <UsEr />
      ) : (
        <LoginButton />
      )}
    </nav>
  );
}
