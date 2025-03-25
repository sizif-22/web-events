"use client";
import TemplateCard from "./template.card";
import { useSelector } from "react-redux";
import WarningCard from "../components/warning";
import NavBar from "../components/nav";

export default function Template() {
  const userState = useSelector((state) => state.user.userState);
  const { isLoggedIn, isVerified } = userState;

  const templates = [
    { title: "Theme1", imgSrc: "/images/theme1.png" },
    // { title: "Theme2", imgSrc: "/images/theme2.png" },
  ];

  if (isLoggedIn && isVerified) {
    return (
      <div className="flex flex-col bg-[#0a0a0a]">
        <NavBar />
        <div className="h-[88vh] pt-5 px-[20px] md:px-[120px]">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">
            Choose a Theme
          </h1>
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {templates.map((template, index) => (
              <TemplateCard
                key={index}
                title={template.title}
                imgSrc={template.imgSrc}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen w-screen" style={{ backgroundColor: "#0a0a0a" }}>
        <WarningCard
          title="Access Restricted"
          description="You must be logged in with a verified account to access this page."
        />
      </div>
    );
  }
}
