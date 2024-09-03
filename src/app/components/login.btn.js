"use client";
import React from "react";

const LoginButton = () => {
  return (
    <button
      className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
      onClick={() => (window.location.href = "./login")}
    >
      Login
    </button>
  );
};

export default LoginButton;
