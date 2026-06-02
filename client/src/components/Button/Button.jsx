import React from "react";

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

  const variants = {
    primary:
      "bg-[#E7A9A2] text-[#2C1810] hover:bg-[#E29A8F] shadow-[0_4px_16px_rgba(231,169,162,0.3)] hover:shadow-[0_8px_24px_rgba(231,169,162,0.5)] hover:-translate-y-0.5 active:translate-y-0 rounded-full",
    secondary:
      "bg-[#D4A398] text-[#2C1810] hover:bg-[#C8958A] shadow-[0_4px_16px_rgba(212,163,152,0.2)] hover:shadow-[0_8px_24px_rgba(212,163,152,0.35)] hover:-translate-y-0.5 active:translate-y-0 rounded-full",
    accent:
      "bg-[#2C1810] text-white hover:bg-[#3D2418] shadow-[0_4px_16px_rgba(44,24,16,0.15)] hover:shadow-[0_8px_24px_rgba(44,24,16,0.25)] hover:-translate-y-0.5 active:translate-y-0 rounded-full",
    outline:
      "border-2 border-[#E7A9A2] text-[#2C1810] hover:bg-[#E7A9A2] hover:text-[#2C1810] hover:-translate-y-0.5 active:translate-y-0 rounded-full",
    ghost:
      "text-[#2C1810] hover:bg-[#F1DBD5] hover:text-[#2C1810] rounded-full",
    destructive:
      "bg-[#C0392B] text-white hover:bg-[#A93226] shadow-[0_4px_16px_rgba(192,57,43,0.25)] hover:-translate-y-0.5 active:translate-y-0 rounded-full",
    luxury:
      "bg-gradient-to-r from-[#E7A9A2] via-[#F1DBD5] to-[#D4A398] text-[#2C1810] hover:opacity-95 shadow-[0_4px_20px_rgba(231,169,162,0.35)] hover:shadow-[0_8px_32px_rgba(231,169,162,0.5)] hover:-translate-y-0.5 active:translate-y-0 rounded-full",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-2.5 text-sm gap-2",
    lg: "px-8 py-3.5 text-base gap-2",
    xl: "px-10 py-4 text-lg gap-2.5",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
