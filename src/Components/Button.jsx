import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ to, text, className = "", size = "md" }) => {
  
  // Box and Font sizes
  const sizes = {
    sm: "px-6 py-3 text-[15px] tracking-[0.2em] font-extralight",
    md: "px-8 py-3 text-lg font-light tracking-wider",
    lg: "px-10 py-4 text-xl font-light tracking-widest",
    full: "w-full py-4 text-center justify-center",
  };

  // Arrow sizes and margins based on button size
  const arrowSizes = {
    sm: "ml-2 text-sm",
    md: "ml-4 text-2xl",
    lg: "ml-5 text-3xl",
    full: "ml-4 text-2xl",
  };

  const base = `group/btn relative inline-flex items-center border border-white/50 text-white transition-all duration-500 hover:bg-white hover:text-black`;
  
  const activeSize = sizes[size] || size;
  const activeArrow = arrowSizes[size] || "ml-4 text-2xl";

  return (
    <div className={size === "full" ? "w-full" : "inline-block"}>
      <Link
        to={to}
        className={`${base} ${activeSize} ${className}`.trim()}
      >
        <span className="relative z-10 lowercase">{text}</span>

        <span className={`inline-block transition-transform duration-500 transform translate-x-0 translate-y-0 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 ${activeArrow}`}>
          ↗
        </span>
      </Link>
    </div>
  );
};

export default Button;