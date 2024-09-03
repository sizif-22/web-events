"use client";
import "./firebase/usefirestoredata";
import SideBar from "./components/sidebar";
import Footer from "./components/footer";
import NavBar from "./components/nav";
import "./firebase/firebase.storage";
import Home from "./page";
import Explore from "./explore/page";
import { usePathname } from "next/navigation";

export default function SubLayout({ child }) {
  let path = usePathname();
  let currentPage = "/";
  if (path == "/" || path == "/explore") {
    path == "/"
      ? (currentPage = "overview")
      : path == "/explore"
      ? (currentPage = "explore")
      : "";
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
        <div className="flex-1 flex flex-col lg:flex-row">
          <SideBar currentpage={currentPage} className="lg:block hidden bg-white shadow-md" />
          <div className="flex-1 flex flex-col">
            <NavBar currentPage={currentPage} className="bg-blue-600 text-white" />
            <main className="flex-1 p-6 bg-white">
              {currentPage === "overview" ? (
                <Home />
              ) : currentPage === "explore" ? (
                <Explore />
              ) : (
                ""
              )}
            </main>
          </div>
        </div>
        <Footer className="bg-blue-600 text-white" />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
        {child}
        <Footer className="bg-blue-600 text-white" />
      </div>
    );
  }
}
