import React from "react";
import { motion } from "framer-motion";

export const Button = ({
  children,
  variant = "primary",
  isLoading = false,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50";

  const variants = {
    primary: "bg-black text-white hover:bg-gray-900",
    secondary: "bg-gray-100 text-black hover:bg-gray-200",
    outline: "border-2 border-gray-300 text-black hover:border-gray-400",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </motion.button>
  );
};
