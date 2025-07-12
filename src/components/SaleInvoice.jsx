import React, { useState } from "react";
import FormField from "./FormField";
import ActionButtons from "./ActionButtons";
import InvoiceItemTable from "./InvoiceItemTable";
import SummarySection from "./SummarySection";

const initialInvoice = {
  invoiceNo: "SI-017596",
  customer: "",
  code: "",
  deliveryAddress: "",
  cashCredit: "Cash",
  cDays: "",
  date: "2025-06-25",
  reference: "",
  deliveredTo: "",
  limit: "",
  balance: "",
  adda: "",
  biltyNo: "",
  biltyDate: "2025-06-25",
  ctn: "",
  deliveredBy: "",
  remarks: "",
  store: "GODOWN",
  product: "BB2530210",
  description: "BROWN BACK BOARD 25X30X210",
  reel: "",
  constant: "Board",
  pkt: "100",
  length: "30",
  width: "25",
  grams: "210",
  packing: "100",
  brand: "BROWN BACK BOA",
  weight: "1016.1290",
  stock: "-100",
  rate: "200",
  rateOn: "Weight",
  value: "203225.8",
  pktRate: "2032.26",
  itemRemarks: "",
  items: [],
  summary: {
    totalAmount: "",
    discountPercent: "",
    discountRs: "",
    freight: "",
    labour: "",
    netAmount: "",
    receive: "",
    balance: "",
    totalWeight: "",
  },
};

