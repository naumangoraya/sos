import React, { useState } from "react";

const mockStores = [
  { store: "3:NO BASE", description: "3:NO BASE", status: "Active" },
  { store: "BASEMENT", description: "BZSEMENT", status: "Active" },
  { store: "BLEECH", description: "BLEECH MIX", status: "Active" },
  { store: "BSP PKTS", description: "BULLEH SHAH PKTS", status: "Active" },
  { store: "BULLEH SHAH", description: "BULLEH SHAH", status: "Active" },
  { store: "CUTTING 2", description: "CUTTING MCHINE #2", status: "Active" },
  { store: "CUTTING 3", description: "CUTTING MCHINE3", status: "Active" },
  { store: "DOGAR HOUSE", description: "DOGAR HOUSE", status: "Active" },
  { store: "GODOWN", description: "GODOWN", status: "Active" },
  { store: "GODOWN 2", description: "GODOWN 2", status: "Active" },
  { store: "GODOWN 3", description: "GODOWN 3", status: "Active" },
  { store: "GODOWN 4", description: "TANDER", status: "Active" },
  { store: "GODOWN 5", description: "BLEECH MIX RELL", status: "Active" },
  { store: "GODOWN 6", description: "GODOWN 6", status: "Active" },
  { store: "HAFIZ SLITER", description: "HAFIZ SLITER", status: "Active" },
  { store: "LOCAL PACKETS", description: "LOCAL PACKETS", status: "Active" },
  { store: "MIX STOCK", description: "MIX STOCK", status: "Active" },
  { store: "OMEGA REEL PACK", description: "OMEGA REEL PACK", status: "Active" },
  { store: "OMEGA REELS", description: "OMEGA REELS", status: "Active" },
  { store: "OMEGA ZEE PACK", description: "OMEGA ZEE PACK", status: "Active" },
];

const StoreInformation = () => {
  const [form, setForm] = useState({
    store: "",
    description: "",
    status: "Active",
  });
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [stores, setStores] = useState(mockStores);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  // Filter logic (mock)
  const filteredStores = stores.filter((s) => {
    if (!search) return true;
    const val = search.toLowerCase();
    if (searchType === "all") {
      return (
        s.store.toLowerCase().includes(val) ||
        s.description.toLowerCase().includes(val) ||
        s.status.toLowerCase().includes(val)
      );
    }
    if (searchType === "store") return s.store.toLowerCase().includes(val);
    return true;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-6">Store Information</h2>
      <div className="bg-white rounded shadow p-4 mb-6 w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Store</label>
            <input name="store" value={form.store} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <input name="description" value={form.description} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select name="status" value={form.status} onChange={handleInputChange} className="w-full border rounded px-2 py-1">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 mb-2">
          <button className="bg-blue-600 text-white px-4 py-1 rounded">Save</button>
          <button className="bg-gray-400 text-white px-4 py-1 rounded">Edit</button>
          <button className="bg-red-500 text-white px-4 py-1 rounded">Remove</button>
          <button className="bg-green-500 text-white px-4 py-1 rounded">Refresh</button>
          <button className="bg-gray-700 text-white px-4 py-1 rounded">Exit</button>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 w-full max-w-2xl">
        <div className="mb-2 flex flex-col md:flex-row md:items-center md:gap-4">
          <span className="font-semibold mr-2">Look Up:</span>
          <label className="mr-2"><input type="radio" name="searchType" value="all" checked={searchType === "all"} onChange={handleSearchTypeChange} /> All</label>
          <label className="mr-2"><input type="radio" name="searchType" value="store" checked={searchType === "store"} onChange={handleSearchTypeChange} /> By Store</label>
          <input type="text" value={search} onChange={handleSearchChange} placeholder="Search..." className="border rounded px-2 py-1 ml-2" />
        </div>
        <div className="overflow-y-auto max-h-72">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1">Store</th>
                <th className="border px-2 py-1">Description</th>
                <th className="border px-2 py-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredStores.length === 0 ? (
                <tr><td colSpan="3" className="text-center py-2">No stores found.</td></tr>
              ) : (
                filteredStores.map((s, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">{s.store}</td>
                    <td className="border px-2 py-1">{s.description}</td>
                    <td className="border px-2 py-1">{s.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoreInformation; 