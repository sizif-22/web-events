"use client";
import React from "react";
import "./login.btn.css";

const LoginButton = () => {
  return (
    <button className="btn" onClick={() => (window.location.href = "./login")}>
      {" "}
      Login
    </button>
  );
};

export default LoginButton;
