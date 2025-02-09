"use client";
import TemplateCard from "./template.card";
import "./theme.card.css";
import { useSelector } from "react-redux";
import WarningCard from "../components/warning";

export default function Template() {
  const userState = useSelector((state) => state.user.userState);
  const { isLoggedIn, isVerified } = userState;

  const templates = [
    { title: "Theme1", imgSrc: "/images/theme1.png" },
    { title: "Theme2", imgSrc: "/images/theme2.png" },
  ];

  if (isLoggedIn && isVerified) {
    return (
      <div className="templates-page p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Choose a Theme
        </h1>
        <div className="templates-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <TemplateCard
              key={index}
              title={template.title}
              imgSrc={template.imgSrc}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen w-screen bg-slate-200">
      <WarningCard
        title="Access Restricted"
        description="You must be logged in with a verified account to access this page."
        />
        </div>
    );
  }
}
