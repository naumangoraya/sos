import React, { useState, useEffect } from "react";
import { supplierAPI } from '../services/api.js';

const SupplierInformation = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [currentSupplier, setCurrentSupplier] = useState({
    code: "",
    title: "",
    businessName: "",
    city: "",
    contactPerson: "",
    address: "",
    email: "",
    phoneNumber: "",
    mobileNumber: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  // Load suppliers on component mount
  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) {
        params.search = search;
        params.filter = searchType;
      }
      const response = await supplierAPI.getAll(params);
      setSuppliers(response.data.suppliers || []);
    } catch (err) {
      setError(err.message || 'Failed to load suppliers');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadSuppliers();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSupplier(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setCurrentSupplier({
      code: "",
      title: "",
      businessName: "",
      city: "",
      contactPerson: "",
      address: "",
      email: "",
      phoneNumber: "",
      mobileNumber: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');

      if (isEditing) {
        await supplierAPI.update(editingId, currentSupplier);
      } else {
        await supplierAPI.create(currentSupplier);
      }

      resetForm();
      loadSuppliers();
    } catch (err) {
      setError(err.message || 'Failed to save supplier');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (supplier) => {
    setCurrentSupplier({
      code: supplier.code || '',
      title: supplier.title || '',
      businessName: supplier.businessName || '',
      city: supplier.city || '',
      contactPerson: supplier.contactPerson || '',
      address: supplier.address || '',
      email: supplier.email || '',
      phoneNumber: supplier.phoneNumber || '',
      mobileNumber: supplier.mobileNumber || '',
    });
    setIsEditing(true);
    setEditingId(supplier.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await supplierAPI.delete(id);
        loadSuppliers();
      } catch (err) {
        setError(err.message || 'Failed to delete supplier');
      }
    }
  };

  const handleRefresh = () => {
    resetForm();
    loadSuppliers();
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">Supplier Information</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Code</label>
            <input 
              name="code" 
              value={currentSupplier.code} 
              onChange={handleInputChange} 
              className="w-full border rounded px-2 py-1" 
              placeholder="e.g., 11-02-000015"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input 
              name="title" 
              value={currentSupplier.title} 
              onChange={handleInputChange} 
              className="w-full border rounded px-2 py-1" 
              placeholder="Supplier title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Business Name</label>
            <input 
              name="businessName" 
              value={currentSupplier.businessName} 
              onChange={handleInputChange} 
              className="w-full border rounded px-2 py-1" 
              placeholder="Business name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">City</label>
            <input 
              name="city" 
              value={currentSupplier.city} 
              onChange={handleInputChange} 
              className="w-full border rounded px-2 py-1" 
              placeholder="City"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Contact Person</label>
            <input 
              name="contactPerson" 
              value={currentSupplier.contactPerson} 
              onChange={handleInputChange} 
              className="w-full border rounded px-2 py-1" 
              placeholder="Contact person"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input 
              name="address" 
              value={currentSupplier.address} 
              onChange={handleInputChange} 
              className="w-full border rounded px-2 py-1" 
              placeholder="Address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input 
              name="email" 
              type="email"
              value={currentSupplier.email} 
              onChange={handleInputChange} 
              className="w-full border rounded px-2 py-1" 
              placeholder="Email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone #</label>
            <input 
              name="phoneNumber" 
              value={currentSupplier.phoneNumber} 
              onChange={handleInputChange} 
              className="w-full border rounded px-2 py-1" 
              placeholder="Phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mobile #</label>
            <input 
              name="mobileNumber" 
              value={currentSupplier.mobileNumber} 
              onChange={handleInputChange} 
              className="w-full border rounded px-2 py-1" 
              placeholder="Mobile number"
            />
          </div>
        </div>
        <div className="flex gap-2 mb-2">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : (isEditing ? 'Update' : 'Save')}
          </button>
          <button 
            onClick={resetForm}
            className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
          >
            New
          </button>
          <button 
            onClick={handleRefresh}
            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
          >
            Refresh
          </button>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="mb-2 flex flex-col md:flex-row md:items-center md:gap-4">
          <span className="font-semibold mr-2">Search Filter:</span>
          <label className="mr-2">
            <input 
              type="radio" 
              name="searchType" 
              value="all" 
              checked={searchType === "all"} 
              onChange={handleSearchTypeChange} 
            /> All
          </label>
          <label className="mr-2">
            <input 
              type="radio" 
              name="searchType" 
              value="code" 
              checked={searchType === "code"} 
              onChange={handleSearchTypeChange} 
            /> Code
          </label>
          <label className="mr-2">
            <input 
              type="radio" 
              name="searchType" 
              value="description" 
              checked={searchType === "description"} 
              onChange={handleSearchTypeChange} 
            /> Description
          </label>
          <label className="mr-2">
            <input 
              type="radio" 
              name="searchType" 
              value="business" 
              checked={searchType === "business"} 
              onChange={handleSearchTypeChange} 
            /> Business Title
          </label>
          <label className="mr-2">
            <input 
              type="radio" 
              name="searchType" 
              value="city" 
              checked={searchType === "city"} 
              onChange={handleSearchTypeChange} 
            /> City
          </label>
          <input 
            type="text" 
            value={search} 
            onChange={handleSearchChange} 
            placeholder="Search..." 
            className="border rounded px-2 py-1 ml-2 flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
        
        {loading ? (
          <div className="text-center py-4">Loading suppliers...</div>
        ) : (
          <div className="overflow-x-auto max-h-80">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1">Sr#</th>
                  <th className="border px-2 py-1">Code</th>
                  <th className="border px-2 py-1">Title</th>
                  <th className="border px-2 py-1">Business Name</th>
                  <th className="border px-2 py-1">Contact Person</th>
                  <th className="border px-2 py-1">Address</th>
                  <th className="border px-2 py-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-2">No suppliers found.</td></tr>
                ) : (
                  suppliers.map((supplier, i) => (
                    <tr key={supplier.id} className="hover:bg-gray-50">
                      <td className="border px-2 py-1">{i + 1}</td>
                      <td className="border px-2 py-1">{supplier.code}</td>
                      <td className="border px-2 py-1">{supplier.title || '-'}</td>
                      <td className="border px-2 py-1">{supplier.businessName || '-'}</td>
                      <td className="border px-2 py-1">{supplier.contactPerson || '-'}</td>
                      <td className="border px-2 py-1">{supplier.address || '-'}</td>
                      <td className="border px-2 py-1">
                        <button 
                          onClick={() => handleEdit(supplier)}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-1 hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(supplier.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierInformation; 