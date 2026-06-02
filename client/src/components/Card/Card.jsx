import React from 'react'

const Card = ({ children, className = "", hover = false, glass = false }) => {
  const base = glass
    ? "rounded-3xl border border-[#E8D4D0]/50 backdrop-blur-xl bg-white/70"
    : "bg-white rounded-3xl border border-[#E8D4D0]";

  const shadow = "shadow-[0_4px_20px_rgba(44,24,16,0.04)]";
  const hoverStyles = hover
    ? "hover:shadow-[0_12px_36px_rgba(231,169,162,0.2)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
    : "";

  return (
    <div className={`${base} ${shadow} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
