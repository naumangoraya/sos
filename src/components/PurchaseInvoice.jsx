import React, { useState } from "react";
import FormField from "./FormField";
import ActionButtons from "./ActionButtons";
import InvoiceItemTable from "./InvoiceItemTable";
import SummarySection from "./SummarySection";

const initialInvoice = {
  invoiceNo: "PI-000231",
  supplier: "SAQIB BULLEH SHAH",
  code: "12-000155",
  date: "2023-07-01",
  reference: "",
  remarks: "",
  store: "REEL GODOWN",
  product: "PC22377",
  description: "BLEECH BOARD 22X37",
  reel: "",
  constant: "No",
  qty: "",
  weight: "",
  grams: "",
  rate: "",
  value: "",
  brand: "BLEEICH",
  length: "",
  width: "",
  packing: "",
  items: [],
  summary: {
    totalAmount: "",
    discount: "",
    freight: "",
    netAmount: "",
    paidAmount: "",
    balance: "",
    totalWeight: "",
  },
  cashCredit: "Cash",
};

const PurchaseInvoice = () => {
  const [invoice, setInvoice] = useState(initialInvoice);
  const [editingItemIdx, setEditingItemIdx] = useState(null);
  const [editItem, setEditItem] = useState({});

  const handleFieldChange = (field, value) => {
    setInvoice((prev) => ({ ...prev, [field]: value }));
  };

  const handleSummaryChange = (field, value) => {
    setInvoice((prev) => ({
      ...prev,
      summary: { ...prev.summary, [field]: value },
    }));
  };

  const handleAddItem = () => {
    setEditItem({});
    setEditingItemIdx(invoice.items.length);
  };

  const handleEditItem = (idx) => {
    setEditItem(invoice.items[idx]);
    setEditingItemIdx(idx);
  };

  const handleEditItemChange = (field, value) => {
    setEditItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditItemSave = () => {
    setInvoice((prev) => {
      const items = [...prev.items];
      items[editingItemIdx] = editItem;
      return { ...prev, items };
    });
    setEditingItemIdx(null);
    setEditItem({});
  };

  const handleEditItemCancel = () => {
    setEditingItemIdx(null);
    setEditItem({});
  };

  const handleRemoveItem = (idx) => {
    setInvoice((prev) => {
      const items = prev.items.filter((_, i) => i !== idx);
      return { ...prev, items };
    });
  };

  const rightButtons = [
    { label: "Save", color: "primary", onClick: () => alert("Save") },
    { label: "Edit", color: "secondary", onClick: () => alert("Edit"), disabled: true },
    { label: "Remove", color: "secondary", onClick: () => alert("Remove"), disabled: true },
    { label: "Refresh", color: "secondary", onClick: () => alert("Refresh") },
    { label: "Refresh DB", color: "secondary", onClick: () => alert("Refresh DB") },
    { label: "Select", color: "secondary", onClick: () => alert("Select") },
    { label: "Exit", color: "secondary", onClick: () => alert("Exit") },
  ];
  const printButtons = [
    { label: "Print", color: "green", onClick: () => alert("Print") },
  ];

  return (
    <div className="bg-[#ede5db] min-h-screen flex flex-col items-center py-4">
      <div className="w-full max-w-6xl bg-white rounded shadow p-4">
        <h2 className="text-3xl font-bold text-center mb-2 tracking-wide">Purchase Invoice</h2>
        <div className="flex justify-center gap-2 mb-2">
          <label className="flex items-center gap-1">
            <input type="radio" checked={invoice.cashCredit === 'Cash'} onChange={() => handleFieldChange('cashCredit', 'Cash')} /> Cash
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" checked={invoice.cashCredit === 'Credit'} onChange={() => handleFieldChange('cashCredit', 'Credit')} /> Credit
          </label>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="grid grid-cols-12 gap-2 mb-1">
              <div className="col-span-2"><FormField label="Invoice #" value={invoice.invoiceNo} onChange={e => handleFieldChange('invoiceNo', e.target.value)} /></div>
              <div className="col-span-3"><FormField label="Supplier" value={invoice.supplier} onChange={e => handleFieldChange('supplier', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Code" value={invoice.code} onChange={e => handleFieldChange('code', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Date" type="date" value={invoice.date} onChange={e => handleFieldChange('date', e.target.value)} /></div>
              <div className="col-span-3"><FormField label="Reference#" value={invoice.reference} onChange={e => handleFieldChange('reference', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-1">
              <div className="col-span-4"><FormField label="Remarks" value={invoice.remarks} onChange={e => handleFieldChange('remarks', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-1">
              <div className="col-span-2"><FormField label="Store" value={invoice.store} onChange={e => handleFieldChange('store', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Product" value={invoice.product} onChange={e => handleFieldChange('product', e.target.value)} /></div>
              <div className="col-span-3"><FormField label="Description" value={invoice.description} onChange={e => handleFieldChange('description', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Reel#" value={invoice.reel} onChange={e => handleFieldChange('reel', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Constant" value={invoice.constant} onChange={e => handleFieldChange('constant', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Qty" value={invoice.qty} onChange={e => handleFieldChange('qty', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Weight" value={invoice.weight} onChange={e => handleFieldChange('weight', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Grams" value={invoice.grams} onChange={e => handleFieldChange('grams', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-1">
              <div className="col-span-2"><FormField label="Rate" value={invoice.rate} onChange={e => handleFieldChange('rate', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Value" value={invoice.value} onChange={e => handleFieldChange('value', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Brand" value={invoice.brand} onChange={e => handleFieldChange('brand', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Length" value={invoice.length} onChange={e => handleFieldChange('length', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Width" value={invoice.width} onChange={e => handleFieldChange('width', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Packing" value={invoice.packing} onChange={e => handleFieldChange('packing', e.target.value)} /></div>
            </div>
            <div className="flex gap-2 mb-2">
              <button className="bg-blue-500 text-white px-4 py-1 rounded font-semibold">Add Grid</button>
              <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded font-semibold" disabled>Change Grid</button>
              <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded font-semibold" disabled>Remove Grid</button>
            </div>
          </div>
          <div className="w-full md:w-48 flex flex-col gap-2 md:items-end">
            <ActionButtons buttons={rightButtons} vertical />
            <div className="mt-2">
              <ActionButtons buttons={printButtons} vertical />
            </div>
          </div>
        </div>
        <InvoiceItemTable
          items={invoice.items}
          onAdd={handleAddItem}
          onEdit={handleEditItem}
          onRemove={handleRemoveItem}
          editableIndex={editingItemIdx}
          editItem={editItem}
          onEditChange={handleEditItemChange}
          onEditSave={handleEditItemSave}
          onEditCancel={handleEditItemCancel}
        />
        <div className="mt-2">
          <SummarySection summary={invoice.summary} onChange={handleSummaryChange} />
        </div>
      </div>
    </div>
  );
};

export default PurchaseInvoice; 