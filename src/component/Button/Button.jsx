import React from "react";

const Button = ({ svg: SvgIcon, onClick, className, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {SvgIcon}
      {children}
    </button>
  );
};

export { Button };
