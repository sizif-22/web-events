"use client";
import { useState } from "react";
const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-white/20 pt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-white text-lg font-semibold pb-2 hover:text-white/80 transition-colors"
      >
        <span>{title}</span>
        <span
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        >
          ▽
        </span>
      </button>
      <div
        className={`transition-all duration-200 overflow-hidden ${
          isOpen ? " opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4 pt-4">{children}</div>
      </div>
    </div>
  );
};
export default CollapsibleSection;
