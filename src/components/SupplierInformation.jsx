import React, { useState } from "react";

const mockSuppliers = [
  { sr: 1, code: "11-02-000015", title: "AMIR TRADER", business: "", contact: "", address: "LHR" },
  { sr: 2, code: "11-02-000038", title: "AMIR TRADER BULLEH SH", business: "BULLEH SHAH", contact: "PACKAGES", address: "LHR" },
  { sr: 3, code: "11-02-000047", title: "AMIR TRADER OLD", business: "", contact: "", address: "LAHORE" },
  { sr: 4, code: "11-02-000049", title: "AMIR ZAFER BULLEH SHA", business: "", contact: "", address: "LHR" },
  { sr: 5, code: "11-02-000033", title: "BOARD NEELUM", business: "", contact: "", address: "ISD" },
  // ... add more mock data as needed
];

const SupplierInformation = () => {
  const [form, setForm] = useState({
    code: "",
    description: "",
    business: "",
    city: "",
    contact: "",
    address: "",
    email: "",
    phone: "",
    mobile: "",
  });
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [suppliers, setSuppliers] = useState(mockSuppliers);

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
  const filteredSuppliers = suppliers.filter((s) => {
    if (!search) return true;
    const val = search.toLowerCase();
    if (searchType === "all") {
      return (
        s.code.toLowerCase().includes(val) ||
        s.title.toLowerCase().includes(val) ||
        (s.business && s.business.toLowerCase().includes(val)) ||
        (s.address && s.address.toLowerCase().includes(val))
      );
    }
    if (searchType === "code") return s.code.toLowerCase().includes(val);
    if (searchType === "description") return s.title.toLowerCase().includes(val);
    if (searchType === "business") return s.business && s.business.toLowerCase().includes(val);
    if (searchType === "city") return s.address && s.address.toLowerCase().includes(val);
    return true;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Supplier Information</h2>
      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Code</label>
            <input name="code" value={form.code} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <input name="description" value={form.description} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Business Name</label>
            <input name="business" value={form.business} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">City</label>
            <input name="city" value={form.city} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Contact Person</label>
            <input name="contact" value={form.contact} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input name="address" value={form.address} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" value={form.email} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone #</label>
            <input name="phone" value={form.phone} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Mobile #</label>
            <input name="mobile" value={form.mobile} onChange={handleInputChange} className="w-full border rounded px-2 py-1" />
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
      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="mb-2 flex flex-col md:flex-row md:items-center md:gap-4">
          <span className="font-semibold mr-2">Search Filter:</span>
          <label className="mr-2"><input type="radio" name="searchType" value="all" checked={searchType === "all"} onChange={handleSearchTypeChange} /> All</label>
          <label className="mr-2"><input type="radio" name="searchType" value="code" checked={searchType === "code"} onChange={handleSearchTypeChange} /> Code</label>
          <label className="mr-2"><input type="radio" name="searchType" value="description" checked={searchType === "description"} onChange={handleSearchTypeChange} /> Description</label>
          <label className="mr-2"><input type="radio" name="searchType" value="business" checked={searchType === "business"} onChange={handleSearchTypeChange} /> Business Title</label>
          <label className="mr-2"><input type="radio" name="searchType" value="city" checked={searchType === "city"} onChange={handleSearchTypeChange} /> City</label>
          <input type="text" value={search} onChange={handleSearchChange} placeholder="Search..." className="border rounded px-2 py-1 ml-2" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1">Sr#</th>
                <th className="border px-2 py-1">Code</th>
                <th className="border px-2 py-1">Title</th>
                <th className="border px-2 py-1">Business Name</th>
                <th className="border px-2 py-1">Contact Person</th>
                <th className="border px-2 py-1">Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-2">No suppliers found.</td></tr>
              ) : (
                filteredSuppliers.map((s) => (
                  <tr key={s.sr}>
                    <td className="border px-2 py-1">{s.sr}</td>
                    <td className="border px-2 py-1">{s.code}</td>
                    <td className="border px-2 py-1">{s.title}</td>
                    <td className="border px-2 py-1">{s.business}</td>
                    <td className="border px-2 py-1">{s.contact}</td>
                    <td className="border px-2 py-1">{s.address}</td>
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

export default SupplierInformation; 