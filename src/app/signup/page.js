"use client";
import React, { useState, useEffect } from "react";
import { checkLoggedIn, signup } from "../firebase/firebase.auth";
import { useRouter } from "next/navigation";
import { addUser } from "../firebase/firebase.firestore";
import "./signup.css";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();
    signup(email, password);
    addUser(firstName, lastName, email, "https://firebasestorage.googleapis.com/v0/b/m4-tazkarti.appspot.com/o/profileImgs%2Fdownload.jpeg?alt=media&token=b1c122af-6c6d-4714-a985-7b6e1f006b6e");
  };
  if (!loggedIn) {
    return (
      <div className="h-screen flex justify-center items-center" id="signup">
        <form className="form">
          <p className="title">Register </p>
          <p className="message">Signup now and get full access to our app. </p>
          <div className="flex">
            <label>
              <input
                required
                placeholder=""
                type="text"
                className="input"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <span>Firstname</span>
            </label>

            <label>
              <input
                required
                placeholder=""
                type="text"
                className="input"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <span>Lastname</span>
            </label>
          </div>

          <label>
            <input
              required
              placeholder=""
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              className="input"
            />
            <span>Email</span>
          </label>

          <label>
            <input
              required
              placeholder=""
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className="input"
            />
            <span>Password</span>
          </label>
          <label>
            <input required placeholder="" type="password" className="input" />
            <span>Confirm password</span>
          </label>
          <button className="submit" onClick={handleSignUp}>
            Submit
          </button>
          {/* <p className="signin">
            Already have an acount ? <a href="#">Signin</a>{" "}
          </p> */}
        </form>
      </div>
    );
  } else {
    router.push("./");
  }
}
