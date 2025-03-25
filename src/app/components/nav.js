"use client";
import { useState, useEffect, useRef } from "react";
import UsEr from "./user";
import DropDownBtns from "./dropdown btns/dropDownBtns";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function NavBar() {
  const userState = useSelector((state) => state.user.userState);
  const { isLoggedIn, isVerified } = userState;
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

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
    <nav className="bg-black shadow-[#888] shadow-sm h-[12vh] flex items-center justify-between px-[10px] md:px-[60px] text-white">
      <p className="text-2xl md:text-4xl select-none font-[Italiana]">
        Webbing Events
      </p>
      <div className="flex gap-1 items-center relative h-full min-w-32 flex-row-reverse">
        <div
          ref={dropdownRef}
          className={`absolute right-0 top-12 bg-white text-black shadow-lg rounded-md overflow-hidden transition-all duration-300 ease-out ${
            showDropdown ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ maxHeight: showDropdown ? "400px" : "0px" }}
        >
          <DropDownBtns />
        </div>

        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <UsEr />
            <span
              className="material-symbols-outlined cursor-pointer p-1 rounded-full hover:bg-gray-200 transition-colors  hover:text-black text-xl"
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
                className="hover:fill-black"
              >
                <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
              </svg>
            </span>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              className="font-bold md:w-24 md:text-lg w-20 py-1 hover:bg-[#463fcc] border-[#3A31D8] hover:border-[#463fcc] transition-all duration-300  border-2 rounded-[11px] text-white"
              onClick={() => router.push("/signup")}
            >
              SingUp
            </button>
            <button
              className="font-bold md:w-24 md:text-lg w-20 py-1  hover:bg-[#463fcc] bg-[#3A31D8] transition-all duration-300  rounded-[11px] text-white"
              onClick={() => router.push("/login")}
            >
              LogIn
            </button>
          </div>
        )}
        {!isVerified && isLoggedIn && (
          <span className="material-symbols-outlined hover:text-white text-red-400 transition-all error__icon">
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
                fill="#393a37"
              />
            </svg>
          </span>
        )}
      </div>
    </nav>
  );
}
