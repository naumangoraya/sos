import React from "react";

const FormField = ({
  label,
  type = "text",
  value,
  onChange,
  options = [],
  className = "",
  required = false,
  ...props
}) => (
  <div className={`flex flex-col ${className}`}>
    {label && <label className="mb-1 text-xs font-semibold text-gray-700">{label}{required && <span className="text-red-500">*</span>}</label>}
    {type === "select" ? (
      <select
        className="border rounded px-2 py-1 focus:outline-none focus:ring w-full bg-white"
        value={value}
        onChange={onChange}
        {...props}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea
        className="border rounded px-2 py-1 focus:outline-none focus:ring w-full"
        value={value}
        onChange={onChange}
        {...props}
      />
    ) : (
      <input
        type={type}
        className="border rounded px-2 py-1 focus:outline-none focus:ring w-full"
        value={value}
        onChange={onChange}
        {...props}
      />
    )}
  </div>
);

export default FormField; 