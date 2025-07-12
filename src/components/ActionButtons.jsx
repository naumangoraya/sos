import React from "react";

const ActionButtons = ({ buttons, vertical = false }) => (
  <div className={vertical ? "flex flex-col gap-2" : "flex flex-wrap gap-2 my-2"}>
    {buttons.map((btn, idx) => (
      <button
        key={btn.label}
        onClick={btn.onClick}
        disabled={btn.disabled}
        className={`px-4 py-1 rounded font-medium border shadow-sm transition-colors
          ${btn.color === "green" ? "bg-green-500 text-white hover:bg-green-600" : ""}
          ${btn.color === "primary" ? "bg-blue-500 text-white hover:bg-blue-600" : ""}
          ${btn.color === "secondary" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : ""}
          ${btn.disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        type={btn.type || "button"}
      >
        {btn.label}
      </button>
    ))}
  </div>
);

export default ActionButtons; 