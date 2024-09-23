"use client";
import { useRouter } from "next/navigation";
import "./theme.card.css";

const TemplateCard = ({ title, imgSrc }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/eventEditor?theme=${encodeURIComponent(title)}`);
  };

  return (
    <div
      className="template-card h-36 flex flex-col justify-between"
      onClick={handleClick}
    >
      <img src={imgSrc} alt={title} className="template-image" />
      <div className="template-details">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default TemplateCard;
