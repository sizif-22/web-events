"use client";
import Image from "next/image";
import "./theme.card.css";
import { useRouter } from "next/router";
const TemplateCard = ({ title, imgSrc, onSelect }) => {
  const router = useRouter();
  return (
    <div className="template-card" onClick={router.push('/eventCreation')}>
      <Image src={imgSrc} alt={title} className="template-image" />
      <div className="template-details">
        <h3>{title}</h3>
        <button onClick={onSelect}>Select Template</button>
      </div>
    </div>
  );
};

export default TemplateCard;
