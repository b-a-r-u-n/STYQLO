import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    error: 'bg-red-50 text-red-600 border border-red-200',
    info: 'bg-[#F1DBD5] text-[#C8756A] border border-[#EDD5CF]',
    default: 'bg-[#F5EAE7] text-[#9B7B75] border border-[#EDD5CF]',
    secondary: 'bg-[#2C1810] text-white border border-[#2C1810]',
    luxury: 'bg-gradient-to-r from-[#C8756A] to-[#D4A398] text-white border-0',
  };

  const variantClass = variants[variant] || variants.default;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${variantClass} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
