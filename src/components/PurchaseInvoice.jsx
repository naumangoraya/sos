import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import ActionButtons from "./ActionButtons";
import InvoiceItemTable from "./InvoiceItemTable";
import SummarySection from "./SummarySection";
import { storeAPI, supplierAPI, itemAPI } from '../services/api.js';

const initialInvoice = {
  invoiceNo: "",
  supplierId: "",
  storeId: "",
  productId: "",
  date: new Date().toISOString().slice(0, 10),
  reference: "",
  remarks: "",
  description: "",
  reel: "",
  constant: "No",
  qty: "",
  weight: "",
  grams: "",
  rate: "",
  value: "",
  brand: "",
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
  const [stores, setStores] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [storeRes, supplierRes, itemRes] = await Promise.all([
        storeAPI.getAll({}),
        supplierAPI.getAll({}),
        itemAPI.getAll({})
      ]);
      setStores(storeRes.data.stores || []);
      setSuppliers(supplierRes.data.suppliers || []);
      setItems(itemRes.data.items || []);
      // Fetch latest invoice number
      // Assume backend endpoint: /purchaseInvoices/latest
      try {
        const res = await fetch('http://localhost:5000/api/purchaseInvoices/latest');
        if (res.ok) {
          const data = await res.json();
          let nextNo = 'PI-000001';
          if (data && data.invoiceNumber) {
            const num = parseInt(data.invoiceNumber.replace(/[^0-9]/g, '')) + 1;
            nextNo = `PI-${num.toString().padStart(6, '0')}`;
          }
          setInvoice(inv => ({ ...inv, invoiceNo: nextNo }));
        }
      } catch {}
      setLoading(false);
    }
    fetchData();
  }, []);

  // Auto-fill supplier info
  useEffect(() => {
    if (invoice.supplierId && suppliers.length > 0) {
      const supplier = suppliers.find(s => s.id === parseInt(invoice.supplierId));
      if (supplier) {
        setInvoice(inv => ({
          ...inv,
          remarks: supplier.address || inv.remarks
        }));
      }
    }
  }, [invoice.supplierId, suppliers]);

  // Auto-fill product info
  useEffect(() => {
    if (invoice.productId && items.length > 0) {
      const item = items.find(i => i.itemId === invoice.productId);
      if (item) {
        setInvoice(inv => ({
          ...inv,
          description: item.description || '',
          brand: item.brand || '',
          grams: item.grams || '',
          length: item.length || '',
          width: item.width || '',
        }));
      }
    }
  }, [invoice.productId, items]);

  // Auto-fill store info
  useEffect(() => {
    if (invoice.storeId && stores.length > 0) {
      const store = stores.find(s => s.id === parseInt(invoice.storeId));
      if (store) {
        setInvoice(inv => ({
          ...inv,
          packing: store.description || inv.packing
        }));
      }
    }
  }, [invoice.storeId, stores]);

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
    { label: "Save", color: "primary", onClick: () => {
      // TODO: Implement save functionality
      console.log('Saving purchase invoice:', invoice);
      alert("Purchase invoice saved successfully!");
    }},
    { label: "Edit", color: "secondary", onClick: () => {
      // TODO: Implement edit functionality
      alert("Edit functionality will be implemented");
    }, disabled: true },
    { label: "Remove", color: "secondary", onClick: () => {
      // TODO: Implement remove functionality
      alert("Remove functionality will be implemented");
    }, disabled: true },
    { label: "Refresh", color: "secondary", onClick: () => {
      setInvoice(initialInvoice);
      alert("Form refreshed");
    }},
    { label: "Refresh DB", color: "secondary", onClick: () => {
      // TODO: Implement refresh DB functionality
      alert("Refresh DB functionality will be implemented");
    }},
    { label: "Select", color: "secondary", onClick: () => {
      // TODO: Implement select functionality
      alert("Select functionality will be implemented");
    }},
    { label: "Exit", color: "secondary", onClick: () => {
      // TODO: Implement exit functionality
      alert("Exit functionality will be implemented");
    }},
  ];
  const printButtons = [
    { label: "Print", color: "green", onClick: () => alert("Print") },
  ];

  if (loading) return <div>Loading...</div>;

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
              <div className="col-span-2">
                <FormField label="Invoice #" value={invoice.invoiceNo} readOnly />
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-medium">Supplier</label>
                <select className="w-full border rounded px-2 py-1" value={invoice.supplierId} onChange={e => handleFieldChange('supplierId', e.target.value)}>
                  <option value="">Select Supplier</option>
                  {suppliers.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Store</label>
                <select className="w-full border rounded px-2 py-1" value={invoice.storeId} onChange={e => handleFieldChange('storeId', e.target.value)}>
                  <option value="">Select Store</option>
                  {stores.map(s => <option key={s.id} value={s.id}>{s.storeName}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <FormField label="Date" type="date" value={invoice.date} onChange={e => handleFieldChange('date', e.target.value)} />
              </div>
              <div className="col-span-3">
                <FormField label="Reference#" value={invoice.reference} onChange={e => handleFieldChange('reference', e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-1">
              <div className="col-span-4"><FormField label="Remarks" value={invoice.remarks} onChange={e => handleFieldChange('remarks', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-1">
              <div className="col-span-2">
                <label className="block text-sm font-medium">Product</label>
                <select className="w-full border rounded px-2 py-1" value={invoice.productId} onChange={e => handleFieldChange('productId', e.target.value)}>
                  <option value="">Select Product</option>
                  {items.map(i => <option key={i.itemId} value={i.itemId}>{i.description}</option>)}
                </select>
              </div>
              <div className="col-span-3"><FormField label="Description" value={invoice.description} readOnly /></div>
              <div className="col-span-1"><FormField label="Reel#" value={invoice.reel} onChange={e => handleFieldChange('reel', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Constant" value={invoice.constant} onChange={e => handleFieldChange('constant', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Qty" value={invoice.qty} onChange={e => handleFieldChange('qty', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Weight" value={invoice.weight} onChange={e => handleFieldChange('weight', e.target.value)} /></div>
              <div className="col-span-1"><FormField label="Grams" value={invoice.grams} readOnly /></div>
            </div>
            <div className="grid grid-cols-12 gap-2 mb-1">
              <div className="col-span-2"><FormField label="Rate" value={invoice.rate} onChange={e => handleFieldChange('rate', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Value" value={invoice.value} onChange={e => handleFieldChange('value', e.target.value)} /></div>
              <div className="col-span-2"><FormField label="Brand" value={invoice.brand} readOnly /></div>
              <div className="col-span-2"><FormField label="Length" value={invoice.length} readOnly /></div>
              <div className="col-span-2"><FormField label="Width" value={invoice.width} readOnly /></div>
              <div className="col-span-2"><FormField label="Packing" value={invoice.packing} readOnly /></div>
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