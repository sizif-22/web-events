"use client";
import React from "react";
import "./login.btn.css";

const LoginButton = () => {
  return (
    <button className="btn thebtn" onClick={() => (window.location.href = "./login")}>
      {" "}
      Login
    </button>
  );
};

export default LoginButton;
