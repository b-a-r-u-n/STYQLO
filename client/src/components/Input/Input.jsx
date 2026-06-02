import React from 'react'

const Input = ({ label, error, className = "", ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-semibold text-[#2C1810] tracking-wide">
          {label}
        </label>
      )}

      <input
        className={`w-full px-4 py-3 bg-[#FBF8F5] border border-[#E8D4D0] rounded-2xl
          text-[#2C1810] placeholder-[#D4A398]/80
          focus:outline-none focus:ring-2 focus:ring-[#E7A9A2]/30 focus:border-[#E7A9A2]
          transition-all duration-300
          ${error ? "border-red-400 focus:ring-red-200 focus:border-red-400" : ""}
          ${className}`}
        {...props}
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
};

export default Input;
