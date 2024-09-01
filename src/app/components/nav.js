"use client";
import { useEffect, useState } from "react";
import { checkLoggedIn } from "../firebase/firebase.auth";
import LoginButton from "./login.btn";
export default function NavBar({ currentPage }) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await checkLoggedIn();
      setLoggedIn(isLoggedIn);
    };

    checkAuth();
  }, []);
  return (
    <nav className="m-1 rounded-md bg-gray-900 h-16 pr-2 pl-2 items-center flex justify-between">
      <h1>{currentPage}</h1>
      {loggedIn ? "" : <LoginButton />}
    </nav>
  );
}
