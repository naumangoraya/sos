import React from "react";
import FormField from "./FormField";

const columns = [
  { key: "store", label: "Store" },
  { key: "item", label: "Item" },
  { key: "description", label: "Description" },
  { key: "reel", label: "Reel#" },
  { key: "qty", label: "Qty" },
  { key: "weight", label: "Weight" },
  { key: "rate", label: "Rate" },
  { key: "value", label: "Value" },
  { key: "rateOn", label: "Rate On" },
  { key: "constant", label: "Constant" },
];

const InvoiceItemTable = ({ items, onAdd, onEdit, onRemove, editableIndex, editItem, onEditChange, onEditSave, onEditCancel }) => (
  <div className="overflow-x-auto border rounded mt-4">
    <table className="min-w-full text-xs">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-2 py-1">Sr</th>
          {columns.map((col) => (
            <th key={col.key} className="px-2 py-1 text-left">{col.label}</th>
          ))}
          <th className="px-2 py-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr key={idx} className="border-t">
            <td className="px-2 py-1">{idx + 1}</td>
            {columns.map((col) => (
              <td key={col.key} className="px-2 py-1">
                {editableIndex === idx ? (
                  <FormField
                    value={editItem[col.key] || ""}
                    onChange={e => onEditChange(col.key, e.target.value)}
                    className="mb-0"
                  />
                ) : (
                  item[col.key]
                )}
              </td>
            ))}
            <td className="px-2 py-1 flex gap-1">
              {editableIndex === idx ? (
                <>
                  <button className="text-green-600" onClick={onEditSave}>Save</button>
                  <button className="text-gray-500" onClick={onEditCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="text-blue-600" onClick={() => onEdit(idx)}>Edit</button>
                  <button className="text-red-600" onClick={() => onRemove(idx)}>Remove</button>
                </>
              )}
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={columns.length + 2} className="px-2 py-1 text-center">
            <button className="text-green-700 font-semibold" onClick={onAdd}>+ Add Item</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default InvoiceItemTable; 