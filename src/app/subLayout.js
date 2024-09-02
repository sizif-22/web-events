"use client";
import "./firebase/usefirestoredata";
import SideBar from "./components/sidebar";
import OverviewBody from "./body/overview.body";
import { usePathname } from "next/navigation";
import ExploreBody from "./body/explore.body";
import Footer from "./components/footer";
import NavBar from "./components/nav";
import "./firebase/firebase.storage";
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
      <>
        <div className="flex flex-col min-h-screen text-red-900">
          <div className="flex-1 grid grid-cols-5">
            <SideBar currentpage={currentPage} />
            <div className="col-span-4 flex flex-col">
              <NavBar currentPage={currentPage} />
              <>
                {currentPage == "overview" ? (
                  <OverviewBody />
                ) : currentPage == "explore" ? (
                  <ExploreBody />
                ) : (
                  ""
                )}
              </>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        {child}
        <Footer />
      </>
    );
  }
}
