"use client";
import { checkVerified } from "../firebase/firebase.auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../components/loading/loading";
import TemplateCard from "./template.card";
import "./theme.card.css";

export default function Template() {
  const router = useRouter();
  const [verified, setVerified] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isVerified = await checkVerified();
        setVerified(isVerified);
      } catch (error) {
        console.error("Error checking verification status:", error);
        setVerified(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!verified) {
    router.push("/");
    return null; // Redirecting; no need to render anything
  }

  const templates = [
    { title: "Theme 1", imgSrc: "/images/theme1.png" },
    { title: "Theme 2", imgSrc: "/images/theme2.png" },
    { title: "Theme 3", imgSrc: "/images/theme3.png" },
    // Add more templates here
  ];

  const handleSelectTemplate = (title) => {
    alert(`You selected ${title}`);
    // Implement the selection logic here
  };

  return (
    <div className="templates-page">
      <h1 className="page-title">Choose a Template</h1>
      <div className="templates-grid grid-cols-3 h-96">
        {templates.map((template, index) => (
          <TemplateCard
            key={index}
            title={template.title}
            imgSrc={template.imgSrc}
            onSelect={() => handleSelectTemplate(template.title)}
          />
        ))}
      </div>
    </div>
  );
}
