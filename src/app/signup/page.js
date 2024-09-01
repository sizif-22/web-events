"use client";
import { useState, useEffect } from "react";
import { checkLoggedIn, signup } from "../firebase/firebase.auth";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await checkLoggedIn();
      setLoggedIn(isLoggedIn);
    };

    checkAuth();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    signup(email, password);
  };
  if (!loggedIn) {
    return (
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            value={email}
            onChange={handleEmail}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            placeholder="Password"
          />
          <button type="submit" onSubmit={handleSignUp}>
            Sign Up
          </button>
        </form>
        {/* {message && <p>{message}</p>} */}
      </div>
    );
  } else {
    router.push("./template");
  }
}
