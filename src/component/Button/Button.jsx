import React from "react";

const Button = ({ svg: SvgIcon, onClick, className, children }) => {
  return (
    <button onClick={onClick} className={className}>
      {SvgIcon}
      {children}
    </button>
  );
};

export { Button };
