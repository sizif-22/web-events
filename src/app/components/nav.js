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
                more_horiz
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
                  error
                </span>
              )}
            </div>
          </nav>
        );
      }}
    </userData.Consumer>
  );
}
