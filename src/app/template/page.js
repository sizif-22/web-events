"use client";
import { useRouter } from "next/navigation";
import TemplateCard from "./template.card";
import "./theme.card.css";
import { useSelector } from "react-redux";

export default function Template() {
  const router = useRouter();
  const userState = useSelector((state) => state.user.userState);
  const { isLoggedIn, isVerified } = userState;

  const templates = [
    { title: "Template1", imgSrc: "/images/theme1.png" },
    { title: "Theme 2", imgSrc: "/images/theme2.png" },
    { title: "Theme 3", imgSrc: "/images/theme3.png" },
  ];

  if (isLoggedIn && isVerified) {
    return (
      <div className="templates-page p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Choose a Template
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
    router.push("/");
  }
}
