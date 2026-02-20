import React, { forwardRef } from "react";

export const Input = forwardRef(
  ({ label, error, icon: Icon, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon size={20} />
            </div>
          )}
          <input
            ref={ref}
            className={`
            w-full px-4 py-3 ${Icon ? "pl-10" : "pl-4"} 
            border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
            ${error ? "border-red-500" : ""}
            ${className}
          `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
