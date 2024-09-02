import React from "react";
import "./theme.card.css";
const TemplateCard = ({ title, imgSrc, onSelect }) => {
  return (
    <div className="template-card">
      <img src={imgSrc} alt={title} className="template-image" />
      <div className="template-details">
        <h3>{title}</h3>
        <button onClick={onSelect}>Select Template</button>
      </div>
    </div>
  );
};

export default TemplateCard;
