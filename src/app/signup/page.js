"use client";
import React, { useState, useEffect } from "react";
import { checkLoggedIn, signup } from "../firebase/firebase.auth";
import { useRouter } from "next/navigation";
import { addUser } from "../firebase/firebase.firestore";
import "./signup.css";
import { uploadProfileImg } from "../firebase/firebase.storage";
import Loading from "../components/loading/loading";
import Alert from "../components/alert/alert";

export default function SignUp() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await checkLoggedIn();
      setLoggedIn(isLoggedIn);
    };

    checkAuth();
  }, []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isThereImg, setIsThereImg] = useState(false);
  const [file, setFile] = useState(
    "https://firebasestorage.googleapis.com/v0/b/m4-tazkarti.appspot.com/o/profileImgs%2Fdownload.jpeg?alt=media&token=b1c122af-6c6d-4714-a985-7b6e1f006b6e"
  );
  const handleSignUp = async (e) => {
    e.preventDefault();
    setAlert(false);
    setDescription("");
    setLoading(true);
    if (password.length < 6) {
      setDescription(`password must be atleast 6 characters long`);
      setAlert(true);
      setLoading(false);
      return;
    }
    if (password != confirmPassword) {
      setDescription(`Passwords don't match`);
      setAlert(true);
      setLoading(false);
      setPassword("");
      setConfirmPassword("");

      return;
    }
    const signUpProcess = await signup(email, password);
    console.log(signUpProcess);
    if (signUpProcess == "error") {
      setLoading(false);
      setDescription("This Email Is Already Signed Up");
      setAlert(true);
      return;
    }

    if (isThereImg) {
      await addUser({ firstName, lastName, companyName, email, photoUrl: "" });
      await uploadProfileImg({ email, dir: "profileImgs", file });
    } else {
      await addUser({
        firstName,
        lastName,
        companyName,
        email,
        photoUrl: file,
      });
    }
    window.location.reload();
  };
  if (!loggedIn) {
    return loading ? (
      <Loading />
    ) : (
      <div
        className="h-screen flex justify-center flex-col items-center  bg-slate-200"
        id="signup "
      >
        {alert && <Alert description={description} />}
        <br />
        <div className="inline shadow-2xl shadow-slate-700 rounded-2xl">
          <form className="form">
            <p className="title">Register </p>
            <p className="message">
              Signup now and get full access to our app.{" "}
            </p>
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
                  setCompanyName(e.target.value);
                }}
                type="text"
                className="input"
              />
              <span>Company Name(optional)</span>
            </label>

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
              <input
                required
                placeholder=""
                type="password"
                className="input"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <span>Confirm password</span>
            </label>
            <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Profile Picture(optional)
            </label>
            <input
              className="flex w-full rounded-md border border-blue-300 border-input bg-white text-sm text-gray-400 file:border-0 file:bg-blue-600 file:text-white file:text-sm file:font-medium"
              type="file"
              id="picture"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setIsThereImg(true);
              }}
            />
            <button className="submit" onClick={handleSignUp}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    router.push("./");
  }
}
