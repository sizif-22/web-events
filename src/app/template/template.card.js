"use client";
import "./theme.card.css";
import { useRouter } from "next/navigation";
const TemplateCard = ({ title, imgSrc }) => {
  const router = useRouter();
  return (
    <div className="template-card"onClick={router.push("./eventCreation")}>
      <img src={imgSrc} alt={title} className="template-image" />
      <div className="template-details">
        <h3>{title}</h3>
        {/* <button >Select Template</button> */}
      </div>
    </div>
  );
};

export default TemplateCard;
