"use client";
import React, { useState, useEffect } from "react";
import "./signup.css";
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
      <div className="h-screen flex justify-center items-center" id="signup">
          <form className="form">
            <p className="title">Register </p>
            <p className="message">
              Signup now and get full access to our app.{" "}
            </p>
            <div className="flex">
              <label>
                <input required placeholder="" type="text" className="input" />
                <span>Firstname</span>
              </label>

              <label>
                <input required placeholder="" type="text" className="input" />
                <span>Lastname</span>
              </label>
            </div>

            <label>
              <input
                required
                placeholder=""
                onChange={handleEmail}
                type="email"
                className="input"
              />
              <span>Email</span>
            </label>

            <label>
              <input
                required
                placeholder=""
                onChange={handlePassword}
                type="password"
                className="input"
              />
              <span>Password</span>
            </label>
            <label>
              <input
                required
                placeholder=""
                type="password"
                className="input"
              />
              <span>Confirm password</span>
            </label>
            {/* <button className="submit">Submit</button>
            <p className="signin">
              Already have an acount ? <a href="#">Signin</a>{" "}
            </p> */}
          </form>
      </div>
    );
  } else {
    router.push("./");
  }
}