const SaleInvoice = () => {
  const [invoice, setInvoice] = useState(initialInvoice);
  const [editingItemIdx, setEditingItemIdx] = useState(null);
  const [editItem, setEditItem] = useState({});

  // Handlers for form fields
  const handleFieldChange = (field, value) => {
    setInvoice((prev) => ({ ...prev, [field]: value }));
  };

  // Handlers for summary section
  const handleSummaryChange = (field, value) => {
    setInvoice((prev) => ({
      ...prev,
      summary: { ...prev.summary, [field]: value },
    }));
  };

  // Handlers for invoice items
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

  // Action buttons for right side
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
    { label: "Print Combine", color: "green", onClick: () => alert("Print Combine") },
    { label: "Print Single", color: "green", onClick: () => alert("Print Single") },
    { label: "Print Sale+DO", color: "green", onClick: () => alert("Print Sale+DO") },
  ];

  return (
    <div className="bg-[#ede5db] min-h-screen flex flex-col items-center py-4">
      <div className="w-full max-w-6xl bg-white rounded shadow p-4">
        <h2 className="text-3xl font-bold text-center mb-2 tracking-wide">Sale Invoice</h2>
        {/* Cash/Credit Toggle */}
        <div className="flex justify-center gap-2 mb-2">
          <label className="flex items-center gap-1">
            <input type="radio" checked={invoice.cashCredit === 'Cash'} onChange={() => handleFieldChange('cashCredit', 'Cash')} /> Cash
          </label>
          <label className="flex items-center gap-1">
            <input type="radio" checked={invoice.cashCredit === 'Credit'} onChange={() => handleFieldChange('cashCredit', 'Credit')} /> Credit
          </label>
        </div>
        {/* Main Form and Buttons Side by Side */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Form Section */}
          <div className="flex-1">
            {/* Top Row */}
            <div className="grid grid-cols-12 gap-2 mb-1">
              <div className="col-span-2"><FormField label="Invoice #" value={invoice.invoiceNo} onChange={e => handleFieldChange('invoiceNo', e.target.value)} /></div>
              <div className="col-span-3"><FormField label="Customer" value={invoice.customer} onChange={e => handleFieldChange('customer', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Code" value={invoice.code} onChange={e => handleFieldChange('code', e.target.value)} /></div>
              <div className="col-span-5"><FormField label="Delivery Address" value={invoice.deliveryAddress} onChange={e => handleFieldChange('deliveryAddress', e.target.value)} /></div>
            </div>
            {/* Second Row */}
            <div className="grid grid-cols-12 gap-2 mb-1">
              <div className="col-span-1"><FormField label="C. Days" value={invoice.cDays} onChange={e => handleFieldChange('cDays', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Date" type="date" value={invoice.date} onChange={e => handleFieldChange('date', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Reference#" value={invoice.reference} onChange={e => handleFieldChange('reference', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Delivered To" value={invoice.deliveredTo} onChange={e => handleFieldChange('deliveredTo', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Limit" value={invoice.limit} onChange={e => handleFieldChange('limit', e.target.value)} /></div>
              <div className="col-span-3"><FormField label="Balance" value={invoice.balance} onChange={e => handleFieldChange('balance', e.target.value)} /></div>
            </div>
            {/* Third Row */}
            <div className="grid grid-cols-12 gap-2 mb-1">
              <div className="col-span-2"><FormField label="Adda" value={invoice.adda} onChange={e => handleFieldChange('adda', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Bilty No." value={invoice.biltyNo} onChange={e => handleFieldChange('biltyNo', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Bilty Date" type="date" value={invoice.biltyDate} onChange={e => handleFieldChange('biltyDate', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="CTN" value={invoice.ctn} onChange={e => handleFieldChange('ctn', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Delivered By" value={invoice.deliveredBy} onChange={e => handleFieldChange('deliveredBy', e.target.value)} /></div>
              <div className="col-span-3"><FormField label="Remarks" value={invoice.remarks} onChange={e => handleFieldChange('remarks', e.target.value)} /></div>
            </div>
            {/* Product Row */}
            <div className="grid grid-cols-12 gap-2 mb-1">
              <div className="col-span-2"><FormField label="Store" value={invoice.store} onChange={e => handleFieldChange('store', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Product" value={invoice.product} onChange={e => handleFieldChange('product', e.target.value)} /></div>
              <div className="col-span-3"><FormField label="Description" value={invoice.description} onChange={e => handleFieldChange('description', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Reel#" value={invoice.reel} onChange={e => handleFieldChange('reel', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Constant" value={invoice.constant} onChange={e => handleFieldChange('constant', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Board" value={invoice.board} onChange={e => handleFieldChange('board', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Pkt" value={invoice.pkt} onChange={e => handleFieldChange('pkt', e.target.value)} /></div>
            </div>
            {/* Product Details Row */}
            <div className="grid grid-cols-12 gap-2 mb-1">
              <div className="col-span-1"><FormField label="Length" value={invoice.length} onChange={e => handleFieldChange('length', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Width" value={invoice.width} onChange={e => handleFieldChange('width', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Grams" value={invoice.grams} onChange={e => handleFieldChange('grams', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Packing" value={invoice.packing} onChange={e => handleFieldChange('packing', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Brand" value={invoice.brand} onChange={e => handleFieldChange('brand', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Weight" value={invoice.weight} onChange={e => handleFieldChange('weight', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Stock" value={invoice.stock} onChange={e => handleFieldChange('stock', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Rate" value={invoice.rate} onChange={e => handleFieldChange('rate', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Rate On" value={invoice.rateOn} onChange={e => handleFieldChange('rateOn', e.target.value)} /></div>
            </div>
            {/* Value and Pkt Rate Row */}
            <div className="grid grid-cols-12 gap-2 mb-1 items-end">
              <div className="col-span-2"><FormField label="Value" value={invoice.value} onChange={e => handleFieldChange('value', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Pkt Rate" value={invoice.pktRate} onChange={e => handleFieldChange('pktRate', e.target.value)} /></div>
              <div className="col-span-3"><FormField label="Remarks" value={invoice.itemRemarks} onChange={e => handleFieldChange('itemRemarks', e.target.value)} /></div>
              <div className="col-span-2 flex gap-2">
                <button className="bg-blue-500 text-white px-4 py-1 rounded font-semibold">Add Grid</button>
                <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded font-semibold" disabled>Change Grid</button>
                <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded font-semibold" disabled>Remove Grid</button>
              </div>
            </div>
          </div>
          {/* Right Side Buttons */}
          <div className="w-full md:w-48 flex flex-col gap-2 md:items-end">
            <ActionButtons buttons={rightButtons} vertical />
            <div className="mt-2">
              <ActionButtons buttons={printButtons} vertical />
            </div>
          </div>
        </div>
        {/* Table/Grid */}
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
        {/* Summary Section */}
        <SummarySection summary={invoice.summary} onChange={handleSummaryChange} />
      </div>
    </div>
  );
};

export default SaleInvoice; 