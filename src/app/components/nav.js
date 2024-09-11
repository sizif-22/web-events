"use client";
import { useState, useEffect, useRef } from "react";
import UsEr from "./user";
import { userData } from "../page";
import logo from "@/assets/imgs/eventy.png";
import Image from "next/image";
import DropDownBtns from "./dropdown btns/dropDownBtns";

export default function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <userData.Consumer>
      {(e) => {
        return (
          <nav className="bg-blue-500 h-16 flex items-center justify-between px-4 shadow-md text-white">
            <Image src={logo} className="w-auto h-full" alt="Logo" />
            <div className="flex gap-1 items-center relative h-full min-w-32 flex-row-reverse">
              <span
                className="material-symbols-outlined cursor-pointer p-1 rounded-full hover:bg-gray-200 transition-colors hover:text-black text-xl"
                onClick={toggleDropdown}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                </svg>
              </span>

              <div
                ref={dropdownRef}
                className={`absolute right-0 top-12 bg-white text-black shadow-lg rounded-md overflow-hidden transition-all duration-300 ease-out ${
                  showDropdown ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
                style={{ maxHeight: showDropdown ? "400px" : "0px" }}
              >
                <DropDownBtns />
              </div>
              {e.isLoggedIn && <UsEr />}
              {!e.isVerified && e.isLoggedIn && (
                <span class="material-symbols-outlined hover:text-white text-red-400 transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#F00"
                  >
                    <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </span>
              )}
            </div>
          </nav>
        );
      }}
    </userData.Consumer>
  );
}
